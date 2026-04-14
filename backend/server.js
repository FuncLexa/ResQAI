const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});
app.post("/predict", (req, res) => {
const { rainfall, humidity, temperature, windSpeed } = req.body;

const command = `python ./ml/predict.py ${rainfall} ${humidity} ${temperature} ${windSpeed}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "ML execution failed" });
    }

    const score = parseFloat(stdout);

    let riskLevel = "LOW";
    if (score > 80) riskLevel = "HIGH";
    else if (score > 50) riskLevel = "MEDIUM";

    let reason = "";
    if (riskLevel === "HIGH") {
      reason = "Heavy rainfall and humidity detected → flood risk";
    } else if (riskLevel === "MEDIUM") {
      reason = "Moderate environmental conditions";
    } else {
      reason = "Conditions are safe";
    }

    let insight = "";
    if (riskLevel === "HIGH") {
      insight = "Immediate disaster preparedness required";
    } else if (riskLevel === "MEDIUM") {
      insight = "Monitor conditions closely";
    } else {
      insight = "No immediate action needed";
    }

    // 🔥 Simulation (Centsight-style)
    const simulatedRainfall = rainfall * 0.8;

    const simCommand = `python ./ml/predict.py ${simulatedRainfall} ${humidity} ${temperature}`;

    exec(simCommand, (simErr, simOut) => {
      let simulatedRisk = "LOW";

      if (!simErr) {
        const simScore = parseFloat(simOut);

        if (simScore > 80) simulatedRisk = "HIGH";
        else if (simScore > 50) simulatedRisk = "MEDIUM";
      }

      res.json({
        riskLevel,
        riskScore: Math.round(score),
        reason,
        insight,
        whatIf: {
          reducedRainfall: simulatedRisk
        }
      });
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});