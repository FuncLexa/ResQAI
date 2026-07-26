# Architecture

## Component Breakdown

### React Frontend
- **Role:** Risk assessment UI with animated gauge, radar/bar/area/line/pie charts, live monitor
- **Tech:** React 19 + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide React
- **Location:** frontend/

### Express Backend
- **Role:** REST API for risk prediction and what-if simulation
- **Tech:** Node.js + Express 5 + CORS + child_process
- **Location:** backend/server.js

### ML Prediction Engine
- **Role:** Linear regression model for disaster risk scoring
- **Tech:** Python + scikit-learn (LinearRegression)
- **Location:** backend/ml/

## Key Architectural Decisions

### Decision 1: Python Subprocess for ML over In-Process
**What:** Express spawns Python predict.py as child process for each prediction request
**Why:** Avoids running a separate Python server. Simple integration pattern for hackathon.
**Tradeoff:** Subprocess overhead. Python must be installed on the deployment server. No caching or warm models.

### Decision 2: Synthetic ML Model over Real Data
**What:** Trained on 200 synthetic samples with formula risk = rainfall\*0.4 + humidity\*0.25 + temperature\*0.15 + wind_speed\*0.2
**Why:** No real disaster dataset available for hackathon. Synthetic model demonstrates the integration pattern.
**Tradeoff:** No real predictive value. Coefficient weights are arbitrary.

### Decision 3: What-If Simulation at Application Layer
**What:** Backend runs additional predictions with modified inputs (e.g., rainfall -20%) to generate what-if scenarios
**Why:** Avoids needing Python to handle simulation logic. Application layer has full control over scenario generation.
**Tradeoff:** Requires multiple Python subprocess calls per simulation. Harder to scale for complex multi-variable simulations.

## Data Flow
1. User inputs environmental parameters (rainfall, humidity, temperature, wind speed) → React form
2. POST /predict to Express backend
3. Backend spawns Python predict.py with 4 CLI arguments → receives risk score
4. Backend classifies risk level (LOW < 50, MEDIUM 50-80, HIGH > 80), generates explanation
5. Backend runs what-if simulation (rainfall -20%) via additional Python call
6. Response returned with riskLevel, riskScore, reason, insight, whatIf results
7. Frontend renders animated risk gauge, radar chart, and simulation comparison

## Known Limitations
- ML model trained on 200 synthetic samples — no real predictive value
- Python subprocess per request — poor performance at scale
- Live Environmental Monitor uses simulated data, not real-time feeds
- No database for persistence
- No Docker/deployment config for backend

## Future Considerations
- Train on real disaster datasets (flood, earthquake, cyclone)
- Replace subprocess with Flask/Gunicorn ML microservice
- Integrate real-time weather APIs for live monitoring
- Add persistent storage for prediction history
- Add Docker for deployment
