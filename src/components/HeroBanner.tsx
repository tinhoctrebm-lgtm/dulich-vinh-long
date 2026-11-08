import React from 'react';
import { useTourism } from '../context/TourismContext';
import { Search, Volume2, Compass, MapPin, Sparkles, BookOpen, Layers } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { locations, setActiveTab, playNarration, searchQuery, setSearchQuery } = useTourism();

  // Compute real statistics based on actual verified data
  const totalLocations = locations.length;
  const totalAudioScripts = locations.filter(l => l.audioScript && l.audioScript.trim().length > 0).length;
  const totalQuizzes = locations.reduce((sum, l) => sum + (l.quizzes?.length || 0), 0);
  const totalTasks = locations.reduce((sum, l) => sum + (l.tasks?.length || 0), 0);

  const handleExploreClick = () => {
    setActiveTab('places');
    window.location.hash = '#/places';
    const element = document.getElementById('explore-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTtsClick = () => {
    if (locations.length > 0) {
      playNarration(locations[0]);
    }
    setActiveTab('tts');
    window.location.hash = '#/tts';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('places');
    window.location.hash = '#/places';
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Image with Contrast Scrim (§1.F) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg"
          alt="Phong cảnh sông nước miệt vườn Vĩnh Long"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-900/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Natural editorial kicker without badges or pills (§1.A, §1.B) */}
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            Hội thi Khoa học kỹ thuật cấp tỉnh THCS 2026–2027 · Đề tài nghiên cứu ứng dụng AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white mb-5 leading-tight text-balance">
            KHÁM PHÁ VĨNH LONG
          </h1>

          <p className="text-xl sm:text-2xl font-serif italic text-emerald-100/90 mb-4 font-light">
            Hành trình khám phá lịch sử – văn hóa – thiên nhiên miền Tây
          </p>

          <p className="text-base text-stone-200 leading-relaxed mb-8 max-w-2xl">
            Nền tảng du lịch số thông minh tích hợp công nghệ thuyết minh giọng nói tự động bằng AI, bản đồ định vị di tích, tra cứu mã QR tại điểm đến và góc học tập lịch sử địa phương tương tác dành cho học sinh, giáo viên và du khách.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={handleExploreClick}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/30 flex items-center gap-2 whitespace-nowrap cursor-pointer hover:scale-102"
            >
              <Compass className="w-4 h-4" />
              <span>KHÁM PHÁ NGAY</span>
            </button>

            <button
              onClick={handleTtsClick}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl transition-all backdrop-blur-md flex items-center gap-2 whitespace-nowrap cursor-pointer hover:scale-102"
            >
              <Volume2 className="w-4 h-4 text-emerald-300" />
              <span>TRẢI NGHIỆM THUYẾT MINH AI</span>
            </button>
          </div>

          {/* Search Bar (Section 1.B) */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm di tích Bác Hai Phạm Hùng, Ao Bà Om, Biển Ba Động..."
                className="w-full pl-12 pr-28 py-3.5 bg-white/95 text-stone-900 rounded-xl text-sm placeholder-stone-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>

        {/* Real System Statistics Bar (§1.F) - Strictly based on real data, no fake metrics */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              {totalLocations}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Địa điểm du lịch kiểm chứng
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 tabular-nums">
              {totalAudioScripts}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Bài thuyết minh AI giọng nói
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-teal-300 tabular-nums">
              {totalQuizzes}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Câu hỏi trắc nghiệm địa phương
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 tabular-nums">
              {totalTasks}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              Nhiệm vụ trải nghiệm thực tế
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
