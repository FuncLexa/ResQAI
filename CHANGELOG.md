# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-02

### Added
- Initial project setup with React + Vite + Tailwind CSS (`c2973fb`)
- Express backend with `/predict` endpoint using child_process to spawn Python (`4b4bf8e`)
- Python ML training pipeline (`train.py`) with 200 synthetic samples and scikit-learn LinearRegression
- Python inference script (`predict.py`) loading `model.pkl` for risk scoring
- Animated circular risk gauge with color-coded glow (LOW/MEDIUM/HIGH)
- Radar chart and horizontal bar chart for environmental factor visualization
- What-if scenario simulation: backend runs additional predictions with reduced rainfall (80%)
- Demo preset scenarios (Normal Day, Monsoon Alert, Cyclone Warning, Heat Wave)
- AI-powered reasoning and actionable insight generation per risk level
- Live Environmental Monitor page with simulated real-time data streaming
  - Area chart for 24h risk score trend
  - Multi-parameter line chart (rainfall, temperature, humidity)
  - Pie chart for risk distribution by zone
  - Zone status cards with risk indicators
- Landing page (Home.jsx) with feature showcase
- Framer Motion animations and particle/glow effects throughout UI
- Mock data fallback when backend is unavailable (hackathon demo mode)
- Navbar with navigation between Home, Dashboard, and Monitoring pages
- Loading spinner and error handling states

### Documentation
- README with project overview, features, architecture diagram, setup guide, API reference, and roadmap (`4c79f93`)
- PROJECT_CONTEXT.md for AI assistant context (`1749e11`)
- Updated README author section to team section (`3b709d0`)
