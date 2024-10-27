import express from 'express';
import { db } from '../config.js'; 
import { doc, getDoc} from 'firebase/firestore';
import { auth } from '../config.js';
import { onAuthStateChanged } from 'firebase/auth';

const router = express.Router();

router.get("/details", async (req, res) => {
    if (!auth) {
        return res.status(400).send("User not signed in...");
    }
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const doctorDocRef = doc(db, "doctors", user.email);
            const doctorDoc = await getDoc(doctorDocRef);
            res.status(200).send(doctorDoc.data());
        } else {
            console.log("No user is signed in.");
            res.status(404).send("Doctor details not found");
        }
    });
})

export default router;
