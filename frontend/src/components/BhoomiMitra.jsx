import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  FileText, 
  Map, 
  CheckCircle2, 
  ExternalLink,
  HelpCircle,
  Building2
} from 'lucide-react';
import { translations } from '../utils/translations';

const PRESET_QUERIES = [
  { text: "Show me all land records for Ramchandra Patil in Wagholi", lang: "en" },
  { text: "What is the active bank loan amount on Survey 84/2A?", lang: "en" },
  { text: "खसरा संख्या 312/1 का कुल क्षेत्रफल एवं मालिक का नाम बताएं", lang: "hi" },
  { text: "Is there any boundary dispute or court stay on Plot 84/3?", lang: "en" },
  { text: "७/१२ खाते क्र. १४२ वरील पीक पाहणी तपशील काय आहे?", lang: "mr" }
];

export default function BhoomiMitra({ 
  lang, 
  setCurrentTab, 
  onSelectRecord, 
  records 
}) {
  const t = translations[lang] || translations.en;

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "नमस्ते / Welcome! I am Bhoomi Mitra (भूमि मित्र), your AI Land Assistant. Ask me anything about land records, 7/12 extracts, Khasra numbers, bank encumbrances, or boundary disputes in English, Hindi, or regional languages.",
      recordLink: null,
      timestamp: "09:15 AM"
    }
  ]);

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let botResponse = "";
      let linkedRecord = null;
      const lower = query.toLowerCase();

      if (lower.includes("84/2") || lower.includes("ramchandra") || lower.includes("patil") || lower.includes("wagholi")) {
        linkedRecord = records.find(r => r.survey_no.includes("84/2"));
        botResponse = `✅ Record Found: Survey Plot **84/2A**, Khata No **142** in Village Wagholi, Haveli, Pune.\n\n• **Title Holders:** Ramchandra Shankarrao Patil (50%) & Suresh Ramchandra Patil (50%)\n• **Total Area:** 1.45 Hectares (3.58 Acres)\n• **Classification:** Jirayat (Rainfed Agricultural)\n• **Bank Encumbrance:** Active Bank of Maharashtra KCC Loan of ₹3,50,000 (Ferfar #4120)\n• **Title Status:** 100% Verified & Sealed on Blockchain.`;
      } else if (lower.includes("312/1") || lower.includes("rampur") || lower.includes("mahesh") || lower.includes("खसरा") || lower.includes("खतौनी")) {
        linkedRecord = records.find(r => r.survey_no.includes("312"));
        botResponse = `✅ खतौनी अभिलेख विवरण (ग्राम रामपुर, पिंडरा, वाराणसी):\n\n• **खसरा (गाटा) संख्या:** 312/1 (खाता संख्या: 00218)\n• **खातेदार:** महेश प्रताप सिंह सुत सूर्यदेव सिंह (पूर्ण स्वामित्व 1/1)\n• **कुल रकबा:** 0.8920 हेक्ट० (2.204 एकड़ / 3.52 बीघा)\n• **स्थिति:** भारमुक्त (Clear Title - कोई बैंक ऋण अथवा न्यायालयीय रोक नहीं है).\n• **फसल:** धान (खरीफ) एवं गेहूं (रबी).`;
      } else if (lower.includes("84/3") || lower.includes("dispute") || lower.includes("stay") || lower.includes("court") || lower.includes("विवाद")) {
        linkedRecord = records.find(r => r.id.includes("dispute"));
        botResponse = `⚠️ **CRITICAL DISPUTE ALERT ON PLOT 84/3:**\n\n• **Contested Title:** Kailash Vitthal Jagtap vs Gram Panchayat Wagholi.\n• **Discrepancy:** Scanned RoR mentions 2.10 Ha, but Cadastral GIS measures 2.38 Ha (0.28 Ha encroachment on Gaothan Road buffer).\n• **Legal Order:** Civil Court Injunction Stay Order #OS-2023-88 active.\n• **Status:** Mutation frozen pending SDO Revenue Court Hearing.`;
      } else if (lower.includes("patta") || lower.includes("senthil") || lower.includes("204/3") || lower.includes("nemili")) {
        linkedRecord = records.find(r => r.survey_no.includes("204"));
        botResponse = `✅ Tamil Nadu Patta Passbook #782:\n\n• **Survey No:** 204/3B, Village Nemili, Sriperumbudur.\n• **Pattadar:** M. Senthil Kumar (S/o Murugesan)\n• **Extent:** 0.405 Hectare (1.00 Acre / 100 Cents)\n• **Land Type:** Wetland (Nanjai Irrigated)\n• **Encumbrance:** Nil.`;
      } else {
        botResponse = `Here is the information from the National Land Registry: I have indexed 148,920 digitized land records across Maharashtra, UP, and Tamil Nadu. You can search by Survey Number (e.g. 84/2A, 312/1), Farmer Name, or Khata Number.`;
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        recordLink: linkedRecord,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech-to-text recognition
      setTimeout(() => {
        setIsListening(false);
        handleSend("Show me all land records for Ramchandra Patil in Wagholi");
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Bhoomi Mitra (भूमि मित्र) • Citizen AI Land Assistant
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Farmer-friendly conversational query interface in Hindi, English, Marathi, Tamil & Gujarati
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Multilingual Indic-NLP Active</span>
          </span>
        </div>
      </div>

      {/* Preset Prompts Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 flex-shrink-0">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Try asking:</span>
        </span>
        {PRESET_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.text)}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-all hover:border-emerald-500/50 text-left"
          >
            "{q.text}"
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col h-[560px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                m.sender === 'user'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-glow-emerald'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm space-y-2 ${
                m.sender === 'user'
                  ? 'bg-amber-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                {/* Direct Action Card in Bot Response */}
                {m.recordLink && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectRecord(m.recordLink);
                        setCurrentTab('ocr');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Inspect 7/12 OCR</span>
                    </button>
                    <button
                      onClick={() => setCurrentTab('cadastral')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-all"
                    >
                      <Map className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View on GIS Map</span>
                    </button>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 block text-right pt-1">{m.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse shadow-glow-saffron'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-800'
              }`}
              title="Voice Query (Speech-to-Text)"
            >
              {isListening ? <MicOff className="w-5 h-5 text-red-400" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Query Textbox */}
            <input
              type="text"
              placeholder={isListening ? "Listening... बोलिए..." : "Type in Hindi, English, Marathi, Tamil... (e.g. खसरा नंबर 312/1)"}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />

            {/* Send Button */}
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-glow-emerald transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
