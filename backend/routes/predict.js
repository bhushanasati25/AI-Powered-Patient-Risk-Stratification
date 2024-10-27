import express from 'express';
import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

const router = express.Router();
let model;

const mean = [1,2,3,4,5,6,7,8,9,10,11];
const variance = [1,2,3,4,5,6,7,8,9,10,11];

function scaleInput(inputData) {
    return inputData.map(row => row.map((val, i) => (val - mean[i]) / Math.sqrt(variance[i])));
}

const loadModel = async () => {
    const modelPath = path.join(process.cwd(), 'model.json');
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log('Model loaded');
};

router.get("/", async (req, res) => {
    await loadModel();
    try {
        let inputData = req.body; // Expecting an array of arrays

        // Scale the input data
        inputData = scaleInput(inputData);
        
        // Convert the input data to a Tensor
        const inputTensor = tf.tensor2d(inputData);
        console.log("after 1", inputData)
        // Make a prediction
        const prediction = model.predict(inputTensor);
        console.log("after 2", prediction)
        const result = await prediction.array();
        console.log("after 3", result)

        // Map the predicted classes to risk levels
        const riskMapping = { 0: 'Low Risk', 1: 'Medium Risk', 2: 'High Risk' };
        const predictedClasses = result.map(pred => pred.indexOf(Math.max(...pred)));
        const predictedRisks = predictedClasses.map(cls => riskMapping[cls]);

        res.json({ risks: predictedRisks });
    } catch (error) {
        console.error('Error making prediction:', error);
        res.status(500).json({ error: 'Error making prediction' });
    }
})

export default router;
