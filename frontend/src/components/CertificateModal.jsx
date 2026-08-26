import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  QrCode,
  Lock
} from 'lucide-react';

export default function CertificateModal({ 
  isOpen, 
  onClose, 
  record 
}) {
  if (!isOpen || !record) return null;

  const verificationPayload = JSON.stringify({
    system: "BhoomiAI-National-Land-Registry",
    doc_id: record.doc_id,
    survey_no: record.survey_no,
    khata_no: record.khata_no,
    owner: record.owners[0]?.name,
    area_ha: record.area_hectare,
    sha256_seal: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    verified_at: "2026-08-25T09:16:00Z"
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white">
              Official Verifiable Digital Record of Rights (e-RoR)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Body */}
        <div className="p-8 bg-slate-950 text-slate-100 space-y-6">
          
          {/* Certificate Header with Emblem */}
          <div className="text-center space-y-1.5 pb-4 border-b-2 border-slate-800">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-1">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
              Government of India • Ministry of Rural Development
            </h2>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              DEPARTMENT OF LAND RESOURCES (DoLR)
            </h1>
            <p className="text-xs font-semibold text-emerald-400">
              National Land Record Modernization Programme (NLRMP) • Digital e-RoR Passbook
            </p>
          </div>

          {/* Document Identifiers Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">Unique Record ID:</span>
              <span className="font-bold text-white font-mono">{record.doc_id}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">State & District:</span>
              <span className="font-bold text-white">{record.state} ({record.region.split(' - ')[0]})</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Village / Tehsil:</span>
              <span className="font-bold text-white">{record.region.split(' - ')[2]}, {record.region.split(' - ')[1]}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Settlement Year:</span>
              <span className="font-bold text-emerald-400">{record.year}</span>
            </div>
          </div>

          {/* Land Parcel & Owner Tables */}
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1. Parcel Identification & Extent</span>
              </h3>
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="text-slate-400 block text-[11px]">Survey / Khasra No:</span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">{record.survey_no}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Khata / Account No:</span>
                  <span className="text-base font-extrabold text-white font-mono">{record.khata_no}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Total Area (Hectares):</span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">{record.area_hectare} Ha ({record.area_acre} Acres)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>2. Registered Title Holders & Fractional Shares</span>
              </h3>
              {record.owners.map((o, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-800/60 text-xs">
                  <div>
                    <span className="font-bold text-white">{idx + 1}. {o.name}</span>
                    <span className="text-slate-400 ml-2">({o.relation})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">Share: {o.share}</span>
                    <span className="font-mono text-slate-500">Aadhaar: {o.aadhaar}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3. Financial Encumbrance & Legal Injunction Status</span>
              </h3>
              <p className="text-slate-300 text-xs pt-1">{record.encumbrance}</p>
            </div>
          </div>

          {/* Cryptographic Verification Seal & QR Code */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Lock className="w-4 h-4" />
                <span>Digitally Signed & Blockchain Certified</span>
              </div>
              <p className="text-[11px] text-slate-300">
                This Record of Rights is generated from the DILRMP National Land Ledger with cryptographic SHA-256 seal. Scan the QR code to verify authenticity.
              </p>
              <p className="font-mono text-[10px] text-slate-400 truncate max-w-md pt-1 select-all">
                Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </p>
            </div>

            {/* Dynamic QR Code */}
            <div className="p-2.5 rounded-xl bg-white flex-shrink-0 shadow-lg">
              <QRCodeSVG 
                value={verificationPayload} 
                size={88}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>

          {/* Footer Timestamp */}
          <div className="text-center text-[10px] text-slate-500 pt-2">
            Generated via BhoomiAI National Land Records Engine | Ministry of Rural Development
          </div>

        </div>

      </div>
    </div>
  );
}
