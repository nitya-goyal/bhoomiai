# BhoomiAI - Lightweight Standalone Land Record OCR MVP

A compact, ultra-simple, single-folder MVP for **Land Record Digitization & Indic OCR**.

---

## 🚀 How to Run (1-Step)

### Option 1: Double-Click (Windows)
Double-click `run_ocr_mvp.bat` in this folder. It will start the server and automatically open the interface in your browser at `http://127.0.0.1:5000`.

### Option 2: Command Line
```bash
cd ocr_mvp
python app.py
```
Open **`http://127.0.0.1:5000`** in your browser.

---

## ✨ Features Included:
1. **Interactive Document Viewer with Bounding Boxes**: Visualizes where each field (Survey No, Khata No, Area, Owners) is located on the scanned land record.
2. **Pre-loaded Indic Samples**: Instant testing with Maharashtra 7/12, UP Khasra-Khatauni, and Tamil Nadu Patta.
3. **Custom Document Upload**: Drag and drop any land record image or PDF.
4. **Adaptive Binarization Toggle**: One-click filter cleaning up aged/yellowed paper.
5. **JSON Export**: Download structured digitized data with confidence scores.
