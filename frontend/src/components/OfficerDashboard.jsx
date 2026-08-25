import React from 'react';
import { 
  FileCheck2, 
  Sparkles, 
  AlertTriangle, 
  Database, 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  FileSpreadsheet,
  Layers,
  ChevronRight
} from 'lucide-react';
import { translations } from '../utils/translations';

export default function OfficerDashboard({ 
  lang, 
  setCurrentTab, 
  onSelectRecord, 
  records, 
  onOpenCertificate 
}) {
  const t = translations[lang] || translations.en;

  const kpis = [
    {
      title: t.stats.digitizedRecords,
      value: "148,920",
      subtext: "+1,240 digitized today",
      icon: FileCheck2,
      color: "emerald",
      trend: "+14.2%"
    },
    {
      title: t.stats.ocrAccuracy,
      value: "98.84%",
      subtext: "Indic Devanagari & Tamil Models",
      icon: Sparkles,
      color: "blue",
      trend: "+2.1%"
    },
    {
      title: t.stats.flaggedDisputes,
      value: "24 Active",
      subtext: "Spatial & Double-allocation flags",
      icon: AlertTriangle,
      color: "red",
      trend: "Requires Hearing"
    },
    {
      title: t.stats.blockchainHeight,
      value: "4,812 Blocks",
      subtext: "100% Merkle Chain Verified",
      icon: Database,
      color: "amber",
      trend: "Zero Tampering"
    }
  ];

  const recentVillages = [
    { name: "Wagholi (वाघोली)", tehsil: "Haveli", district: "Pune", totalPlots: 1240, digitized: 1228, progress: 99.0, status: "Ready" },
    { name: "Rampur (रामपुर)", tehsil: "Pindra", district: "Varanasi", totalPlots: 850, digitized: 830, progress: 97.6, status: "Ready" },
    { name: "Nemili (நெமிலி)", tehsil: "Sriperumbudur", district: "Kanchipuram", totalPlots: 620, digitized: 612, progress: 98.7, status: "Ready" },
    { name: "Sanand (સાણંદ)", tehsil: "Sanand", district: "Ahmedabad", totalPlots: 1100, digitized: 1045, progress: 95.0, status: "In Progress" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner with National Flag Accent */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital India Land Record Modernization Programme (DILRMP)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Intelligent Land Record Digitization & Multi-Tier Validation System
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            AI-driven pipeline converting degraded historical land revenue registers (7/12, Khasra, Khatauni, Jamabandi, Pattas) into tamper-proof, georeferenced, and blockchain-verified digital Records of Rights.
          </p>

          {/* Quick Action CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentTab('restoration')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-glow-emerald transition-all"
            >
              <span>Digitize & Restore Document</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('cadastral')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all"
            >
              <span>Explore Cadastral GIS Map</span>
            </button>
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-sm font-semibold border border-amber-500/30 transition-all"
            >
              <span>Download Verified e-RoR</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const colorClasses = {
            emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            red: "text-red-400 bg-red-500/10 border-red-500/20",
            amber: "text-amber-400 bg-amber-500/10 border-amber-500/20"
          }[kpi.color];

          return (
            <div key={index} className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{kpi.title}</span>
                <div className={`p-2 rounded-lg border ${colorClasses}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">{kpi.value}</span>
                <span className="text-xs font-medium text-emerald-400">{kpi.trend}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{kpi.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column Section: Sample Records & Village Digitization Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Pre-loaded Indic Records Quick Access */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span>Digitized Revenue Records Repository</span>
              </h2>
              <p className="text-xs text-slate-400">Click any document to inspect OCR bounding boxes and extracted metadata</p>
            </div>
            <button
              onClick={() => setCurrentTab('ocr')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View OCR Studio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {records.map((rec) => (
              <div
                key={rec.id}
                onClick={() => {
                  onSelectRecord(rec);
                  setCurrentTab('ocr');
                }}
                className="glass-card p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold text-sm border border-slate-700 group-hover:border-emerald-500">
                    {rec.lang.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {rec.name}
                      </h4>
                      {rec.id.includes('dispute') ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          Disputed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Verified Title
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      📍 {rec.region} | Survey: <span className="text-emerald-400 font-mono">{rec.survey_no}</span> | Khata: <span className="font-mono text-slate-300">{rec.khata_no}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      👤 {rec.owners[0]?.name} • Extent: {rec.area_hectare} Ha ({rec.area_acre} Acres)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">{rec.confidence.overall}%</span>
                    <span className="text-[10px] text-slate-400 block">OCR Score</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-400 flex items-center gap-1">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Village Digitization Status Tracker */}
        <div className="glass-panel p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Village Cadastre Status</span>
              </h2>
              <span className="text-xs text-slate-400">DILRMP Series</span>
            </div>

            <div className="space-y-4">
              {recentVillages.map((v, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white">{v.name}</span>
                      <span className="text-slate-400 text-[11px]"> ({v.district}, {v.tehsil})</span>
                    </div>
                    <span className="font-bold text-emerald-400">{v.progress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${v.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{v.digitized} / {v.totalPlots} Parcels Vectorized</span>
                    <span className={v.status === 'Ready' ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                      ● {v.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">AI Integrity Guard Active</p>
                <p className="text-slate-400 text-[11px]">Continuous SHA-256 block ledger synchronization enabled.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
