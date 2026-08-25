import React from 'react';
import { 
  FileText, 
  Map, 
  ShieldAlert, 
  Layers, 
  Sparkles, 
  QrCode, 
  Globe, 
  Sliders, 
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { translations } from '../utils/translations';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  portalRole, 
  setPortalRole, 
  onOpenCertificate,
  backendOnline
}) {
  const t = translations[lang] || translations.en;

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: Layers },
    { id: 'restoration', label: t.nav.restoration, icon: Sliders },
    { id: 'ocr', label: t.nav.ocr, icon: FileText },
    { id: 'cadastral', label: t.nav.cadastral, icon: Map },
    { id: 'validation', label: t.nav.validation, icon: ShieldAlert, badge: '2 Flags' },
    { id: 'blockchain', label: t.nav.blockchain, icon: Layers },
    { id: 'assistant', label: t.nav.assistant, icon: Sparkles }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'te', label: 'తెలుగు (Telugu)' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 shadow-lg">
      {/* Indian Flag Tricolor Stripe */}
      <div className="tricolor-stripe w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & National System Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 flex items-center justify-center shadow-glow-emerald">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-400 bg-clip-text text-transparent">
                  {t.appTitle}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  SIH26-26018
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t.ministryBadge}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-glow-emerald' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Role Selector, Language Dropdown & e-RoR Button */}
          <div className="flex items-center gap-2.5">
            {/* Backend status indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="text-slate-400">{backendOnline ? 'AI Core Online' : 'Demo Mode'}</span>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-slate-400 absolute left-2 pointer-events-none" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="pl-7 pr-2 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Switcher */}
            <button
              onClick={() => setPortalRole(portalRole === 'officer' ? 'citizen' : 'officer')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                portalRole === 'officer'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
              }`}
              title="Click to toggle between Revenue Officer & Citizen Mode"
            >
              <span>{portalRole === 'officer' ? '👮 ' + t.roles.officer.split(' ')[0] : '👨‍🌾 ' + t.roles.citizen.split(' ')[0]}</span>
            </button>

            {/* Verify e-RoR Button */}
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-glow-emerald transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.verifyCertificate}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  isActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
