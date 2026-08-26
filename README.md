# 🏛️ BhoomiAI: Intelligent Land Record Digitization & Validation System

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.12-blue.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20%7C%20Tailwind%20v4-teal.svg)](https://reactjs.org/)
[![Blockchain](https://img.shields.io/badge/Security-SHA--256%20Merkle%20Ledger-amber.svg)](https://en.wikipedia.org/wiki/SHA-2)
[![DILRMP Compliant](https://img.shields.io/badge/Standard-DILRMP%20%2F%20BhuNaksha-green.svg)](https://dilrmp.gov.in/)

---

## 📌 Executive Summary
Land records across various administrative regions are historically maintained in fragmented, physically degraded paper registers, handwritten legacy formats, and diverse regional scripts (*7/12 Extracts, Khasra, Khatauni, Jamabandi, Pattas, and Cadastral Maps*). Manual entry leads to human errors, boundary disputes, title duplications, and fraudulent double-allocations.

**BhoomiAI** is an enterprise-grade digital governance and AI platform. It combines **Computer Vision for archival document restoration**, **multilingual Indic OCR**, **Cadastral GIS (Bhu-Naksha) vectorization**, **multi-tier anomaly/fraud auditing**, and **cryptographic Blockchain mutation tracking** with verifiable QR-coded digital Records of Rights (e-RoR).

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Input Layer
        A1[Degraded Archival Paper Scan]
        A2[Scanned PDF Registers]
        A3[Cadastral Village Maps / Bhu-Naksha]
    end

    subgraph AI Restoration & Preprocessing
        B1[Adaptive Sauvola/Otsu Binarization]
        B2[Radon/Hough Deskewing Transform]
        B3[CLAHE Contrast & Denoise Filter]
    end

    subgraph AI Extraction & NLP
        C1[Indic OCR Engine - Devanagari/Tamil/Telugu/English]
        C2[Key-Entity Extractor - NER / LayoutLM Rules]
        C3[Confidence Scoring & Bounding Box Generator]
    end

    subgraph Cadastral GIS Engine
        D1[Parcel Polygon Vectorization]
        D2[Geo-Referencing & Satellite Overlay]
        D3[Leaflet/MapLibre Spatial Studio]
    end

    subgraph Multi-Tier Validation & Fraud Engine
        E1[Cross-Record Area Reconciliation - RoR vs GIS]
        E2[Double-Allocation & Title Conflict Detector]
        E3[Spatial Overlap & Encroachment Alert]
        E4[Forensic Seal & Signature Verification]
    end

    subgraph Governance & Trust Layer
        F1[SHA-256 Blockchain Mutation Ledger]
        F2[Verifiable Digital e-RoR Passbook with QR Code]
    end

    subgraph User Experience
        G1[Revenue Officer Workflow - Patwari/Tehsildar]
        G2[Bhoomi Mitra AI - Citizen Multilingual Voice/Text]
    end

    A1 & A2 --> B1 --> B2 --> B3 --> C1 --> C2 --> C3
    A3 --> D1 --> D2 --> D3
    C2 & D1 --> E1 & E2 & E3 & E4
    C2 & E1 --> F1 --> F2
    C3 & E1 & E2 & F1 --> G1
    F2 & D3 & G2 --> G2
```

---

## 🚀 Key Modules & Capabilities

| Module | Core Features & Technical Implementation |
| :--- | :--- |
| **1. Archival Restoration Studio** | Adaptive Sauvola binarization, Hough deskewing angle detection, median noise removal, and an interactive **Before/After split comparison slider**. |
| **2. Indic Multilingual OCR & KIE** | Deep key-information extraction for **7/12 (Maharashtra/Gujarat)**, **Khasra-Khatauni (UP/MP)**, **Patta/Chitta (Tamil Nadu)**, and **Jamabandi (Punjab)**. Parses Survey No, Khata No, Landowners with Aadhaar hash, multi-unit area conversions (Ha, Acre, Bigha, Guntha, Sq.m), Soil classification, Tax/Lagan, and Mortgages with visual bounding boxes. |
| **3. Cadastral GIS (Bhu-Naksha) Explorer** | Vectorized land parcel polygons overlaid on high-resolution satellite imagery. Features plot attribute inspector, dispute heatmaps, sub-division (Hissa) split/merge simulator, and GeoJSON export. |
| **4. Multi-Tier AI Fraud & Anomaly Center** | Automated checks: Area discrepancy (RoR vs GIS polygon area), double-allocation alerts, road buffer encroachments, and uncertified mutation gap detection. |
| **5. Blockchain Mutation Ledger** | Immutable SHA-256 Merkle chain recording deed transfers and inheritance splits. Includes **Tamper Simulation Mode** to demonstrate cryptographic chain breakage upon unauthorized edits. |
| **6. Verifiable Digital e-RoR Passbook** | Downloadable official land certificate with embedded dynamic QR code verifying SHA-256 seal. |
| **7. Bhoomi Mitra AI Citizen Assistant** | Conversational AI assistant supporting Hindi, English, Marathi, Tamil, Gujarati, and Telugu with voice synthesis simulation. |

---

## 📂 Project Repository Structure

```
├── backend/                       # Python FastAPI Backend & AI Services
│   ├── main.py                    # REST API Entrypoint & CORS handlers
│   ├── requirements.txt           # Python dependencies (FastAPI, Pillow, NumPy)
│   └── services/
│       ├── restoration.py         # Sauvola binarization, deskewing, dewarping
│       ├── ocr_engine.py          # Indic OCR & LayoutLM rule-based extraction
│       ├── cadastral_gis.py       # GeoJSON polygon processing & spatial metrics
│       ├── validation.py          # Multi-tier anomaly and fraud audit rules
│       └── blockchain.py          # Cryptographic SHA-256 block ledger
│
├── frontend/                      # Modern React 18 + Vite SPA Web Portal
│   ├── src/
│   │   ├── components/            # UI components (Restoration, OCR, GIS, Blockchain, e-RoR)
│   │   ├── data/                  # Pre-loaded realistic Indic land records & GeoJSON
│   │   ├── utils/                 # Multilingual i18n translations & API helpers
│   │   └── index.css              # Glassmorphism & GovTech design system tokens
│   └── package.json
│
├── ocr_mvp/                       # ⚡ Lightweight Standalone Single-Folder OCR MVP
│   ├── app.py                     # Self-contained lightweight Python web app
│   ├── run_ocr_mvp.bat            # 1-Click launcher
│   └── requirements.txt
│
├── start_platform.bat             # 1-Click launcher for full-stack platform
├── start_platform.ps1             # PowerShell 1-click launcher
└── README.md                      # Project documentation
```

---

## ⚡ Quickstart Guide

### Option A: Run Full-Stack Platform
Double-click [`start_platform.bat`](file:///c:/Users/user/Desktop/sih/start_platform.bat) or run:

```bash
# Terminal 1: Backend API
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --port 8000 --host 127.0.0.1 --reload

# Terminal 2: Frontend Web Portal
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

---

### Option B: Run Lightweight Standalone OCR MVP
Double-click [`ocr_mvp/run_ocr_mvp.bat`](file:///c:/Users/user/Desktop/sih/ocr_mvp/run_ocr_mvp.bat) or run:

```bash
cd ocr_mvp
python app.py
```
Open **`http://localhost:5000/`** in your browser.

---

## 🔒 Security & Standards Compliance
- **Digital India Land Records Modernization Programme (DILRMP)** standards.
- **SHA-256 Cryptographic Block Ledger** for immutable audit trails.
- **Role-Based Access Control (RBAC)** separating Revenue Officer workflows (Patwari/Tehsildar) from Citizen self-service.
- **W3C Verifiable Credentials** with QR code payload hashing.

---

## 📄 License
This project is licensed under the MIT License.
