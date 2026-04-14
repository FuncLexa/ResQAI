<div align="center">

# 🚨 ResQAI — AI Disaster Intelligence System

### Predict. Simulate. Act.

**An AI-powered disaster risk prediction and decision-support platform that analyzes environmental conditions, classifies disaster risk, and enables what-if simulation to support proactive emergency response.**

<br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [API Reference](#-api-reference)
- [Use Cases](#-use-cases)
- [Future Roadmap](#-future-roadmap)

---

## 🧠 Overview

ResQAI is not just a prediction tool — it is an **intelligent disaster decision-support system** that combines machine learning, simulation, and visualization to enable proactive risk management.

Traditional disaster monitoring systems provide raw data. ResQAI goes further by:

- **Predicting** flood and extreme weather risk from real-time environmental inputs
- **Explaining** the reasoning behind every prediction in plain language
- **Simulating** how changes in conditions affect risk levels through a What-if Engine
- **Recommending** actionable steps based on the predicted risk

> Built for government authorities, emergency response teams, urban planners, and citizens who need data-driven decisions — not just raw numbers.

---

## ✨ Key Features

### 🤖 AI Risk Prediction
The ML model processes multi-factor environmental inputs and outputs:
- **Risk Score** — a continuous value from 0 to 100
- **Risk Level** — classified as `LOW`, `MEDIUM`, or `HIGH`
- **Explainable Reasoning** — a natural language explanation of why the risk is at that level

### 🔁 What-if Simulation Engine
ResQAI's standout feature. Users can modify any environmental variable and instantly see how the risk changes — enabling cause-effect understanding and preventive planning.

> Example: *If rainfall decreases from 300mm to 100mm → Risk drops from HIGH to MEDIUM*

### 📊 Visual Risk Dashboard
- Animated circular risk gauge with color-coded glow (green / orange / red)
- Radar chart mapping all 4 environmental factors
- Horizontal bar chart showing each factor's contribution percentage

### 💡 Actionable Insights
Every prediction comes with a recommended action — not just a score. ResQAI tells you *what to do*, not just *what the risk is*.

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                        │
│  ┌──────────────┐   ┌──────────────┐   ┌─────────────────┐  │
│  │  Input Panel │   │ Results Panel│   │  Charts Panel   │  │
│  │  (4 sliders) │   │ (Gauge + AI) │   │ (Radar + Bar)   │  │
│  └──────┬───────┘   └──────────────┘   └─────────────────┘  │
└─────────┼───────────────────────────────────────────────────┘
          │ POST /predict { rainfall, humidity, temp, windSpeed }
          ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER (Node.js / Express)                 │
│                                                              │
│   Receives request → Validates inputs → Spawns child process │
└─────────────────────────────────────────────────────────────┘
          │ child_process.spawn
          ▼
┌─────────────────────────────────────────────────────────────┐
│                    ML ENGINE (Python)                         │
│                                                              │
│   predict.py → loads model.pkl → runs inference             │
│   Returns: { riskScore, riskLevel, reason, insight }        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 + Vite | UI framework |
| Styling | Tailwind CSS | Utility-first styling |
| Charts | Recharts | Radar & bar visualizations |
| Icons | Lucide React | Icon system |
| Routing | React Router DOM v7 | Page navigation |
| HTTP Client | Axios | API calls |
| Backend | Node.js + Express | REST API server |
| ML Bridge | child_process | Node ↔ Python communication |
| ML Model | Python + Scikit-learn | Risk prediction |
| Training | Pandas + NumPy | Data processing |
| Persistence | Joblib | Model serialization |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Python 3.8+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Mohammad-Adnan-Shakil/ResQAI.git
cd ResQAI
```

### 2. Train the ML model

```bash
cd backend
pip install numpy pandas scikit-learn joblib
python train.py
```

This generates `model.pkl` in the backend directory.

### 3. Start the backend server

```bash
cd backend
npm install
node main.js
```

Server runs on `http://localhost:5000`

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 5. Open the app

Navigate to `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
ResQAI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky navigation bar
│   │   │   ├── RiskGauge.jsx       # Animated SVG risk meter
│   │   │   ├── FeatureCard.jsx     # Homepage feature cards
│   │   │   └── Loader.jsx          # Loading spinner
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   └── Dashboard.jsx       # Prediction dashboard
│   │   ├── App.jsx                 # Root component + routing
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles + Tailwind
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── main.js                     # Express server
│   ├── predict.py                  # ML inference script
│   ├── train.py                    # Model training script
│   ├── model.pkl                   # Trained model (generated)
│   └── package.json
│
└── README.md
```

---

## ⚙️ How It Works

### Step 1 — Environmental Input
The user provides four real-world environmental parameters via interactive sliders:

| Parameter | Unit | Range |
|-----------|------|-------|
| Rainfall | mm | 0 – 500 |
| Humidity | % | 0 – 100 |
| Temperature | °C | -10 – 60 |
| Wind Speed | km/h | 0 – 200 |

### Step 2 — ML Inference
The Node.js server receives the inputs and spawns a Python child process that loads the trained Scikit-learn model and runs inference. The model outputs a continuous risk score which is mapped to a risk level.

### Step 3 — Results + Simulation
The frontend renders:
- An animated circular gauge showing the risk score
- A colored badge (LOW / MEDIUM / HIGH)
- AI-generated reasoning and recommended action
- Radar and bar charts for visual factor analysis
- What-if simulation results if triggered

---

## 📡 API Reference

### `POST /predict`

Predicts disaster risk from environmental inputs.

**Request Body:**
```json
{
  "rainfall": 250,
  "humidity": 80,
  "temperature": 30,
  "windSpeed": 60
}
```

**Response:**
```json
{
  "riskScore": 78.4,
  "riskLevel": "HIGH",
  "reason": "Extremely high rainfall combined with elevated humidity significantly increases flood probability.",
  "insight": "Evacuate low-lying areas immediately. Alert emergency response teams and monitor water levels.",
  "whatIf": {
    "reducedRainfall": "MEDIUM",
    "reducedWindSpeed": "HIGH"
  }
}
```

---

## 👥 Use Cases

| Audience | How They Use ResQAI |
|----------|-------------------|
| 🏛️ Government Authorities | Disaster preparedness planning based on predicted risk levels |
| 🚑 Emergency Response Teams | Proactive deployment decisions before disasters occur |
| 🏙️ Urban Planners | Assessing environmental risk for infrastructure decisions |
| 👨‍👩‍👧‍👦 General Citizens | Understanding personal risk and taking preventive action |

---

## 🗺 Future Roadmap

- [ ] Live weather API integration (OpenWeatherMap / IMD)
- [ ] Geographic risk mapping with interactive heatmaps
- [ ] Multi-disaster type support (cyclones, earthquakes, wildfires)
- [ ] SMS/email alert system for high-risk predictions
- [ ] Historical risk trend analysis
- [ ] Mobile app (React Native)
- [ ] Admin dashboard for authorities with region-wise monitoring

---

## 👥 Team
FuncLexa

Focused on building intelligent, real-world AI systems for impactful problem-solving.

Members:

Mohammad Adnan Shakil, 
Sultan Salauddin Ansari
---

<div align="center">

**ResQAI — Bridging the gap between environmental data and real-world disaster decisions.**

⭐ Star this repo if you found it useful!

</div>
