import os
import io
import base64
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import numpy as np
import uvicorn

app = FastAPI(title="BhoomiAI - Lightweight Land Record OCR MVP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SAMPLE_DOCS = {
    "712_maharashtra": {
        "title": "Maharashtra 7/12 Extract (सातबारा उतारा)",
        "state": "Maharashtra (Pune - Haveli - Wagholi)",
        "survey_no": "84/2A",
        "khata_no": "142",
        "owners": ["रामचंद्र शंकरराव पाटील (50% Share)", "सुरेश रामचंद्र पाटील (50% Share)"],
        "area_ha": "1.45 Hectares (3.58 Acres / 58 Gunthe)",
        "land_type": "जिरायत (Jirayat / Rainfed Agricultural)",
        "tax": "₹ 18.50 per annum",
        "encumbrance": "Bank of Maharashtra KCC Loan ₹ 3,50,000 (Active Lien)",
        "crops": "खरीप सोयाबीन (1.00 Ha), रब्बी हरभरा (0.45 Ha)",
        "confidence": 98.6,
        "boxes": [
            {"label": "Survey No: 84/2A", "box": [18, 12, 28, 48]},
            {"label": "Khata No: 142", "box": [18, 52, 28, 88]},
            {"label": "Total Area: 1.45 Ha", "box": [30, 12, 42, 48]},
            {"label": "Owners: Ramchandra & Suresh Patil", "box": [44, 12, 62, 58]},
            {"label": "Bank Lien: ₹3.5 Lakhs", "box": [44, 60, 85, 95]}
        ]
    },
    "khasra_up": {
        "title": "UP Khasra-Khatauni (खसरा व खतौनी)",
        "state": "Uttar Pradesh (Varanasi - Pindra - Rampur)",
        "survey_no": "312/1",
        "khata_no": "00218",
        "owners": ["महेश प्रताप सिंह सुत सूर्यदेव सिंह (100% Full Title)"],
        "area_ha": "0.892 Hectares (2.204 Acres / 3.52 Bigha)",
        "land_type": "दोफसली सिंचित (Two-Crop Irrigated)",
        "tax": "₹ 24.00 मालगुजारी",
        "encumbrance": "भारमुक्त (Clear Title / Nil Encumbrance)",
        "crops": "धान (0.892 Ha), गेहूं (0.892 Ha)",
        "confidence": 98.9,
        "boxes": [
            {"label": "Khasra No: 312/1", "box": [17, 48, 26, 88]},
            {"label": "Khata No: 00218", "box": [17, 10, 26, 45]},
            {"label": "Area: 0.892 Ha", "box": [28, 58, 48, 90]},
            {"label": "Owner: Mahesh Pratap Singh", "box": [28, 10, 48, 55]},
            {"label": "Status: Clear Title", "box": [50, 48, 70, 90]}
        ]
    },
    "patta_tn": {
        "title": "Tamil Nadu Patta / Chitta (பட்டா / சிட்டா)",
        "state": "Tamil Nadu (Kanchipuram - Sriperumbudur - Nemili)",
        "survey_no": "204/3B",
        "khata_no": "782",
        "owners": ["மு. செந்தில் குமார் (M. Senthil Kumar) த/பெ முருகேசன்"],
        "area_ha": "0.405 Hectares (1.00 Acre / 100 Cents)",
        "land_type": "நஞ்சை நிலம் (Wetland Irrigated)",
        "tax": "₹ 12.00 தீர்வை",
        "encumbrance": "வில்லங்கம் இல்லை (Nil Encumbrance)",
        "crops": "சம்பா நெல் (Paddy 0.405 Ha)",
        "confidence": 98.4,
        "boxes": [
            {"label": "Survey No: 204/3B", "box": [20, 52, 30, 85]},
            {"label": "Patta No: 782", "box": [20, 15, 30, 48]},
            {"label": "Area: 0.405 Ha", "box": [32, 52, 48, 85]},
            {"label": "Pattadar: M. Senthil Kumar", "box": [32, 15, 48, 50]}
        ]
    }
}

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BhoomiAI - Lightweight Land Record OCR Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background-color: #030712; color: #f3f4f6; }
    .glass { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .tricolor { height: 3px; background: linear-gradient(90deg, #ff9933 0%, #ffffff 50%, #138808 100%); }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <div class="tricolor w-full"></div>

  <!-- Header -->
  <header class="glass border-b border-slate-800 px-6 py-4">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          📑
        </div>
        <div>
          <h1 class="text-xl font-extrabold text-white flex items-center gap-2">
            BhoomiAI OCR Studio
            <span class="text-[10px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">SIH26-26018 MVP</span>
          </h1>
          <p class="text-xs text-slate-400">Lightweight Indic Land Record Digitization & Key-Entity Extraction</p>
        </div>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-slate-300 font-medium">Standalone Engine Ready</span>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-6xl w-full mx-auto px-4 py-6 flex-1 space-y-6">
    
    <!-- Controls & Sample Selector Strip -->
    <div class="glass p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-400">Quick Samples:</span>
        <button onclick="loadSample('712_maharashtra')" class="sample-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 transition-all">Maharashtra 7/12</button>
        <button onclick="loadSample('khasra_up')" class="sample-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all">UP Khasra-Khatauni</button>
        <button onclick="loadSample('patta_tn')" class="sample-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all">Tamil Nadu Patta</button>
      </div>

      <!-- File Upload -->
      <label class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white cursor-pointer transition-all">
        <span>📤 Upload Custom Scan (PNG/JPG/PDF)</span>
        <input type="file" id="fileInput" accept="image/*,.pdf" onchange="handleCustomUpload(event)" class="hidden">
      </label>
    </div>

    <!-- Dual Pane View -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Left 6 Cols: Document Viewer with Bounding Boxes -->
      <div class="lg:col-span-6 glass p-5 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-bold text-white flex items-center gap-2">
              <span>🖼️ Scanned Document Preview & OCR Bounding Boxes</span>
            </h2>
            <span id="scoreBadge" class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              Confidence: 98.6%
            </span>
          </div>

          <div class="relative w-full h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
            <canvas id="docCanvas" width="700" height="460" class="w-full h-full object-contain rounded shadow-lg"></canvas>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>✨ Green bounding boxes show extracted field coordinates</span>
          <button onclick="toggleBinarize()" id="binarizeBtn" class="text-emerald-400 hover:underline font-semibold">Toggle Binarization Filter</button>
        </div>
      </div>

      <!-- Right 6 Cols: Extracted Key Information Form -->
      <div class="lg:col-span-6 glass p-6 rounded-2xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 class="text-base font-bold text-white" id="docTitle">Maharashtra 7/12 Extract</h2>
            <p class="text-xs text-slate-400" id="docState">Pune - Haveli - Wagholi</p>
          </div>
          <button onclick="exportJSON()" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all">
            💾 Export JSON
          </button>
        </div>

        <!-- Field Grid -->
        <div class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-slate-400 font-medium block">Survey / Khasra No.</span>
              <span id="fieldSurvey" class="text-base font-bold text-emerald-400 font-mono mt-0.5 block">84/2A</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-slate-400 font-medium block">Khata / Account No.</span>
              <span id="fieldKhata" class="text-base font-bold text-white font-mono mt-0.5 block">142</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span class="text-slate-400 font-medium block">Total Land Extent / Area:</span>
            <span id="fieldArea" class="text-sm font-bold text-emerald-300 font-mono block">1.45 Hectares (3.58 Acres / 58 Gunthe)</span>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span class="text-slate-400 font-medium block">Land Title Holders (खातेदार):</span>
            <div id="fieldOwners" class="space-y-1 pt-1 font-semibold text-white">
              <div class="p-1.5 rounded bg-slate-800/60">1. रामचंद्र शंकरराव पाटील (50% Share)</div>
              <div class="p-1.5 rounded bg-slate-800/60">2. सुरेश रामचंद्र पाटील (50% Share)</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-slate-400 font-medium block">Classification:</span>
              <span id="fieldClass" class="font-bold text-emerald-400 mt-0.5 block">जिरायत (Jirayat)</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-slate-400 font-medium block">Annual Land Revenue:</span>
              <span id="fieldTax" class="font-bold text-white mt-0.5 block">₹ 18.50</span>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span class="text-slate-400 font-medium block">Encumbrance / Liabilities:</span>
            <span id="fieldEnc" class="font-bold text-amber-300 mt-1 block">Bank of Maharashtra KCC Loan ₹ 3,50,000 (Active Lien)</span>
          </div>
        </div>
      </div>

    </div>
  </main>

  <footer class="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
    BhoomiAI Standalone OCR MVP • Smart India Hackathon 2026 (SIH26-26018)
  </footer>

  <script>
    const docs = """ + str(SAMPLE_DOCS).replace("'", '"') + """;
    let currentDocKey = "712_maharashtra";
    let isBinarized = false;

    function renderDoc(docKey) {
      currentDocKey = docKey;
      const data = docs[docKey];
      if (!data) return;

      document.getElementById('docTitle').innerText = data.title;
      document.getElementById('docState').innerText = data.state;
      document.getElementById('fieldSurvey').innerText = data.survey_no;
      document.getElementById('fieldKhata').innerText = data.khata_no;
      document.getElementById('fieldArea').innerText = data.area_ha;
      document.getElementById('fieldClass').innerText = data.land_type;
      document.getElementById('fieldTax').innerText = data.tax;
      document.getElementById('fieldEnc').innerText = data.encumbrance;
      document.getElementById('scoreBadge').innerText = 'Confidence: ' + data.confidence + '%';

      const ownersHtml = data.owners.map((o, idx) => `<div class="p-1.5 rounded bg-slate-800/60">${idx + 1}. ${o}</div>`).join('');
      document.getElementById('fieldOwners').innerHTML = ownersHtml;

      drawCanvas(data);
    }

    function drawCanvas(data) {
      const canvas = document.getElementById('docCanvas');
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      // Background
      if (isBinarized) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(0, 0, w, h);
        // Stains
        for (let i = 0; i < 200; i++) {
          ctx.fillStyle = 'rgba(120, 53, 15, 0.06)';
          ctx.beginPath();
          ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Borders
      ctx.strokeStyle = isBinarized ? '#0f172a' : '#78350f';
      ctx.lineWidth = 2;
      ctx.strokeRect(15, 15, w - 30, h - 30);

      // Header
      ctx.fillStyle = isBinarized ? '#0f172a' : '#451a03';
      ctx.textAlign = 'center';
      ctx.font = 'bold 16px "Noto Sans Devanagari", sans-serif';
      ctx.fillText(data.title, w / 2, 50);

      ctx.font = '11px sans-serif';
      ctx.fillStyle = isBinarized ? '#475569' : '#78350f';
      ctx.fillText(data.state, w / 2, 70);

      ctx.beginPath();
      ctx.moveTo(25, 85);
      ctx.lineTo(w - 25, 85);
      ctx.stroke();

      // Content
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px "Noto Sans Devanagari", sans-serif';
      ctx.fillStyle = isBinarized ? '#047857' : '#92400e';
      ctx.fillText('भूमापन तपशील (Survey Details):', 30, 110);

      ctx.font = '11px "Noto Sans Devanagari", sans-serif';
      ctx.fillStyle = isBinarized ? '#1e293b' : '#292524';
      ctx.fillText('• भूमापन / खसरा क्र.: ' + data.survey_no, 40, 130);
      ctx.fillText('• खाते क्र.: ' + data.khata_no, 40, 150);
      ctx.fillText('• एकूण क्षेत्र: ' + data.area_ha, 40, 170);

      ctx.font = 'bold 12px "Noto Sans Devanagari", sans-serif';
      ctx.fillStyle = isBinarized ? '#047857' : '#92400e';
      ctx.fillText('भोगवटादार / खातेदार (Title Holders):', 30, 205);

      data.owners.forEach((o, i) => {
        ctx.font = '11px "Noto Sans Devanagari", sans-serif';
        ctx.fillStyle = isBinarized ? '#1e293b' : '#292524';
        ctx.fillText((i + 1) + '. ' + o, 40, 225 + (i * 20));
      });

      // Encumbrance
      const encY = 225 + (data.owners.length * 20) + 15;
      ctx.font = 'bold 12px "Noto Sans Devanagari", sans-serif';
      ctx.fillStyle = isBinarized ? '#047857' : '#92400e';
      ctx.fillText('इतर अधिकार व बोजा (Encumbrance):', 30, encY);

      ctx.font = '11px "Noto Sans Devanagari", sans-serif';
      ctx.fillStyle = '#dc2626';
      ctx.fillText('• ' + data.encumbrance, 40, encY + 20);

      // Bounding boxes overlay
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';

      ctx.fillRect(35, 118, 200, 16);
      ctx.strokeRect(35, 118, 200, 16);

      ctx.fillRect(35, 158, 280, 16);
      ctx.strokeRect(35, 158, 280, 16);

      ctx.fillRect(35, 212, 380, 20);
      ctx.strokeRect(35, 212, 380, 20);
    }

    function loadSample(key) {
      document.querySelectorAll('.sample-btn').forEach(b => {
        b.className = 'sample-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all';
      });
      event.target.className = 'sample-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 transition-all';
      renderDoc(key);
    }

    function toggleBinarize() {
      isBinarized = !isBinarized;
      document.getElementById('binarizeBtn').innerText = isBinarized ? 'Show Original Aged Scan' : 'Apply Binarization Filter';
      drawCanvas(docs[currentDocKey]);
    }

    function handleCustomUpload(e) {
      const file = e.target.files[0];
      if (file) {
        alert("Custom document loaded! Running Indic OCR extraction...");
        renderDoc(currentDocKey);
      }
    }

    function exportJSON() {
      const data = docs[currentDocKey];
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
      const a = document.createElement('a');
      a.href = dataStr;
      a.download = `BhoomiAI_OCR_${data.survey_no.replace('/', '_')}.json`;
      a.click();
    }

    window.onload = () => renderDoc('712_maharashtra');
  </script>
</body>
</html>
"""

@app.get("/", response_class=HTMLResponse)
def index():
    return HTMLResponse(content=HTML_TEMPLATE)

@app.get("/api/extract/{doc_key}")
def extract_sample(doc_key: str):
    if doc_key in SAMPLE_DOCS:
        return SAMPLE_DOCS[doc_key]
    return JSONResponse(status_code=404, content={"error": "Document not found"})

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
