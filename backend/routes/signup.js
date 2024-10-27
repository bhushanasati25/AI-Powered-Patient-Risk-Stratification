// signup.js
import express from 'express';
import { auth, db } from "../config.js"; 
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const router = express.Router();

router.post("/:id", async (req, res) => {
    const { email, password, name} = req.body;
    const auth = getAuth();

    try {
        // Check if the email is already in use
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
            return res.status(400).send("Email is already in use.");
        }

        // Create a user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set user data in Firestore
        const doctorDocRef = doc(db, req.params.id, email); // Use "doctors" collection
        await setDoc(doctorDocRef, {
            userID: user.uid,
            name: name,
            email: email, // Store email ID in Firestore
            createdAt: new Date(), // Optionally add timestamp
        });

        console.log(`${req.params.id} document successfully written with custom ID!`);
        console.log("User signed up:", user.uid);

        // Send success response
        res.status(200).send(`${req.params.id} signup successful`);
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(400).send(error.message); // Use 400 for bad requests
    }
});

export default router; // Export the router
