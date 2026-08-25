import React, { useState } from 'react';
import { 
  Layers, 
  PlusCircle, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Hash, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  QrCode,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../utils/translations';
import { addMutationAPI, simulateTamperAPI } from '../utils/api';

const INITIAL_CHAIN = [
  {
    index: 0,
    timestamp: "2021-01-01 00:00:00 UTC",
    type: "GENESIS_SETTLEMENT_RECORD",
    survey_no: "VILLAGE-WAGHOLI-PUNE",
    owner: "Department of Land Resources (DoLR) Master Genesis",
    area: "Master Register",
    officer: "National Land Record Modernization Programme",
    hash: "0000a89f31c4b72183e912401f8938210398bbfa312903810239102391039102",
    previous_hash: "0000000000000000000000000000000000000000000000000000000000000000",
    signature: "ECDSA-secp256k1 (DoLR Root CA)"
  },
  {
    index: 1,
    timestamp: "2022-03-14 10:30:15 IST",
    type: "DIGITIZATION_AND_CADASTRE_SYNC",
    survey_no: "84/2A",
    owner: "Shankarrao Anandrao Patil",
    area: "1.45 Hectares",
    officer: "Talathi Wagholi (Circle Office)",
    hash: "7f4c2198be128912304910394812309481209384019283091823091820391823",
    previous_hash: "0000a89f31c4b72183e912401f8938210398bbfa312903810239102391039102",
    signature: "Govt-eSign #MH-TALATHI-8841"
  },
  {
    index: 2,
    timestamp: "2023-05-12 14:15:22 IST",
    type: "VIRASAT_SUCCESSION_MUTATION",
    survey_no: "84/2A",
    owner: "Ramchandra S. Patil (50%) & Suresh R. Patil (50%)",
    area: "1.45 Hectares",
    officer: "Naib Tehsildar Haveli (Ferfar #3890)",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    previous_hash: "7f4c2198be128912304910394812309481209384019283091823091820391823",
    signature: "Govt-eSign #MH-TEHSILDAR-1904"
  },
  {
    index: 3,
    timestamp: "2024-03-14 16:45:00 IST",
    type: "BANK_KCC_MORTGAGE_LIEN",
    survey_no: "84/2A",
    owner: "Bank of Maharashtra (KCC Loan ₹3,50,000)",
    area: "1.45 Hectares",
    officer: "Branch Manager & Talathi (Ferfar #4120)",
    hash: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7",
    previous_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    signature: "Banking-API-Token #BOM-WAG-412"
  }
];

export default function BlockchainLedger({ 
  lang, 
  onOpenCertificate 
}) {
  const t = translations[lang] || translations.en;

  const [chain, setChain] = useState(INITIAL_CHAIN);
  const [isTampered, setIsTampered] = useState(false);
  const [tamperedBlockIndex, setTamperedBlockIndex] = useState(null);
  const [isCreatingMutation, setIsCreatingMutation] = useState(false);

  // Form state
  const [mutationType, setMutationType] = useState('SALE_DEED_CONVEYANCE');
  const [surveyNo, setSurveyNo] = useState('84/2A');
  const [newOwner, setNewOwner] = useState('Aniket Suresh Patil (Grandson / Purchaser)');
  const [landArea, setLandArea] = useState('0.725 Hectares (1/2 Share)');
  const [officerName, setOfficerName] = useState('Sub-Registrar & Tehsildar Haveli');
  const [remarks, setRemarks] = useState('Registered Sale Deed #HAV-2026-9921 certified.');

  const handleCreateMutation = async (e) => {
    e.preventDefault();
    const lastBlock = chain[chain.length - 1];
    
    // Generate pseudo SHA-256 hash
    const fakeHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    
    const newBlock = {
      index: chain.length,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + " IST",
      type: mutationType,
      survey_no: surveyNo,
      owner: newOwner,
      area: landArea,
      officer: officerName,
      hash: fakeHash,
      previous_hash: lastBlock.hash,
      signature: `Govt-eSign #MH-TEH-${Math.floor(1000 + Math.random()*9000)}`
    };

    setChain([...chain, newBlock]);
    setIsCreatingMutation(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleSimulateTamper = () => {
    setIsTampered(true);
    setTamperedBlockIndex(2);
    setChain(prev => {
      const updated = [...prev];
      updated[2] = {
        ...updated[2],
        owner: "⚠️ FRAUDULENT CLAIMANT (UNAUTHORIZED EDIT)"
      };
      return updated;
    });
  };

  const handleRestoreChain = () => {
    setChain(INITIAL_CHAIN);
    setIsTampered(false);
    setTamperedBlockIndex(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Studio Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t.blockchain.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.blockchain.subtitle} • Protocol: <span className="text-emerald-400 font-mono">DILRMP-Chain v1.0</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {isTampered ? (
            <button
              onClick={handleRestoreChain}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-emerald transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restore Cryptographic Integrity</span>
            </button>
          ) : (
            <button
              onClick={handleSimulateTamper}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 transition-all"
              title="Demonstrates how unauthorized database edits immediately break blockchain hash validation"
            >
              <Unlock className="w-4 h-4" />
              <span>{t.blockchain.tamperSim}</span>
            </button>
          )}

          <button
            onClick={() => setIsCreatingMutation(!isCreatingMutation)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-glow-emerald transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isCreatingMutation ? 'Cancel Mutation' : t.blockchain.addMutation}</span>
          </button>
        </div>
      </div>

      {/* Chain Status Bar */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isTampered 
          ? 'bg-red-950/40 border-red-500/60 text-red-200' 
          : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isTampered ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {isTampered ? <ShieldAlert className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">Blockchain Verification Engine</span>
            <p className="text-sm font-extrabold text-white">
              {isTampered ? 'CRITICAL ALERT: CRYPTOGRAPHIC HASH MISMATCH AT BLOCK #2!' : '100% IMMUTABLE & VERIFIED • MERKLE ROOTS SYNCHRONIZED'}
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {isTampered 
                ? 'Unauthorized modification detected in Block #2 title holder. Cryptographic seal broken.'
                : 'All deed entries, mutations, and bank liens cryptographically sealed with SHA-256.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCertificate}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white whitespace-nowrap self-start sm:self-center"
        >
          <QrCode className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.blockchain.viewCertificate}</span>
        </button>
      </div>

      {/* Mutation Creation Wizard (Collapsible) */}
      {isCreatingMutation && (
        <form onSubmit={handleCreateMutation} className="glass-panel p-6 rounded-2xl border border-emerald-500/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Record New Land Mutation on Blockchain Ledger</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">Minting Block #{chain.length}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Mutation Type</label>
              <select
                value={mutationType}
                onChange={(e) => setMutationType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="SALE_DEED_CONVEYANCE">खरेदी खत (Registered Sale Deed Conveyance)</option>
                <option value="VIRASAT_SUCCESSION">वारस नोंद (Succession / Inheritance / Virasat)</option>
                <option value="PARTITION_DEED">वाटप पत्र (Family Partition & Sub-Division)</option>
                <option value="BANK_MORTGAGE_RELEASE">बोजा मुक्ती (Bank Mortgage Clearance / NOC)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Target Survey / Khasra Plot</label>
              <input
                type="text"
                value={surveyNo}
                onChange={(e) => setSurveyNo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">New Title Holder / Transferee</label>
              <input
                type="text"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Transferred Extent / Area</label>
              <input
                type="text"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Approving Revenue Officer / Authority</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Official Order Remarks & Deed Reference</label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreatingMutation(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-glow-emerald"
            >
              Mine & Cryptographically Seal Block
            </button>
          </div>
        </form>
      )}

      {/* Live Blockchain Stream View */}
      <div className="space-y-4">
        {chain.map((block) => {
          const isCurrentTampered = isTampered && block.index === tamperedBlockIndex;

          return (
            <div
              key={block.index}
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                isCurrentTampered
                  ? 'border-red-500 bg-red-950/20 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                    isCurrentTampered 
                      ? 'bg-red-500 text-white' 
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    BLOCK #{block.index}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{block.type}</span>
                  {block.index === 0 && (
                    <span className="px-2 py-0.2 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      GENESIS
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{block.timestamp}</span>
                </div>
              </div>

              {/* Block Content Body */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Survey Plot:</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{block.survey_no}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Registered Title:</span>
                  <span className={`font-bold text-sm truncate block ${isCurrentTampered ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                    {block.owner}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Land Extent:</span>
                  <span className="font-bold text-slate-200 font-mono">{block.area}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Authorizing Officer:</span>
                  <span className="font-bold text-slate-300 truncate block">{block.officer}</span>
                </div>
              </div>

              {/* Cryptographic Hashes Strip */}
              <div className="space-y-1.5 text-[11px] font-mono pt-2 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-400 gap-1">
                  <span className="text-slate-500 flex-shrink-0">Previous Block Hash:</span>
                  <span className="truncate text-slate-400 select-all">{block.previous_hash}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-emerald-400 gap-1">
                  <span className="text-slate-500 flex-shrink-0">Current SHA-256 Hash:</span>
                  <span className={`truncate font-bold select-all ${isCurrentTampered ? 'text-red-400' : 'text-emerald-400'}`}>
                    {block.hash}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-500 gap-1">
                  <span className="text-slate-600 flex-shrink-0">e-Signature Seal:</span>
                  <span className="truncate text-slate-400">{block.signature}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
