import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Generate synthetic dataset
np.random.seed(42)

data_size = 200

rainfall = np.random.uniform(0, 200, data_size)
humidity = np.random.uniform(20, 100, data_size)
temperature = np.random.uniform(10, 45, data_size)
wind_speed = np.random.uniform(0, 100, data_size)

# Risk formula (ground truth)
risk_score = (
    rainfall * 0.4 +
    humidity * 0.25 +
    temperature * 0.15 +
    wind_speed * 0.2
)

# Create dataframe
df = pd.DataFrame({
    "rainfall": rainfall,
    "humidity": humidity,
    "temperature": temperature,
    "wind_speed": wind_speed,
    "risk_score": risk_score
})

# Train model
X = df[["rainfall", "humidity", "temperature", "wind_speed"]]
y = df["risk_score"]

model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, "model.pkl")

print("Model trained and saved!")