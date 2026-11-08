import React, { useState, useRef, useEffect } from 'react';
import { useTourism } from '../context/TourismContext';
import { 
  Send, Bot, User, Sparkles, AlertCircle, RefreshCw, 
  HelpCircle, ShieldCheck, MapPin, Compass 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sourceNote?: string;
}

export const AiChatbot: React.FC = () => {
  const { locations, selectedLocation } = useTourism();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Kính chào quý thầy cô, các bạn học sinh và quý khách du lịch! Tôi là **Trợ lý Du lịch Vĩnh Long AI** – người bạn đồng hành số được xây dựng trong đề tài Hội thi Khoa học kỹ thuật cấp tỉnh THCS.\n\nTôi sẵn sàng giải đáp về lịch sử cách mạng, danh lam thắng cảnh Ao Bà Om, Biển Ba Động, làng nghề gốm Mang Thít và gợi ý các hành trình trải nghiệm phù hợp dựa trên kho dữ liệu thẩm định chính thức. Bạn muốn tìm hiểu địa điểm nào hôm nay?',
      timestamp: 'Vừa xong',
      sourceNote: 'Dữ liệu thẩm định Sở VHTTDL & Ban Quản lý Di tích',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'Ao Bà Om có gì đặc biệt và gắn với truyền thuyết gì?',
    'Khu lưu niệm Bác Hai Phạm Hùng có ý nghĩa lịch sử như thế nào?',
    'Hãy giới thiệu về vẻ đẹp và đặc sản Biển Ba Động.',
    'Làng gốm đỏ Mang Thít vì sao được gọi là "Vương quốc Đỏ"?',
    'Gợi ý lịch trình tham quan Vĩnh Long 1 ngày cho học sinh.',
    'Những lưu ý bảo vệ môi trường khi tham quan di tích quê hương?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          currentPlaceId: selectedLocation?.id,
        }),
      });

      if (!res.ok) {
        throw new Error(`Mã lỗi HTTP: ${res.status}`);
      }

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'Cảm ơn câu hỏi của bạn. Hệ thống đang hoàn thiện bổ sung dữ liệu.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        sourceNote: data.source === 'gemini-3.8-flash'
          ? 'Trí tuệ nhân tạo Gemini 3.8 Flash (Server-side AI Studio)'
          : 'Hệ thống tri thức du lịch kiểm chứng cục bộ',
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.warn('Lỗi khi gọi API chat:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Xin lỗi bạn, kết nối máy chủ AI tạm thời gián đoạn. Bạn có thể tra cứu thông tin chính xác tại tab "Khám phá địa điểm" hoặc kiểm tra lại kết nối mạng.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        sourceNote: 'Cảnh báo kết nối mạng',
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs flex flex-col h-[700px]">
      {/* Chatbot Header */}
      <div className="p-4 sm:p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                TRỢ LÝ DU LỊCH VĨNH LONG AI
              </h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                Gemini AI Engine
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Trợ lý thông minh giải đáp di tích lịch sử, danh thắng & văn hóa địa phương
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'welcome-reset',
                sender: 'assistant',
                text: 'Hội thoại đã được làm mới. Mời bạn đặt câu hỏi tiếp theo về du lịch Vĩnh Long!',
                timestamp: 'Vừa xong',
                sourceNote: 'Kho dữ liệu kiểm chứng',
              },
            ]);
          }}
          className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
          title="Làm mới hội thoại"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
        <span className="text-stone-500 font-semibold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Câu hỏi mẫu:
        </span>
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 border border-stone-200 text-stone-700 hover:text-emerald-800 text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-stone-100/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-xs'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                {msg.text}
              </div>

              <div className="flex items-center justify-between gap-3 mt-2.5 pt-2 border-t border-stone-100/60 text-[10px] text-stone-400">
                <span>{msg.timestamp}</span>
                {msg.sourceNote && (
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {msg.sourceNote}
                  </span>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-stone-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-4 text-xs text-stone-500 shadow-xs flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </span>
              <span>Trợ lý AI đang tra cứu cơ sở dữ liệu kiểm chứng và biên soạn câu trả lời...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t border-stone-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Đặt câu hỏi về lịch sử, văn hóa, ẩm thực, lịch trình Vĩnh Long..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0"
            aria-label="Gửi câu hỏi"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 px-1">
          <span>
            * Thông tin được đối chiếu với cơ sở dữ liệu di tích đã kiểm chứng.
          </span>
          <span className="font-mono">
            Model: Gemini 3.8 Flash
          </span>
        </div>
      </div>
    </div>
  );
};
