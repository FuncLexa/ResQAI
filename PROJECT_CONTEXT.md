# PROJECT_CONTEXT.md — ResQAI (DisasterGuard AI)

## What This Project Is
An AI-powered disaster risk prediction and decision-support platform built for the FusionX Hackathon 2026. Users input environmental parameters (rainfall, humidity, temperature, wind speed) and get risk scores, what-if scenario simulations, and actionable insights. Features a live environmental monitor with simulated real-time zone data for Indian cities (Mumbai, Chennai, Kolkata, Delhi NCR).

## Current Status
- [x] Node.js/Express backend with POST /predict endpoint (spawns Python ML subprocess)
- [x] Python LinearRegression model trained on synthetic data
- [x] React frontend with dashboard, monitoring page, and landing page
- [x] Animated SVG risk gauge (LOW/MEDIUM/HIGH)
- [x] Interactive sliders with demo presets (Normal Day, Monsoon Alert, Cyclone Warning, Heat Wave)
- [x] Live Environmental Monitor with auto-refresh (10s) and zone tracking
- [x] Charts: radar, bar, area, line, and pie (Recharts)
- [x] Particle background, glowing orbs, parallax hero
- [x] Deployed with git remote set
- [ ] Model is LinearRegression on synthetic data — not production-ready
- [ ] No Docker or .env files
- [ ] No real-time data integration (simulated monitoring data)

## Architecture Overview
- Backend: Node.js, Express 5, port 5000, spawns Python subprocess for ML
- Frontend: React 18, Vite 5, Tailwind CSS 3, Framer Motion, Recharts, port 3000
- Database: None
- ML/AI layer: Python, scikit-learn LinearRegression, trained on 200 synthetic samples, persisted via joblib
- Deployment: Git remote set to github.com/FuncLexa/ResQAI.git (not deployed live)

## Key Files & Entry Points
- `backend/server.js` — Express server with /predict endpoint (calls Python script)
- `backend/ml/predict.py` — Loads model.pkl and runs prediction from CLI args
- `backend/ml/train.py` — Generates synthetic data and trains LinearRegression model
- `backend/package.json` — Express, cors, react-icons
- `frontend/src/pages/Dashboard.jsx` — Main prediction dashboard with sliders, risk gauge, charts
- `frontend/src/pages/Monitoring.jsx` — Live Environmental Monitor with zone tracking
- `frontend/src/pages/Home.jsx` — Landing page with hero, features, how-it-works
- `frontend/src/components/RiskGauge.jsx` — Animated SVG risk meter component

## Environment & Setup
- Backend: `cd backend && pip install -r requirements.txt && npm install && node server.js`
- Frontend: `cd frontend && npm install && npm run dev`
- ML training: `cd backend && python ml/train.py` (generates model.pkl)
- No env vars needed (no .env files)
- **Gotcha**: ML model is trained on synthetic data (200 random samples with linear formula) — not suitable for real predictions
- **Gotcha**: Backend spawns Python as a child process for each request — cold start penalty

## Where I Left Off
- Last thing: "updated backend" (commit 4b4bf8e)
- Next: Replace synthetic data with real disaster/historical data, add Docker deployment, improve ML model
- Known: Model is a simple linear regression on random data; monitoring page uses simulated data, not real-time feeds

## Git & Deployment
- Remote: `https://github.com/FuncLexa/ResQAI.git`
- Branch: main
- Last commit: "updated backend"

## Context for AI Assistants
- The "AI" is a LinearRegression trained on 200 synthetic samples with a hardcoded linear formula — it's a demo/prototype, not a real ML system
- Backend uses child_process.spawn to call Python predict.py with CLI args — the Python script reads 4 numbers from sys.argv, runs model.predict(), prints the result
- Frontend Dashboard handles backend errors gracefully with mock data fallback (if /predict fails, it uses hardcoded risk data based on preset selection)
- Monitoring page uses simulated data (setInterval with random fluctuations around baseline per zone) — no actual IoT/sensor integration
- Framer Motion v10 on frontend (older version) vs v12 on root package.json — the root framer-motion dep may be a copy mistake
- The project has two authors: Mohammad Adnan Shakil (backend, initial commit) and Sultan Salauddin Ansari (frontend UI, README)
- Vite build uses Terser for minification with console/debugger stripping
