# 🧠 Benchmark Health — Phase 1 Backend

Benchmark Health is a **privacy-first federated AI model validation platform**.
This repository currently contains the **Phase-1 Backend Core**, built with **FastAPI + MongoDB**, which allows users to register AI models into the system.

---

## 🚀 Project Purpose

Healthcare AI models often fail across different populations because hospitals cannot share patient data.
Benchmark Health solves this by enabling **federated validation** — models move to datasets instead of datasets moving to companies.

Phase-1 focuses on:

* FastAPI backend setup
* MongoDB database connection
* Model Registry API

---

## 🧱 Tech Stack

* **Backend:** FastAPI (Python)
* **Database:** MongoDB
* **Server:** Uvicorn
* **Validation:** Pydantic

---

## 📂 Project Structure

```
benchmark-health/
└── backend/
    ├── main.py
    ├── config/
    │   └── db.py
    ├── routers/
    │   └── models.py
    ├── schemas/
    │   └── model_schema.py
```

---

## ⚙️ Installation

### 1️⃣ Clone or Download Project

```
git clone <repo-url>
cd benchmark-health/backend
```

### 2️⃣ Install Dependencies

```
pip install fastapi uvicorn pymongo python-multipart
```

---

## ▶️ Running the Server

Inside `backend/` folder:

```
uvicorn main:app --reload
```

Server will run at:

```
http://127.0.0.1:8000
```

---

## 🧪 API Testing (Swagger UI)

Open:

```
http://127.0.0.1:8000/docs
```

Test endpoint:

### POST `/models/upload`

Example Request:

```json
{
  "name": "heart_model",
  "type": "classification"
}
```

Expected Response:

```json
{
  "message": "Model registered successfully"
}
```

---

## 📦 Phase-1 Features

✅ FastAPI Backend Core
✅ MongoDB Connection
✅ Model Registry API
✅ Swagger Testing Interface

---

## 🔜 Next Phases (Planned)

* Federated Node Simulator
* Evaluation Engine
* Fairness Analyzer
* React Dashboard

---

## 👨‍💻 Author

Benchmark Health — Federated AI Validation Platform
Built for privacy-first healthcare AI infrastructure.
