from tensorflow import keras
import h5py

# Load the model configuration
with h5py.File('risk_stratification_model_updated.h5', 'r') as f:
    config = f.attrs.get('model_config')
    if config:
        pass  # No need to decode in Python 3, so this can be left as is

# Modify the config to replace 'batch_shape' with 'batch_input_shape'
config = config.replace('batch_shape', 'batch_input_shape')

# Reconstruct the model from the modified config
model = keras.models.model_from_json(config)

# Load weights
model.load_weights('risk_stratification_model.h5')
