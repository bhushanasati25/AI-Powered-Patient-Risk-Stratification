import express from 'express';
import { db } from '../config.js'; 
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../config.js';
import { onAuthStateChanged } from 'firebase/auth';

const router = express.Router();

router.get("/details", async (req, res) => {
    if (!auth) {
        return res.status(400).send("User not signed in...");
    }
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const patientDocRef = doc(db, "patients", user.email);
            const patientDoc = await getDoc(patientDocRef);
            res.status(200).send(patientDoc.data());
        } else {
            console.log("No user is signed in.");
            res.status(404).send("Patient details not found");
        }
    });
})

router.post("/add", async (req, res) => {
    const { patientName, doctorName, doctorEmail, disease, medications, task, patientEmail } = req.body;

    // Validation
    if (!patientName || !doctorName || !doctorEmail || !disease || !medications || !task || !patientEmail) {
        return res.status(400).send("All fields are required.");
    }

    try {
        // Step 1: Verify the doctor exists and matches the provided email
        const doctorDocRef = doc(db, "doctors", doctorEmail);
        const doctorDoc = await getDoc(doctorDocRef);

        console.log("doctorDoc",doctorDocRef)

        if (!doctorDoc.exists()) {
            return res.status(404).send("Doctor not found."); // Doctor does not exist
        }
        
        const doctorData = doctorDoc.data();
        if (doctorData.email !== doctorEmail) {
            return res.status(400).send("Doctor email does not match.");
        }

        // Step 2: Verify if the patient exists
        const patientDocRef = doc(db, "patients", patientEmail); // Assuming you store patients by email
        console.log("Fetching patient document:", patientDocRef.path); // Log the document path

        const patientDoc = await getDoc(patientDocRef);
        if (!patientDoc.exists()) {
            return res.status(404).send("Patient not found."); // Patient not found in DB
        }

        const obj = {
            disease: disease,
            medications: medications,
            task: task,
            risk: "low",
            patientName,
            patientEmail,
            doctorName,
            doctorEmail,
            createdAt: new Date(), // Optional timestamp
        };

        await setDoc(patientDocRef, {
            medications: obj
        }, { merge: true }); // Use merge to avoid overwriting existing data
        
        // Step 3: Add patient data to the doctor's document
        await updateDoc(doctorDocRef, {
            [`patients.${patientEmail.split('@')[0]}`]: obj
        });
        
        console.log("Patient data successfully added to doctor document!");
        res.status(200).send("Patient added successfully");
    } catch (error) {
        console.error("Error during adding patient:", error);
        res.status(400).send("Error: " + error.message); // Provide more clarity on the error
    }
});

export default router;
