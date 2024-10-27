
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    let {email, password} = req.body;
    try {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            res.status(200).send("Sign up successful");
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
