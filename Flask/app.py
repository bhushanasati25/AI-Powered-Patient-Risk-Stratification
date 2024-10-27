from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import joblib

app = Flask(__name__)

# Load the trained model and scaler at startup
model = tf.keras.models.load_model('risk_stratification_model.h5')
scaler = joblib.load('scaler.pkl')

# Define the risk mapping
risk_mapping = {0: 'Low Risk', 1: 'Medium Risk', 2: 'High Risk'}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the request
        data = request.get_json(force=True)
        
        # Extract features from the data
        # Assuming the input is a list of feature lists
        inputs = data.get('inputs')
        if not inputs:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Convert inputs to numpy array
        inputs_array = np.array(inputs)
        
        # Scale the inputs
        inputs_scaled = scaler.transform(inputs_array)
        
        # Make predictions
        predictions = model.predict(inputs_scaled)
        
        # Get the predicted classes
        predicted_classes = np.argmax(predictions, axis=1)
        
        # Map the classes to risk levels
        predicted_risks = [risk_mapping[cls] for cls in predicted_classes]
        
        # Return the predictions
        return jsonify({'predictions': predicted_risks})
    
    except Exception as e:
        # Handle exceptions
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
