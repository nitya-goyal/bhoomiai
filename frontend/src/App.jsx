import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OfficerDashboard from './components/OfficerDashboard';
import RestorationStudio from './components/RestorationStudio';
import OCRExtractor from './components/OCRExtractor';
import CadastralGIS from './components/CadastralGIS';
import ValidationCenter from './components/ValidationCenter';
import BlockchainLedger from './components/BlockchainLedger';
import BhoomiMitra from './components/BhoomiMitra';
import CertificateModal from './components/CertificateModal';

import { SAMPLE_RECORDS } from './data/mockRecords';
import { checkBackendHealth } from './utils/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [lang, setLang] = useState('en');
  const [portalRole, setPortalRole] = useState('officer'); // 'officer' or 'citizen'
  const [records, setRecords] = useState(SAMPLE_RECORDS);
  const [selectedRecord, setSelectedRecord] = useState(SAMPLE_RECORDS[0]);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    // Check backend health periodically
    const check = async () => {
      const isUp = await checkBackendHealth();
      setBackendOnline(isUp);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        portalRole={portalRole}
        setPortalRole={setPortalRole}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        backendOnline={backendOnline}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <OfficerDashboard
            lang={lang}
            setCurrentTab={setCurrentTab}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            records={records}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentTab === 'restoration' && (
          <RestorationStudio
            lang={lang}
            selectedRecord={selectedRecord}
            setSelectedRecord={setSelectedRecord}
            records={records}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'ocr' && (
          <OCRExtractor
            lang={lang}
            selectedRecord={selectedRecord}
            setSelectedRecord={setSelectedRecord}
            records={records}
            setCurrentTab={setCurrentTab}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentTab === 'cadastral' && (
          <CadastralGIS
            lang={lang}
            setCurrentTab={setCurrentTab}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            records={records}
          />
        )}

        {currentTab === 'validation' && (
          <ValidationCenter
            lang={lang}
            selectedRecord={selectedRecord}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'blockchain' && (
          <BlockchainLedger
            lang={lang}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentTab === 'assistant' && (
          <BhoomiMitra
            lang={lang}
            setCurrentTab={setCurrentTab}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            records={records}
          />
        )}
      </main>

      {/* Official Verifiable Digital e-RoR Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        record={selectedRecord}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 glass-panel py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">BhoomiAI Platform</span>
            <span>• SIH26-26018</span>
            <span>• Ministry of Rural Development & Department of Land Resources</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>DILRMP Compliant</span>
            <span>SHA-256 Merkle Ledger</span>
            <span>W3C Verifiable Credentials</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
