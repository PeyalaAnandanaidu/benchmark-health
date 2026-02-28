🧠 Benchmark Health — Federated AI Evaluation Platform

Benchmark Health is a privacy-first federated AI validation platform that enables secure evaluation of machine learning models across multiple healthcare datasets without sharing sensitive patient data.

Instead of moving hospital data to companies, the platform moves models to data — ensuring privacy, compliance, and fairness.

🚀 Core Idea
Traditional ML:
Hospital Data → Company Server → Model Evaluation ❌

Benchmark Health:
Model → Hospital Node → Local Evaluation → Metrics Only ✅

No raw patient data ever leaves hospital systems.

🎯 Key Features
🔐 Privacy-Preserving Architecture

No raw dataset sharing

Federated evaluation simulation

Secure model execution design

📊 Multi-Node Benchmarking

Evaluate models across multiple hospital datasets

Per-node performance metrics

Feature compatibility validation

⚖️ Fairness & Bias Monitoring

Group-wise accuracy tracking

Bias gap calculation

Protected attribute detection (sex, race, age)

📄 Automated Compliance Reports

Professional PDF benchmark reports

Accuracy summaries

Bias risk indicators

Node-wise breakdown

🎨 React (Vite) Dashboard

Model upload interface

Federation execution

Chart visualizations

PDF report download

🛠 Tech Stack
Backend

FastAPI

MongoDB

Pandas

Scikit-learn

ReportLab (PDF generation)

Matplotlib (Charts)

Frontend

React (Vite)

Axios

Recharts

Tailwind CSS (optional styling)

🏗 System Architecture
Frontend (React + Vite)
        │
        ▼
Backend (FastAPI)
 ├── /models
 ├── /federation
 └── /reports
        │
        ▼
Services Layer
 ├── dataset_loader.py
 ├── orchestrator.py
 ├── evaluator.py
 ├── fairness.py
 └── report_generator.py
        │
        ▼
Data Layer
 ├── MongoDB (metadata)
 └── Federation Nodes (hospital datasets)
📦 Installation Guide
🔹 Prerequisites

Python 3.9+

Node.js 16+

MongoDB

Git

🖥 Backend Setup
git clone <your-repo-url>
cd benchmark-health/backend

python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux

pip install fastapi uvicorn pymongo python-multipart \
pandas numpy scikit-learn joblib reportlab matplotlib

Start MongoDB locally:

mongodb://localhost:27017

Run backend:

uvicorn main:app --reload

Backend URL:

http://127.0.0.1:8000

Swagger Docs:

http://127.0.0.1:8000/docs
🌐 Frontend Setup (Vite)
cd ../frontend
npm install
npm install axios recharts lucide-react
npm run dev

Frontend URL:

http://localhost:5173
📚 API Overview
1️⃣ Upload Model
POST /models/upload

Form-data:

file: model.pkl

Response:

{
  "message": "Model uploaded successfully",
  "model_id": "heart_model"
}
2️⃣ Run Federation
POST /federation/run/{model_id}

Response:

[
  {
    "model_id": "heart_model",
    "node": "hospital_B",
    "status": "evaluated",
    "accuracy": 0.93,
    "precision": 0.91,
    "recall": 0.97,
    "f1_score": 0.94,
    "roc_auc": 0.93,
    "bias_gap": 0.02
  }
]
3️⃣ Generate Report
POST /federation/report/{model_id}

Returns:

PDF File Download
🏥 Federation Nodes

Datasets are stored as:

backend/federation_nodes/
├── hospital_A/
│   └── adult.csv
├── hospital_B/
│   └── heart.csv
├── hospital_C/
│   └── diabetes.csv
├── hospital_D/
│   └── compas.csv
├── hospital_E/
│   └── breast_cancer.csv
📄 Dataset Requirements

Each dataset must:

Be CSV format

Contain a target column named: label

Example mapping:

Dataset	Original Target	Required
Adult	income	label
Heart	target	label
Diabetes	Outcome	label
COMPAS	is_recid	label
Breast Cancer	diagnosis	label
🔄 Development Phases
Phase 1 — Model Management

Upload models

Store metadata in MongoDB

Save model file locally

Phase 2 — Federated Node Simulator

Multi-hospital simulation

Dataset compatibility check

Per-node evaluation status

Phase 3 — Evaluation Engine

Accuracy

Precision

Recall

F1 Score

ROC AUC

Phase 4 — Fairness Monitoring

Protected attribute detection

Group accuracy comparison

Bias gap calculation

Phase 5 — Report Generator

Executive summary

Performance table

Accuracy chart

Fairness metrics

Downloadable PDF

🔐 Real-World Deployment Vision

In production:

Hospitals run secure evaluation nodes

Models execute inside sandboxed containers

Only aggregate metrics are returned

No raw patient data is shared

Signed model verification enforced

Future upgrades:

Authentication & Role-based access

Remote hospital APIs

Docker-based secure execution

Cloud storage integration

Kubernetes deployment

📁 Project Structure
benchmark-health/
│
├── backend/
│   ├── main.py
│   ├── config/
│   ├── routers/
│   ├── services/
│   ├── schemas/
│   ├── models_storage/
│   └── federation_nodes/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── services/
│
├── README.md
├── requirements.txt
└── .gitignore
🚀 Quick Start Summary

Start MongoDB

Run backend → uvicorn main:app --reload

Run frontend → npm run dev

Upload model

Run federation

Download report

📈 Roadmap
Upcoming Enhancements

Remote hospital node simulator

JWT authentication

Role-based dashboard

Real-time WebSocket updates

Multi-model comparison

Cloud deployment support

Secure containerized evaluation

🤝 Contributing

Fork repository

Create feature branch

Commit changes

Push and open PR

📄 License

MIT License

👨‍💻 Author

Benchmark Health Team
Federated AI Validation Platform
Built for privacy-first healthcare AI infrastructure.