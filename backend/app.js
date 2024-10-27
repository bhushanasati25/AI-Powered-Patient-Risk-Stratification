import express from "express";
import configureServer from './routes/index.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configureServer(app)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});