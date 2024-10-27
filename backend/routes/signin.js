
import { Router } from "express";
import { auth } from "../config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const router = Router();

router.post("/", async (req, res) => {
    let {email, password} = req.body;
    try {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            res.status(200).send("Sign in successful")
        })
        .catch((error) => {
            res.status(404).send(error);
        });
    } catch(e) {
        res.status(404).send(e);
        // .json({error : e})
    }
})

export default router;
