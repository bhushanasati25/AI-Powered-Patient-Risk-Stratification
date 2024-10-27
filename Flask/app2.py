from flask import Flask, request, jsonify, render_template
import numpy as np
import tensorflow as tf
import joblib

app = Flask(__name__)

# Load the model and scaler
model = tf.keras.models.load_model('risk_stratification_model.h5')
scaler = joblib.load('scaler.pkl')

risk_mapping = {0: 'Low Risk', 1: 'Medium Risk', 2: 'High Risk'}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from form
        features = [float(x) for x in request.form.values()]
        final_features = np.array([features])
        
        # Scale the features
        scaled_features = scaler.transform(final_features)
        
        # Predict
        prediction = model.predict(scaled_features)
        predicted_class = np.argmax(prediction, axis=1)[0]
        risk_level = risk_mapping[predicted_class]
        
        return render_template('index.html', prediction_text=f'Predicted Risk Level: {risk_level}')
    
    except Exception as e:
        return render_template('index.html', prediction_text=f'Error: {str(e)}')

if __name__ == "__main__":
    app.run(debug=True)
