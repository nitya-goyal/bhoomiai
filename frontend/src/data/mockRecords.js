export const SAMPLE_RECORDS = [
  {
    id: "doc_712_maharashtra",
    name: "Maharashtra 7/12 Extract (सातबारा उतारा)",
    state: "Maharashtra",
    region: "Pune - Haveli - Wagholi",
    lang: "mr",
    type: "Record of Rights (7/12)",
    survey_no: "84/2A",
    khata_no: "142",
    doc_id: "MH-PUN-HAV-2024-8842",
    year: "2024-2025",
    owners: [
      { name: "रामचंद्र शंकरराव पाटील (Ramchandra S. Patil)", relation: "पुत्र", share: "1/2 (50%)", aadhaar: "XXXX-XXXX-4812" },
      { name: "सुरेश रामचंद्र पाटील (Suresh R. Patil)", relation: "पुत्र", share: "1/2 (50%)", aadhaar: "XXXX-XXXX-9120" }
    ],
    area_hectare: 1.45,
    area_acre: 3.58,
    area_guntha: 58.0,
    land_type: "जिरायत (Jirayat / Rainfed)",
    tax_lagan: "₹ 18.50",
    encumbrance: "Bank of Maharashtra KCC Loan ₹ 3,50,000 (Ferfar #4120)",
    crops: "खरीप सोयाबीन (1.00 Ha), रब्बी हरभरा (0.45 Ha)",
    mutation_history: [
      { no: "3890", date: "12-05-2018", type: "वारस नोंद (Succession)", officer: "Talathi Wagholi", status: "Approved" },
      { no: "4120", date: "14-03-2022", type: "बोजा नोंद (Bank Loan)", officer: "Bank of Maharashtra", status: "Approved" }
    ],
    confidence: {
      survey: 99.2,
      khata: 98.7,
      owner: 97.4,
      area: 99.5,
      overall: 98.6
    },
    canvas_theme: "aged_yellow"
  },
  {
    id: "doc_khasra_up",
    name: "UP Khasra-Khatauni (खसरा व खतौनी)",
    state: "Uttar Pradesh",
    region: "Varanasi - Pindra - Rampur",
    lang: "hi",
    type: "Khasra Khatauni (Form 45)",
    survey_no: "312/1",
    khata_no: "00218",
    doc_id: "UP-VAR-PIN-2024-5102",
    year: "1431-1436 फसली (2024)",
    owners: [
      { name: "महेश प्रताप सिंह (Mahesh Pratap Singh)", relation: "सुत: सूर्यदेव सिंह", share: "1/1 (Full)", aadhaar: "XXXX-XXXX-6531" }
    ],
    area_hectare: 0.892,
    area_acre: 2.204,
    area_bigha: 3.52,
    land_type: "दोफसली सिंचित (Two-Crop Irrigated)",
    tax_lagan: "₹ 24.00",
    encumbrance: "भारमुक्त (Clear Title / Nil)",
    crops: "खरीफ धान (0.892 Ha), रबी गेहूं (0.892 Ha)",
    mutation_history: [
      { no: "K-2021-99", date: "18-09-2021", type: "वरासत (Succession)", officer: "Revenue Inspector Pindra", status: "Approved" }
    ],
    confidence: {
      survey: 98.9,
      khata: 99.4,
      owner: 98.1,
      area: 99.1,
      overall: 98.8
    },
    canvas_theme: "aged_sepia"
  },
  {
    id: "doc_patta_tn",
    name: "Tamil Nadu Patta / Chitta (பட்டா / சிட்டா)",
    state: "Tamil Nadu",
    region: "Kanchipuram - Sriperumbudur - Nemili",
    lang: "ta",
    type: "Patta Passbook",
    survey_no: "204/3B",
    khata_no: "782",
    doc_id: "TN-KAN-SRI-2024-1904",
    year: "1433 பசலி (2024)",
    owners: [
      { name: "மு. செந்தில் குமார் (M. Senthil Kumar)", relation: "த/பெ முருகேசன்", share: "1/1 (Full)", aadhaar: "XXXX-XXXX-3341" }
    ],
    area_hectare: 0.405,
    area_acre: 1.00,
    area_cents: 100.0,
    land_type: "நஞ்சை நிலம் (Wetland Irrigated)",
    tax_lagan: "₹ 12.00",
    encumbrance: "வில்லங்கம் இல்லை (Nil Encumbrance)",
    crops: "சம்பா நெல் (Paddy 0.405 Ha)",
    mutation_history: [
      { no: "TR-2023-441", date: "10-11-2023", type: "கிரயப் பத்திரம் (Sale Transfer)", officer: "Zonal Deputy Tahsildar", status: "Approved" }
    ],
    confidence: {
      survey: 99.0,
      khata: 98.4,
      owner: 97.8,
      area: 99.2,
      overall: 98.5
    },
    canvas_theme: "aged_greenish"
  },
  {
    id: "doc_dispute_sample",
    name: "Disputed Land Parcel #84/3 (सीमा विवादित भूखंड)",
    state: "Maharashtra",
    region: "Pune - Haveli - Wagholi",
    lang: "mr",
    type: "Disputed 7/12 Extract",
    survey_no: "84/3",
    khata_no: "304",
    doc_id: "MH-PUN-HAV-DISPUTE-843",
    year: "2024",
    owners: [
      { name: "कैलास विठ्ठल जगताप (Kailash V. Jagtap)", relation: "पुत्र", share: "Contested", aadhaar: "XXXX-XXXX-1129" }
    ],
    area_hectare: 2.10,
    area_acre: 5.18,
    land_type: "अकृषिक / व्यावसायिक (Commercial)",
    tax_lagan: "₹ 120.00",
    encumbrance: "दिवाणी न्यायालय मनाई हुकूम क्र. OS-2023-88 (Court Injunction Stay)",
    crops: "Nil (Encroachment on Gaothan Road)",
    mutation_history: [
      { no: "DISP-2023", date: "04-08-2023", type: "तकरार अर्ज (Dispute Flagged)", officer: "Sub-Divisional Officer (SDO)", status: "Pending Hearing" }
    ],
    confidence: {
      survey: 97.1,
      khata: 96.2,
      owner: 94.8,
      area: 88.5,
      overall: 92.4
    },
    canvas_theme: "aged_red_stain"
  }
];

// Canvas procedural renderer for realistic aged revenue records
export function drawRealisticDocumentToCanvas(canvas, record, isRestored = false, filters = {}) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Background Paper
  if (isRestored) {
    // Ultra crisp white digital archival paper
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Clean subtle grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
  } else {
    // Aged, yellowed, vintage paper with gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (record.canvas_theme === 'aged_yellow') {
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.5, '#fde047');
      grad.addColorStop(1, '#eab308');
    } else if (record.canvas_theme === 'aged_sepia') {
      grad.addColorStop(0, '#fed7aa');
      grad.addColorStop(0.5, '#fdba74');
      grad.addColorStop(1, '#fb923c');
    } else {
      grad.addColorStop(0, '#fef3c7');
      grad.addColorStop(1, '#fde68a');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Aging noise & stains
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2.5;
      ctx.fillStyle = `rgba(120, 53, 15, ${Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Watermark stains & coffee ring simulation
    ctx.fillStyle = 'rgba(180, 83, 9, 0.07)';
    ctx.beginPath();
    ctx.arc(width * 0.75, height * 0.65, 85, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Document Border
  ctx.strokeStyle = isRestored ? '#0f172a' : '#78350f';
  ctx.lineWidth = isRestored ? 2 : 2.5;
  ctx.strokeRect(20, 20, width - 40, height - 40);
  ctx.strokeRect(25, 25, width - 50, height - 50);

  // Government Emblem & Header
  ctx.textAlign = 'center';
  ctx.fillStyle = isRestored ? '#0f172a' : '#451a03';
  ctx.font = 'bold 20px "Noto Sans Devanagari", sans-serif';
  ctx.fillText(record.name, width / 2, 65);

  ctx.font = '13px "Inter", sans-serif';
  ctx.fillStyle = isRestored ? '#475569' : '#78350f';
  ctx.fillText(`Official Land Revenue Record | State: ${record.state} | Year: ${record.year}`, width / 2, 90);
  ctx.fillText(`Document Unique ID: ${record.doc_id}`, width / 2, 110);

  // Header separator
  ctx.beginPath();
  ctx.moveTo(35, 125);
  ctx.lineTo(width - 35, 125);
  ctx.stroke();

  // Draw Table Columns
  const startY = 145;
  const col1 = 40;
  const col2 = width * 0.52;

  ctx.textAlign = 'left';
  ctx.font = 'bold 14px "Noto Sans Devanagari", sans-serif';
  ctx.fillStyle = isRestored ? '#047857' : '#92400e';
  ctx.fillText('१. गाव व भूमापन तपशील (Village & Survey Details):', col1, startY);

  ctx.font = '13px "Noto Sans Devanagari", sans-serif';
  ctx.fillStyle = isRestored ? '#1e293b' : '#292524';
  ctx.fillText(`• गाव (Village): ${record.region.split(' - ')[2]}`, col1 + 10, startY + 28);
  ctx.fillText(`• तालुका / परगना (Tehsil): ${record.region.split(' - ')[1]}`, col1 + 10, startY + 50);
  ctx.fillText(`• भूमापन / खसरा क्र. (Survey No): ${record.survey_no}`, col1 + 10, startY + 72);
  ctx.fillText(`• खाते क्र. (Khata No): ${record.khata_no}`, col1 + 10, startY + 94);

  ctx.font = 'bold 14px "Noto Sans Devanagari", sans-serif';
  ctx.fillStyle = isRestored ? '#047857' : '#92400e';
  ctx.fillText('२. क्षेत्रफळ व आकारणी (Land Extent & Tax):', col2, startY);

  ctx.font = '13px "Noto Sans Devanagari", sans-serif';
  ctx.fillStyle = isRestored ? '#1e293b' : '#292524';
  ctx.fillText(`• एकूण क्षेत्र: ${record.area_hectare} Hectare (${record.area_acre} Acres)`, col2 + 10, startY + 28);
  ctx.fillText(`• जमिनीचे स्वरूप: ${record.land_type}`, col2 + 10, startY + 50);
  ctx.fillText(`• आकारणी / लगान: ${record.tax_lagan}`, col2 + 10, startY + 72);
  ctx.fillText(`• पिके: ${record.crops}`, col2 + 10, startY + 94);

  // Divider
  ctx.beginPath();
  ctx.moveTo(35, startY + 115);
  ctx.lineTo(width - 35, startY + 115);
  ctx.stroke();

  // Land Owners Table Section
  const ownerY = startY + 140;
  ctx.font = 'bold 14px "Noto Sans Devanagari", sans-serif';
  ctx.fillStyle = isRestored ? '#047857' : '#92400e';
  ctx.fillText('३. भोगवटादार / खातेदाराचे नाव (Land Title Holders & Share Ratio):', col1, ownerY);

  record.owners.forEach((o, idx) => {
    ctx.font = '13px "Noto Sans Devanagari", sans-serif';
    ctx.fillStyle = isRestored ? '#0f172a' : '#1c1917';
    ctx.fillText(`${idx + 1}. ${o.name} | हिस्सा: ${o.share} | आधार: ${o.aadhaar}`, col1 + 10, ownerY + 28 + (idx * 24));
  });

  // Encumbrance Section
  const encY = ownerY + 80;
  ctx.font = 'bold 14px "Noto Sans Devanagari", sans-serif';
  ctx.fillStyle = record.encumbrance.includes('Court') ? '#dc2626' : (isRestored ? '#047857' : '#92400e');
  ctx.fillText('४. इतर अधिकार व बोजा (Encumbrance / Court Orders):', col1, encY);

  ctx.font = '13px "Noto Sans Devanagari", sans-serif';
  ctx.fillStyle = record.encumbrance.includes('Court') ? '#991b1b' : (isRestored ? '#334155' : '#451a03');
  ctx.fillText(`• ${record.encumbrance}`, col1 + 10, encY + 26);

  // Revenue Seal Stamp simulation
  ctx.save();
  ctx.translate(width - 130, height - 120);
  ctx.rotate(-0.15);
  ctx.strokeStyle = isRestored ? '#2563eb' : '#1e3a8a';
  ctx.fillStyle = isRestored ? 'rgba(37, 99, 235, 0.1)' : 'rgba(30, 58, 138, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'bold 9px "Inter", sans-serif';
  ctx.fillStyle = isRestored ? '#1d4ed8' : '#1e3a8a';
  ctx.fillText('TALATHI / REVENUE', 0, -18);
  ctx.fillText('GOVT. OF INDIA', 0, -3);
  ctx.fillText('DIGITIZED SEAL', 0, 12);
  ctx.fillText('2026-08-25', 0, 26);
  ctx.restore();

  // Bounding box overlay in Restored / OCR view
  if (isRestored) {
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';

    // Highlight Survey Box
    ctx.fillRect(col1 + 5, startY + 58, 220, 20);
    ctx.strokeRect(col1 + 5, startY + 58, 220, 20);

    // Highlight Area Box
    ctx.fillRect(col2 + 5, startY + 14, 280, 20);
    ctx.strokeRect(col2 + 5, startY + 14, 280, 20);

    // Highlight Owners Box
    ctx.fillRect(col1 + 5, ownerY + 14, 450, 24);
    ctx.strokeRect(col1 + 5, ownerY + 14, 450, 24);
  }
}
