🧠 Benchmark Health
Federated AI Evaluation Platform

Benchmark Health is a privacy-first AI model validation platform that allows healthcare institutions to evaluate machine learning models without sharing patient data.

Instead of sending hospital data to companies, the model is evaluated locally at each hospital, and only performance metrics are returned.

🚀 What Problem Does It Solve?

Healthcare AI models often fail when deployed across different populations because:

Hospitals cannot share patient data (privacy laws)

Models are tested on limited datasets

Bias and fairness issues go undetected

Benchmark Health enables secure, multi-hospital validation while keeping data private.

🔐 How It Works
Company uploads model
        ↓
Model sent to hospital nodes
        ↓
Model evaluated on local data
        ↓
Only metrics (accuracy, bias, etc.) returned

✔ No raw patient data leaves the hospital
✔ Fairness analysis included
✔ Automated benchmark reports generated

📊 Core Features

Model upload (.pkl)

Multi-node federated evaluation

Accuracy, Precision, Recall, F1, ROC-AUC

Fairness & bias gap detection

Automated PDF benchmark report

React dashboard for visualization

🛠 Tech Stack

Backend

FastAPI

MongoDB

Scikit-learn

Pandas

ReportLab (PDF generation)

Frontend

React (Vite)

Axios

Recharts

📁 Project Structure
benchmark-health/
├── backend/
│   ├── routers/
│   ├── services/
│   ├── federation_nodes/
│   └── models_storage/

▶️ How To Run
1️⃣ Start Backend
cd backend
uvicorn main:app --reload

API Docs:

http://127.0.0.1:8000/docs
2️⃣ Start Frontend
cd frontend
npm install
npm run dev

Open:

http://localhost:5173

🏥 Federation Nodes (Sample Datasets)
backend/federation_nodes/
├── hospital_A/
├── hospital_B/
├── hospital_C/
├── hospital_D/

Each dataset must contain a target column named:

label
📄 Example Workflow

Upload model

Run federation

View metrics per hospital

Analyze fairness

Download PDF report

🌍 Real-World Vision

In production, each hospital would run a secure local evaluation service where:

Data remains inside hospital servers

Models run inside sandboxed containers

Only aggregate metrics are returned

📌 Status

Current Version Includes:

Federated node simulation

Evaluation engine

Fairness monitoring

Automated reporting

React dashboard

📄 License

MIT License

👨‍💻 Author

Benchmark Health
Privacy-first AI validation platform for healthcare
