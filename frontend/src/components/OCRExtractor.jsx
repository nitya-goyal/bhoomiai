import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Edit3, 
  Save, 
  MapPin, 
  ShieldCheck, 
  Share2, 
  Layers, 
  Scale, 
  FileSpreadsheet,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { translations } from '../utils/translations';
import { drawRealisticDocumentToCanvas } from '../data/mockRecords';

export default function OCRExtractor({ 
  lang, 
  selectedRecord, 
  setSelectedRecord, 
  records, 
  setCurrentTab, 
  onOpenCertificate 
}) {
  const t = translations[lang] || translations.en;

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...selectedRecord });
  const [activeTabSub, setActiveTabSub] = useState('fields'); // 'fields', 'crops', 'mutations', 'json'
  const canvasRef = useRef(null);

  useEffect(() => {
    setEditedData({ ...selectedRecord });
    if (canvasRef.current && selectedRecord) {
      drawRealisticDocumentToCanvas(canvasRef.current, selectedRecord, true);
    }
  }, [selectedRecord]);

  const handleFieldChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editedData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `BhoomiAI_${editedData.survey_no.replace('/', '_')}_Record.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t.ocr.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.ocr.subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isEditing 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Save Officer Edits' : 'Manual Verification / Edit'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.ocr.exportJson}</span>
          </button>

          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-glow-emerald transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.ocr.exportPdf}</span>
          </button>
        </div>
      </div>

      {/* Record Switcher Ribbon */}
      <div className="glass-card p-3 rounded-xl border border-slate-800 flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-400">Template:</span>
          {records.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRecord(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedRecord.id === r.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {r.name.split(' (')[0]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Language Model:</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
            {selectedRecord.lang.toUpperCase()} Indic-LayoutLMv3
          </span>
        </div>
      </div>

      {/* Main Dual Pane: Left Document Canvas with Bounding Boxes, Right Key-Information Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Columns: Zoomable Document Canvas with Bounding Boxes */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Spatial Bounding Box Overlay</h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                Confidence: {selectedRecord.confidence.overall}%
              </span>
            </div>

            <div className="relative w-full h-[520px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center p-2">
              <canvas
                ref={canvasRef}
                width={750}
                height={500}
                className="w-full h-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Green bounding boxes indicate high-confidence OCR detections</span>
            </span>
            <button
              onClick={() => setCurrentTab('cadastral')}
              className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View Cadastral Polygon</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right 6 Columns: Structured Key-Information Details & Field Editor */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          
          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            {[
              { id: 'fields', label: 'Key Identifiers' },
              { id: 'owners', label: 'Land Owners' },
              { id: 'encumbrance', label: 'Encumbrance & Tax' },
              { id: 'mutations', label: 'Mutation Lineage' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabSub(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTabSub === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Key Identifiers */}
          {activeTabSub === 'fields' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] text-slate-400 font-medium">{t.ocr.surveyNo}</label>
                    <span className="text-[10px] text-emerald-400 font-bold">{selectedRecord.confidence.survey}%</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.survey_no}
                      onChange={(e) => handleFieldChange('survey_no', e.target.value)}
                      className="mt-1 w-full px-2 py-1 bg-slate-800 rounded text-sm text-white font-mono border border-slate-700"
                    />
                  ) : (
                    <p className="mt-1 text-base font-bold text-emerald-400 font-mono">{editedData.survey_no}</p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] text-slate-400 font-medium">{t.ocr.khataNo}</label>
                    <span className="text-[10px] text-emerald-400 font-bold">{selectedRecord.confidence.khata}%</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.khata_no}
                      onChange={(e) => handleFieldChange('khata_no', e.target.value)}
                      className="mt-1 w-full px-2 py-1 bg-slate-800 rounded text-sm text-white font-mono border border-slate-700"
                    />
                  ) : (
                    <p className="mt-1 text-base font-bold text-white font-mono">{editedData.khata_no}</p>
                  )}
                </div>
              </div>

              {/* Area Extents */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.ocr.totalArea} (Multi-Unit Converted)</span>
                  </label>
                  <span className="text-[10px] text-emerald-400 font-bold">{selectedRecord.confidence.area}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-lg bg-slate-800/80">
                    <span className="text-xs font-bold text-emerald-300 block">{editedData.area_hectare} Ha</span>
                    <span className="text-[10px] text-slate-400">Hectares</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80">
                    <span className="text-xs font-bold text-emerald-300 block">{editedData.area_acre} Acres</span>
                    <span className="text-[10px] text-slate-400">Acres</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80">
                    <span className="text-xs font-bold text-emerald-300 block">{(editedData.area_hectare * 10000).toLocaleString()} m²</span>
                    <span className="text-[10px] text-slate-400">Sq. Meters</span>
                  </div>
                </div>
              </div>

              {/* Regional Metadata */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Location Jurisdiction:</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">{editedData.region}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">{t.ocr.classification}:</span>
                  <span className="font-semibold text-emerald-400 mt-0.5 block">{editedData.land_type}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Land Owners */}
          {activeTabSub === 'owners' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Verified Land Title Holders (खातेदार / भोगवटादार):</span>
              {editedData.owners.map((owner, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{idx + 1}. {owner.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      Share: {owner.share}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Relation / Parentage: {owner.relation}</span>
                    <span className="font-mono text-slate-500">Aadhaar: {owner.aadhaar}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Encumbrance & Tax */}
          {activeTabSub === 'encumbrance' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">{t.ocr.encumbrance}</span>
                <p className={`text-xs p-2.5 rounded-lg border ${
                  editedData.encumbrance.includes('Court')
                    ? 'bg-red-500/10 border-red-500/30 text-red-300 font-semibold'
                    : editedData.encumbrance.includes('Bank')
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}>
                  {editedData.encumbrance}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">{t.ocr.lagan}</span>
                  <span className="text-[11px] text-slate-400">Annual Government Land Revenue</span>
                </div>
                <span className="text-base font-bold text-emerald-400 font-mono">{editedData.tax_lagan}</span>
              </div>
            </div>
          )}

          {/* Tab 4: Mutations */}
          {activeTabSub === 'mutations' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 block">{t.ocr.mutations}</span>
              <div className="space-y-2">
                {editedData.mutation_history.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-400 font-mono">Ferfar #{m.no}</span>
                        <span className="text-slate-300">{m.type}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">Date: {m.date} | Officer: {m.officer}</span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Strip */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentTab('validation')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Run Automated Anomaly Audit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('blockchain')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View on Blockchain Ledger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
