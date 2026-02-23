# 🧠 Benchmark Health — Phase 2 Backend

Benchmark Health is a **privacy-first federated AI model validation platform** designed to help developers and healthcare organizations evaluate AI models across multiple datasets **without sharing sensitive data**.

This repository now includes **Phase-1 + Phase-2 Backend**, introducing a **Federated Node Simulator** built with **FastAPI + MongoDB + Pandas**.

---

# 🚀 Project Purpose

Healthcare AI models often fail when deployed across different populations due to lack of diverse validation data. Hospitals cannot freely share patient datasets because of privacy and regulatory constraints.

Benchmark Health solves this by enabling:

✅ **Federated Validation** — models move to data
✅ Multi-dataset benchmarking
✅ Privacy-preserving architecture

---

# 🌐 What Changed in Phase-2

Phase-2 introduces a **Federated Node Simulator**, where each dataset acts like an independent hospital.

Instead of:

```
One model → One dataset
```

Your system now performs:

```
One model → Multiple hospitals → Aggregated results
```

---

# 🧱 Tech Stack

* **Backend:** FastAPI (Python)
* **Database:** MongoDB
* **Server:** Uvicorn
* **Data Processing:** Pandas
* **Validation:** Pydantic

---

# 📂 Updated Project Structure

```
benchmark-health/
└── backend/
    ├── main.py
    ├── config/
    │   └── db.py
    ├── routers/
    │   ├── models.py
    │   └── federation.py        ⭐ NEW (Phase-2)
    ├── services/
    │   ├── dataset_loader.py    ⭐ NEW
    │   └── orchestrator.py      ⭐ NEW
    ├── schemas/
    │   └── model_schema.py
    └── federation_nodes/        ⭐ NEW
        ├── hospital_A/adult.csv
        ├── hospital_B/heart.csv
        ├── hospital_C/diabetes.csv
        └── hospital_D/compas.csv
```

---

# 🧩 Phase-2 Architecture

## Federation Flow

```
User uploads model
        ↓
POST /federation/run/{model_id}
        ↓
Dataset Loader scans hospital folders
        ↓
Federation Orchestrator executes simulation
        ↓
Results returned per hospital node
```

Each hospital folder represents an independent institution.

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```
git clone <repo-url>
cd benchmark-health/backend
```

## 2️⃣ Install Dependencies

```
pip install fastapi uvicorn pymongo python-multipart pandas
```

<<<<<<< HEAD
=======
## 3️⃣ Start MongoDB

```
mongodb://localhost:27017
```

>>>>>>> 0fa30c7 (phase-2)
---

# ▶️ Running the Server

Inside `backend/`:

```
uvicorn main:app --reload
```

Server URL:

```
http://127.0.0.1:8000
```

---

# 🧪 API Testing (Swagger UI)

Open:

```
http://127.0.0.1:8000/docs
```

---

## Phase-1 Endpoint

### POST `/models/upload`

```json
{
  "name": "heart_model",
  "type": "classification"
}
```

---

## Phase-2 Endpoint ⭐ NEW

### POST `/federation/run/{model_id}`

Example:

```
POST /federation/run/test_model
```

Example Response:

```json
[
  {"model_id":"test_model","node":"hospital_A","records":32561},
  {"model_id":"test_model","node":"hospital_B","records":303},
  {"model_id":"test_model","node":"hospital_C","records":768},
  {"model_id":"test_model","node":"hospital_D","records":7214}
]
```

---

# 📦 Phase-2 Features

✅ Federated Node Simulation
✅ Dynamic Dataset Loader
✅ Multi-Hospital Architecture
✅ Dataset Standardization (`label` column)
✅ Federation API Endpoint

---

# 🔐 Dataset Requirement

Each hospital dataset must contain a target column named:

```
label
```

Example mappings:

| Dataset       | Original Column | Required |
| ------------- | --------------- | -------- |
| Adult Income  | income          | label    |
| Heart Disease | target          | label    |
| Diabetes      | Outcome         | label    |
| COMPAS        | is_recid        | label    |

---

# 🧠 Why Phase-2 Matters

Phase-1 provided backend infrastructure.

Phase-2 transforms the system into:

```
Federated AI Validation Platform
```

The backend now simulates real-world distributed evaluation pipelines used in privacy-sensitive industries.

---

# 🔜 Next Phases (Planned)

* Evaluation Engine (Accuracy, Precision, Recall)
* Fairness Analyzer (Bias Metrics)
* MongoDB Result Storage
* React Analytics Dashboard

---

# 👨‍💻 Author

Benchmark Health — Federated AI Validation Platform
Built for privacy-first healthcare AI infrastructure.
