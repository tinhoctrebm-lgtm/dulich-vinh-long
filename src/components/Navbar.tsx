import React, { useState } from 'react';
import { useTourism } from '../context/TourismContext';
import { Volume2, VolumeX, Menu, X, Shield, BookOpen, Sparkles, MapPin, Compass, HelpCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, isPlaying, isPaused, currentVoiceLocation, stopNarration, locations, playNarration } = useTourism();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', label: 'Trang chủ' },
    { key: 'places', label: 'Khám phá địa điểm' },
    { key: 'map', label: 'Bản đồ du lịch' },
    { key: 'tts', label: 'Thuyết minh AI' },
    { key: 'learning', label: 'Góc học tập' },
    { key: 'chat', label: 'Hỏi đáp AI' },
  ];

  const handleNavClick = (key: string) => {
    setActiveTab(key);
    window.location.hash = `#/${key}`;
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrimaryAction = () => {
    if (isPlaying) {
      setActiveTab('tts');
      window.location.hash = '#/tts';
    } else {
      // Start narration of first or current location
      const target = currentVoiceLocation || locations[0];
      if (target) {
        playNarration(target);
        setActiveTab('tts');
        window.location.hash = '#/tts';
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group transition-transform shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-stone-900 whitespace-nowrap leading-tight">
                VĨNH LONG SMART TOURISM
              </div>
              <div className="text-[11px] font-medium text-emerald-700 whitespace-nowrap tracking-wide">
                Hệ thống Du lịch Thông minh & AI Voice Guide
              </div>
            </div>
          </button>

          {/* Zone 2: Clean single-line text nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map(link => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.key)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  activeTab === link.key
                    ? 'text-emerald-700 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.label}
                {activeTab === link.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('project')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'project'
                  ? 'text-emerald-700 font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Giới thiệu dự án
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrimaryAction}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 ${
                isPlaying
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800 ring-2 ring-emerald-300'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {isPlaying ? (
                <>
                  <span className="flex gap-0.5 items-end h-3.5">
                    <span className="w-1 bg-white h-2 animate-bounce rounded-xs" />
                    <span className="w-1 bg-white h-3.5 animate-bounce [animation-delay:0.15s] rounded-xs" />
                    <span className="w-1 bg-white h-2.5 animate-bounce [animation-delay:0.3s] rounded-xs" />
                  </span>
                  <span>Đang thuyết minh AI</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Trải nghiệm Thuyết minh AI</span>
                </>
              )}
            </button>

            {/* Admin quick entry */}
            <button
              onClick={() => handleNavClick('admin')}
              title="Khu vực Quản trị viên"
              className={`p-2 rounded-lg border text-xs font-medium transition-colors hidden sm:flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="text-[11px] whitespace-nowrap">Quản trị</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-1 shadow-md">
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.key)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === link.key
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('project')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'project' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Giới thiệu dự án KHKT
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'admin' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Cổng Quản trị viên
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
