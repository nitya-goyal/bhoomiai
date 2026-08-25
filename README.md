# BhoomiAI: Intelligent Land Record Digitization & Validation System
### Smart India Hackathon 2026 | Problem Statement ID: SIH26-26018
**Ministry of Rural Development • Department of Land Resources (DoLR)**

---

## 📌 Executive Summary
Land administration across India faces immense challenges with historical paper records (*7/12 Extracts, Khasra, Khatauni, Jamabandi, Pattas*) that are degraded, multilingual, and manually indexed. This creates property disputes, double-allocations, and title manipulation.

**BhoomiAI** is an end-to-end digital governance and AI platform that restores archival documents, extracts key entities using multilingual Indic OCR, verifies boundaries with Cadastral GIS (Bhu-Naksha), detects fraud, and records land mutations on an immutable **SHA-256 Blockchain Ledger**.

---

## ✨ Key Features & Innovation

| Module | Features & Capabilities |
| :--- | :--- |
| **1. Archival Restoration Studio** | Adaptive Sauvola binarization, Hough deskewing, noise filtering, and an interactive Before/After split comparison slider. |
| **2. Indic Multilingual OCR & KIE** | Deep key-entity extraction for Hindi, Marathi, Gujarati, Tamil, Telugu, and English records with visual bounding boxes. |
| **3. Cadastral (Bhu-Naksha) GIS** | Vectorized land parcel polygons overlaid on satellite imagery with parcel inspection, dispute heatmaps, and split/merge simulation. |
| **4. AI Fraud & Anomaly Detector** | Cross-record area reconciliation, double-allocation detector, road encroachment alerts, and title lineage integrity checks. |
| **5. Blockchain Mutation Ledger** | Immutable SHA-256 Merkle chain, live mutation creator, tamper simulation evaluator mode, and QR-verifiable digital e-RoR. |
| **6. Bhoomi Mitra AI Assistant** | Conversational citizen assistant supporting Hindi, English, and regional voice/text queries. |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS v4, Lucide React, Leaflet, Canvas Confetti, QRCode SVG.
- **Backend / AI Services**: Python 3.12, FastAPI, Uvicorn, OpenCV, Pillow, NumPy, Pydantic.
- **Security & Integrity**: SHA-256 Merkle Ledger, W3C Verifiable Credentials.

---

## 🚀 Quickstart Guide

### 1. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --port 8000 --host 127.0.0.1
```

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

Visit **`http://127.0.0.1:5173/`** in your browser.

---

## 🏆 SIH Pitch & Demonstration Highlights

1. **Demonstrate Restoration**: Select an aged 7/12 extract $\rightarrow$ adjust the Sauvola threshold and deskew sliders $\rightarrow$ compare using the center split divider.
2. **Demonstrate Indic OCR**: Inspect extracted Khata, Survey No, Owner shares, and multi-unit area conversions with bounding boxes.
3. **Demonstrate Cadastral GIS**: Inspect Plot 84/3 on the satellite map $\rightarrow$ see the critical boundary overlap alert on the Gaothan Road buffer.
4. **Demonstrate Blockchain Tamper Proofing**: Open Blockchain Ledger $\rightarrow$ click **"Tamper Simulation"** $\rightarrow$ show judges how the cryptographic chain immediately breaks at Block #2 $\rightarrow$ click **"Restore"** to re-verify.
5. **Generate Verifiable e-RoR**: Click **"Verify e-RoR"** to display the official Government of India certificate with dynamic QR code verification.
