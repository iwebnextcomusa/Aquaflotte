import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Phone, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { COMPANY_INFO } from '../data/companyData';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Bonjour & Welcome to Aquaflotte AI! 🚛💦 How can I assist with your mobile fleet washing, heavy equipment, or truck cleaning quote in Montreal today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const quickQuestions = [
    'How much to wash 10 semi-trucks?',
    'Do you clean heavy machinery in Laval?',
    'What eco-friendly detergents do you use?',
    'Can we schedule night shifts?',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "Thank you for contacting Aquaflotte! Call +1 (514) 212-0256 for immediate assistance.";

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm currently assisting multiple fleet managers. For instant quotes or dispatch, please call +1 (514) 212-0256 directly!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Fixed bottom-right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-2xl hover:scale-105 transition-all flex items-center justify-center border-2 border-white group"
          aria-label="Open Aquaflotte AI Chatbot"
        >
          <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-300"></span>
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-90 sm:w-96 h-[520px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 text-slate-800">
          {/* Chat Header */}
          <div className="p-4 bg-blue-900 border-b border-blue-800 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500 text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black flex items-center gap-1.5">
                  Aquaflotte AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                </h4>
                <div className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Montreal Dispatch
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-blue-800 text-slate-200 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-600 shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] text-xs font-medium leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-sky-500 text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{m.content}</p>
                  <div className={`text-[9px] mt-1 text-right font-normal ${m.role === 'user' ? 'text-sky-100' : 'text-slate-400'}`}>{m.timestamp}</div>
                </div>
                {m.role === 'user' && (
                  <div className="p-1.5 rounded-lg bg-slate-200 text-slate-700 shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-sky-600 p-2 font-semibold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Aquaflotte AI is typing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 overflow-x-auto whitespace-nowrap flex gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-sky-400 text-[10px] text-slate-700 font-bold transition-colors shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about fleet wash quotes, areas..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:outline-none font-medium"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="p-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
