import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  Layers, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Scissors, 
  Download, 
  Eye, 
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { translations } from '../utils/translations';
import { CADASTRAL_VILLAGE_DATA } from '../data/cadastralGeoJson';

export default function CadastralGIS({ 
  lang, 
  setCurrentTab, 
  onSelectRecord, 
  records 
}) {
  const t = translations[lang] || translations.en;
  const [selectedParcel, setSelectedParcel] = useState(CADASTRAL_VILLAGE_DATA.parcels[0]);
  const [activeLayer, setActiveLayer] = useState('cadastral'); // 'cadastral', 'satellite', 'disputes'
  const [searchQuery, setSearchQuery] = useState('');
  const [splitMode, setSplitMode] = useState(false);
  const [splitRatio, setSplitRatio] = useState(50); // 50-50 split

  const filteredParcels = CADASTRAL_VILLAGE_DATA.parcels.filter(p => 
    p.survey_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportGeoJSON = () => {
    const geoData = {
      type: "FeatureCollection",
      features: CADASTRAL_VILLAGE_DATA.parcels.map(p => ({
        type: "Feature",
        id: p.id,
        properties: {
          survey_no: p.survey_no,
          khata_no: p.khata_no,
          owner: p.owner,
          area_ha: p.doc_area_ha,
          status: p.status
        },
        geometry: {
          type: "Polygon",
          coordinates: [p.coordinates.map(c => [c[1], c[0]])]
        }
      }))
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Wagholi_Village_Cadastral_BhuNaksha.geojson`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Studio Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapIcon className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t.gis.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.gis.subtitle} • Village: <span className="text-emerald-400 font-semibold">{CADASTRAL_VILLAGE_DATA.name}</span>
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSplitMode(!splitMode)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              splitMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>{splitMode ? 'Close Split Tool' : t.gis.splitMergeTool}</span>
          </button>

          <button
            onClick={handleExportGeoJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export GeoJSON</span>
          </button>
        </div>
      </div>

      {/* Map Layer Toolbar & Plot Search */}
      <div className="glass-card p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Layer Toggles */}
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Layers:</span>
          
          <button
            onClick={() => setActiveLayer('cadastral')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeLayer === 'cadastral'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.gis.cadastralLayer}
          </button>

          <button
            onClick={() => setActiveLayer('satellite')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeLayer === 'satellite'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.gis.satelliteLayer}
          </button>

          <button
            onClick={() => setActiveLayer('disputes')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeLayer === 'disputes'
                ? 'bg-red-500 text-white font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t.gis.disputeLayer} (1 Flagged)
          </button>
        </div>

        {/* Search Plot Bar */}
        <div className="relative flex items-center min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder={t.gis.searchParcel}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Main Grid: Interactive Vectorized Map on Left, Plot Attribute Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Columns: Simulated High-Resolution Cadastral Vector Map */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="relative w-full h-[520px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
            
            {/* Background Texture based on Active Layer */}
            {activeLayer === 'satellite' ? (
              <div 
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{
                  backgroundImage: "radial-gradient(circle at 50% 50%, #1e293b 10%, #090d16 90%)"
                }}
              >
                {/* Satellite grid overlay simulation */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
            )}

            {/* Simulated Vector Cadastral Polygons SVG */}
            <svg 
              viewBox="0 0 800 500" 
              className="w-full h-full p-6 select-none"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Road / Gaothan Boundary buffer */}
              <path 
                d="M 50,220 Q 380,240 750,210" 
                fill="none" 
                stroke="#64748b" 
                strokeWidth="14" 
                strokeDasharray="4,4" 
                opacity="0.4" 
              />
              <text x="350" y="248" fill="#94a3b8" fontSize="10" fontWeight="bold">VILLAGE ROAD / GAOTHAN BUFFER (12M)</text>

              {/* Plot 1: 84/2A (Green / Clear) */}
              <polygon
                points="120,80 320,95 310,215 110,200"
                fill={selectedParcel.id === 'PARCEL-84-2A' ? '#10b981' : '#059669'}
                fillOpacity={selectedParcel.id === 'PARCEL-84-2A' ? '0.65' : (activeLayer === 'disputes' ? '0.2' : '0.45')}
                stroke={selectedParcel.id === 'PARCEL-84-2A' ? '#34d399' : '#10b981'}
                strokeWidth={selectedParcel.id === 'PARCEL-84-2A' ? '3.5' : '2'}
                className="cursor-pointer transition-all hover:fill-emerald-400 hover:fill-opacity-60"
                onClick={() => setSelectedParcel(CADASTRAL_VILLAGE_DATA.parcels[0])}
              />
              <text x="180" y="150" fill="#ffffff" fontSize="13" fontWeight="bold" pointerEvents="none">
                Plot 84/2A
              </text>
              <text x="185" y="168" fill="#a7f3d0" fontSize="10" pointerEvents="none">
                1.45 Ha
              </text>

              {/* Plot 2: 84/2B (Green / Clear) */}
              <polygon
                points="320,95 520,110 510,230 310,215"
                fill={selectedParcel.id === 'PARCEL-84-2B' ? '#10b981' : '#059669'}
                fillOpacity={selectedParcel.id === 'PARCEL-84-2B' ? '0.65' : (activeLayer === 'disputes' ? '0.2' : '0.45')}
                stroke={selectedParcel.id === 'PARCEL-84-2B' ? '#34d399' : '#10b981'}
                strokeWidth={selectedParcel.id === 'PARCEL-84-2B' ? '3.5' : '2'}
                className="cursor-pointer transition-all hover:fill-emerald-400 hover:fill-opacity-60"
                onClick={() => setSelectedParcel(CADASTRAL_VILLAGE_DATA.parcels[1])}
              />
              <text x="385" y="165" fill="#ffffff" fontSize="13" fontWeight="bold" pointerEvents="none">
                Plot 84/2B
              </text>
              <text x="390" y="183" fill="#a7f3d0" fontSize="10" pointerEvents="none">
                1.20 Ha
              </text>

              {/* Plot 3: 84/3 (RED / Dispute & Encroachment into Road) */}
              <polygon
                points="110,200 310,215 300,380 90,360"
                fill={activeLayer === 'disputes' || selectedParcel.id === 'PARCEL-84-3' ? '#ef4444' : '#dc2626'}
                fillOpacity={activeLayer === 'disputes' ? '0.75' : '0.55'}
                stroke="#f87171"
                strokeWidth={selectedParcel.id === 'PARCEL-84-3' ? '4' : '2.5'}
                strokeDasharray="6,3"
                className="cursor-pointer transition-all hover:fill-red-500 hover:fill-opacity-80"
                onClick={() => setSelectedParcel(CADASTRAL_VILLAGE_DATA.parcels[2])}
              />
              <text x="160" y="290" fill="#ffffff" fontSize="13" fontWeight="bold" pointerEvents="none">
                Plot 84/3 ⚠️
              </text>
              <text x="145" y="308" fill="#fca5a5" fontSize="10" fontWeight="bold" pointerEvents="none">
                DISPUTE (2.10 Ha)
              </text>

              {/* Plot 4: 84/4 Govt Protected Land (Blue) */}
              <polygon
                points="520,110 740,125 730,350 510,230"
                fill={selectedParcel.id === 'PARCEL-84-4' ? '#3b82f6' : '#2563eb'}
                fillOpacity="0.45"
                stroke="#60a5fa"
                strokeWidth={selectedParcel.id === 'PARCEL-84-4' ? '3.5' : '2'}
                className="cursor-pointer transition-all hover:fill-blue-400 hover:fill-opacity-60"
                onClick={() => setSelectedParcel(CADASTRAL_VILLAGE_DATA.parcels[3])}
              />
              <text x="580" y="220" fill="#ffffff" fontSize="13" fontWeight="bold" pointerEvents="none">
                84/4 (Govt Forest)
              </text>
              <text x="610" y="238" fill="#bfdbfe" fontSize="10" pointerEvents="none">
                4.50 Ha
              </text>

              {/* Plot 5: 85/1 Pending Mutation (Amber) */}
              <polygon
                points="310,215 510,230 500,390 300,380"
                fill={selectedParcel.id === 'PARCEL-85-1' ? '#f59e0b' : '#d97706'}
                fillOpacity="0.5"
                stroke="#fbbf24"
                strokeWidth={selectedParcel.id === 'PARCEL-85-1' ? '3.5' : '2'}
                className="cursor-pointer transition-all hover:fill-amber-400 hover:fill-opacity-70"
                onClick={() => setSelectedParcel(CADASTRAL_VILLAGE_DATA.parcels[4])}
              />
              <text x="370" y="305" fill="#ffffff" fontSize="13" fontWeight="bold" pointerEvents="none">
                Plot 85/1 ⏳
              </text>
              <text x="375" y="323" fill="#fde68a" fontSize="10" pointerEvents="none">
                0.85 Ha
              </text>
            </svg>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1.5 backdrop-blur-md">
              <span className="font-bold text-slate-300 block mb-1">Cadastral Color Classification:</span>
              <div className="flex items-center gap-2 text-emerald-300">
                <span className="w-3 h-3 rounded bg-emerald-500"></span>
                <span>{t.gis.verified} (Plots 84/2A, 84/2B)</span>
              </div>
              <div className="flex items-center gap-2 text-red-300">
                <span className="w-3 h-3 rounded bg-red-500"></span>
                <span>{t.gis.disputed} (Plot 84/3)</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <span className="w-3 h-3 rounded bg-blue-500"></span>
                <span>{t.gis.govtLand} (Plot 84/4)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span className="w-3 h-3 rounded bg-amber-500"></span>
                <span>{t.gis.pending} (Plot 85/1)</span>
              </div>
            </div>

            {/* Compass Rose */}
            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 flex flex-col items-center justify-center text-[10px] font-bold text-slate-300">
              <span className="text-red-400 text-[9px]">▲</span>
              <span>N</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Click any parcel polygon above to view its live RoR ownership card</span>
            <span className="font-mono text-emerald-400">Center: 18.5793° N, 73.9825° E</span>
          </div>
        </div>

        {/* Right 4 Columns: Plot Attribute Inspection & Split/Merge Tool */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>{t.gis.plotDetails}</span>
              </h3>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                selectedParcel.dispute 
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                {selectedParcel.status}
              </span>
            </div>

            {/* Selected Parcel Card */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Survey / Khasra Plot:</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{selectedParcel.survey_no}</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Khata Register No:</span>
                  <span className="font-mono text-white">{selectedParcel.khata_no}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-slate-400 block font-medium">Registered Title Holder:</span>
                <p className="font-bold text-white text-sm">{selectedParcel.owner}</p>
                <p className="text-[11px] text-emerald-400 font-semibold">Share Ratio: {selectedParcel.share}</p>
              </div>

              {/* Area Comparison: RoR Document vs GIS Calculated */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-slate-300 font-semibold block">Area Reconciliation Audit</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-800/80">
                    <span className="text-slate-400 block">7/12 RoR Area:</span>
                    <span className="font-bold text-white">{selectedParcel.doc_area_ha} Ha</span>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80">
                    <span className="text-slate-400 block">Cadastral GIS:</span>
                    <span className="font-bold text-emerald-400">{selectedParcel.computed_area_ha} Ha</span>
                  </div>
                </div>
                <div className="text-[11px] flex items-center justify-between text-slate-400 pt-1">
                  <span>Variance:</span>
                  <span className={selectedParcel.dispute ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {selectedParcel.area_discrepancy}
                  </span>
                </div>
              </div>

              {/* Encumbrance */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block font-medium">Remarks / Encumbrance:</span>
                <p className={`text-[11px] mt-1 font-medium ${selectedParcel.dispute ? 'text-red-300' : 'text-slate-300'}`}>
                  {selectedParcel.encumbrance}
                </p>
              </div>
            </div>

            {/* Split Simulation Tool UI */}
            {splitMode && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Hissa Sub-Division Simulator</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Plot {selectedParcel.survey_no}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>Hissa 1: {((selectedParcel.doc_area_ha * splitRatio) / 100).toFixed(3)} Ha ({splitRatio}%)</span>
                    <span>Hissa 2: {((selectedParcel.doc_area_ha * (100 - splitRatio)) / 100).toFixed(3)} Ha ({100 - splitRatio}%)</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
                <button
                  onClick={() => alert(`Simulated partition created: Plot ${selectedParcel.survey_no}/1 (${((selectedParcel.doc_area_ha * splitRatio) / 100).toFixed(3)} Ha) and Plot ${selectedParcel.survey_no}/2 (${((selectedParcel.doc_area_ha * (100 - splitRatio)) / 100).toFixed(3)} Ha). Ready for Tehsildar Mutation approval.`)}
                  className="w-full py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition-all"
                >
                  Generate Sub-Division Mutational Draft
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentTab('validation')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              Check Dispute Details →
            </button>
            <button
              onClick={() => setCurrentTab('ocr')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              View Digitized 7/12 →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
