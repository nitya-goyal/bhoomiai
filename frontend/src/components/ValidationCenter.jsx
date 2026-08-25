import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  FileSearch, 
  Layers, 
  Gavel, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { translations } from '../utils/translations';

export default function ValidationCenter({ 
  lang, 
  selectedRecord, 
  setCurrentTab 
}) {
  const t = translations[lang] || translations.en;
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL', 'CRITICAL', 'PASSED'

  const auditChecks = [
    {
      id: "VAL-AREA-001",
      severity: selectedRecord.id.includes('dispute') ? "CRITICAL" : "PASS",
      title: "Cross-Record Area Reconciliation (7/12 RoR vs Bhu-Naksha GIS)",
      category: "Spatial Geometry",
      score: selectedRecord.id.includes('dispute') ? "Discrepancy: +13.33%" : "Discrepancy: 0.14%",
      description: selectedRecord.id.includes('dispute')
        ? "Scanned 7/12 RoR specifies 2.10 Hectares, but vectorized Cadastral Map measures 2.38 Hectares (0.28 Ha excess)."
        : `Scanned RoR area (${selectedRecord.area_hectare} Ha) matches vectorized Cadastral Map polygon within statutory tolerance limit (<1%).`,
      remediation: selectedRecord.id.includes('dispute')
        ? "Action: Physical boundary re-survey ordered by Taluka Inspector of Land Records (TILR) via DGPS."
        : "Action: Automated reconciliation cleared for digital title registry.",
      timestamp: "Today, 09:15:00 IST"
    },
    {
      id: "VAL-TITLE-002",
      severity: selectedRecord.id.includes('dispute') ? "CRITICAL" : "PASS",
      title: "Double-Allocation & Conflicting Title Claim Detector",
      category: "Title Integrity",
      score: selectedRecord.id.includes('dispute') ? "Conflict Flagged" : "Single Title Verified",
      description: selectedRecord.id.includes('dispute')
        ? "Plot 84/3 is simultaneously claimed under private Khata 304 and Gram Panchayat Gaothan Public Utility registry."
        : `Unique Title allocation verified across District Master Land Register. No duplicate claimant found.`,
      remediation: selectedRecord.id.includes('dispute')
        ? "Action: SDO Revenue Court summons issued under Maharashtra Land Revenue Code (MLRC) Section 247."
        : "Action: Ready for instant mutation certificate issuance.",
      timestamp: "Today, 09:15:00 IST"
    },
    {
      id: "VAL-ENC-003",
      severity: selectedRecord.encumbrance.includes('Court') ? "WARNING" : (selectedRecord.encumbrance.includes('Bank') ? "INFO" : "PASS"),
      title: "Encumbrance & Financial Lien Audit",
      category: "Legal Liabilities",
      score: selectedRecord.encumbrance.includes('Court') ? "Stay Injunction Active" : "No Legal Stay",
      description: selectedRecord.encumbrance,
      remediation: selectedRecord.encumbrance.includes('Court')
        ? "Action: Mutation freeze active until Civil Court Case OS-2023-88 is formally disposed."
        : selectedRecord.encumbrance.includes('Bank')
        ? "Action: Bank NOC required prior to processing transfer/sale deed."
        : "Action: Unencumbered clear title.",
      timestamp: "Today, 09:15:00 IST"
    },
    {
      id: "VAL-LINEAGE-004",
      severity: "PASS",
      title: "Mutation Chain & Succession Lineage Audit",
      category: "Historical Chain of Title",
      score: "100% Chain Intact",
      description: "All historical mutation entries (Ferfar/Virasat) have verified digital signatures and corresponding revenue notices.",
      remediation: "Action: No orphaned or missing historical deeds detected.",
      timestamp: "Today, 09:15:00 IST"
    },
    {
      id: "VAL-FORENSIC-005",
      severity: "PASS",
      title: "Archival Revenue Stamp & Talathi Signature Forensic Check",
      category: "Document Authenticity",
      score: "Authentic Government Seal",
      description: "Digital watermark and Talathi revenue seal match historical settlement series. No image tampering artifacts detected.",
      remediation: "Action: Archival physical record certified genuine.",
      timestamp: "Today, 09:15:00 IST"
    }
  ];

  const filteredChecks = auditChecks.filter(c => {
    if (activeFilter === 'CRITICAL') return c.severity === 'CRITICAL' || c.severity === 'WARNING';
    if (activeFilter === 'PASSED') return c.severity === 'PASS';
    return true;
  });

  const isDisputed = selectedRecord.id.includes('dispute');
  const riskScore = isDisputed ? 88 : 12;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t.validation.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.validation.subtitle} • Survey Plot: <span className="text-emerald-400 font-mono font-bold">{selectedRecord.survey_no}</span>
          </p>
        </div>

        {/* Risk Badge */}
        <div className="flex items-center gap-3">
          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            isDisputed 
              ? 'bg-red-500/10 border-red-500/30 text-red-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider block text-slate-400">Risk Assessment</span>
              <span className="text-xl font-extrabold">{isDisputed ? 'HIGH RISK (88/100)' : 'LOW RISK (12/100)'}</span>
            </div>
            {isDisputed ? <AlertTriangle className="w-7 h-7 text-red-400" /> : <ShieldCheck className="w-7 h-7 text-emerald-400" />}
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Automated Rules Executed</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">5 Rules</p>
          <p className="text-xs text-emerald-400 mt-1">100% Comprehensive Coverage</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Rules Passed Cleanly</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-400">{isDisputed ? '3 / 5 Passed' : '5 / 5 Passed'}</p>
          <p className="text-xs text-slate-400 mt-1">No title defects detected</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Flagged Exceptions</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-red-400">{isDisputed ? '2 Anomalies' : '0 Anomalies'}</p>
          <p className="text-xs text-slate-400 mt-1">{isDisputed ? 'Requires Revenue Court Hearing' : 'Ready for Mutation'}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Filter Rules:</span>
        {['ALL', 'CRITICAL', 'PASSED'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === f
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {f === 'ALL' ? 'All Rules (5)' : f === 'CRITICAL' ? 'Flagged Anomalies' : 'Passed Checks'}
          </button>
        ))}
      </div>

      {/* Audit Checklist Items */}
      <div className="space-y-4">
        {filteredChecks.map((check) => {
          const isCrit = check.severity === 'CRITICAL';
          const isWarn = check.severity === 'WARNING';
          const isPass = check.severity === 'PASS';

          return (
            <div
              key={check.id}
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                isCrit
                  ? 'border-red-500/50 bg-red-950/10'
                  : isWarn
                  ? 'border-amber-500/50 bg-amber-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                    isCrit 
                      ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                      : isWarn
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}>
                    {isCrit ? <AlertTriangle className="w-5 h-5" /> : isWarn ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{check.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-semibold text-emerald-400">{check.category}</span>
                      <span className={`px-2 py-0.2 text-[10px] font-bold rounded-full border ${
                        isCrit
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : isWarn
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {check.score}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mt-1">
                      {check.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {check.description}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-slate-500 whitespace-nowrap self-start md:self-center">
                  {check.timestamp}
                </span>
              </div>

              {/* Remediation Box */}
              <div className={`mt-4 p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                isCrit
                  ? 'bg-red-950/40 border-red-500/30 text-red-200'
                  : isWarn
                  ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-center gap-2">
                  <Gavel className="w-4 h-4 flex-shrink-0 text-amber-400" />
                  <span>{check.remediation}</span>
                </div>

                {isCrit && (
                  <button
                    onClick={() => setCurrentTab('cadastral')}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs whitespace-nowrap shadow-sm"
                  >
                    View Overlap in GIS
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
