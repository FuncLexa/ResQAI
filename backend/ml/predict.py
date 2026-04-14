import sys
import joblib
import numpy as np
import os

# Load model

base_dir = os.path.dirname(__file__)
model_path = os.path.join(base_dir, "model.pkl")

model = joblib.load(model_path)

# Get inputs
rainfall = float(sys.argv[1])
humidity = float(sys.argv[2])
temperature = float(sys.argv[3])
wind_speed = float(sys.argv[4])

# Predict
input_data = np.array([[rainfall, humidity, temperature, wind_speed]])
prediction = model.predict(input_data)

print(prediction[0])