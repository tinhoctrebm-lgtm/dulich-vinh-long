import React from 'react';
import { TourismProvider, useTourism } from './context/TourismContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LocationCard } from './components/LocationCard';
import { LocationDetailModal } from './components/LocationDetailModal';
import { VoicePlayer } from './components/VoicePlayer';
import { SmartMap } from './components/SmartMap';
import { QRCodeModal } from './components/QRCodeModal';
import { LearningCorner } from './components/LearningCorner';
import { AiChatbot } from './components/AiChatbot';
import { ProjectInfoView } from './components/ProjectInfoView';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { Footer } from './components/Footer';
import { CATEGORIES_CONFIG } from './data/initialLocations';
import { 
  Compass, Volume2, Sparkles, MapPin, Search, ArrowRight, 
  BookOpen, Play, Pause, Square, ExternalLink, ShieldCheck, Heart 
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    locations,
    publicLocations,
    featuredLocations,
    activeTab,
    setActiveTab,
    selectedLocation,
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    qrLocation,
    setQrLocation,
    isPlaying,
    isPaused,
    currentVoiceLocation,
    pauseNarration,
    resumeNarration,
    stopNarration,
    isAdminLoggedIn,
  } = useTourism();

  // For public visitors: show only published locations. If Admin logged in: show all locations.
  const baseLocations = isAdminLoggedIn ? locations : publicLocations;

  const filteredLocations = baseLocations.filter((loc) => {
    const matchesCategory = selectedCategory === 'all' || loc.category === selectedCategory;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loc.code && loc.code.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-16">
            <HeroBanner />

            {/* Featured Locations Section */}
            <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1">
                    Điểm đến chọn lọc · Dữ liệu đã thẩm định
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    Địa Điểm Du Lịch Nổi Bật
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                    Khám phá di tích lịch sử cách mạng, danh lam thắng cảnh Ao Bà Om, biển Ba Động và làng nghề truyền thống Vĩnh Long
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('places');
                    window.location.hash = '#/places';
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer self-start md:self-auto"
                >
                  <span>Xem tất cả ({baseLocations.length} địa điểm)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Category Segmented Tabs (§1.A) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                {CATEGORIES_CONFIG.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      selectedCategory === cat.key
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredLocations.map((loc) => (
                  <LocationCard key={loc.id} location={loc} />
                ))}
              </div>

              {filteredLocations.length === 0 && (
                <div className="p-12 text-center bg-white rounded-3xl border border-stone-200">
                  <p className="text-sm text-stone-500">
                    Không tìm thấy địa điểm phù hợp với từ khóa "{searchQuery}".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-3 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                  >
                    Xóa bộ lọc tìm kiếm
                  </button>
                </div>
              )}
            </section>

            {/* Special Highlights of Vinh Long Section */}
            <section className="bg-stone-100 py-16 border-y border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <div className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1">
                    Bản sắc miền Tây Nam Bộ
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    Những Điểm Đặc Sắc Của Du Lịch Vĩnh Long
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2">
                    Nơi hội tụ giữa lịch sử hào hùng, phù sa sông Cửu Long màu mỡ và giao thoa văn hóa đa sắc tộc
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Highlight 1 */}
                  <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                        Vùng đất Địa linh Nhân kiệt
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        Quê hương của các nhà lãnh đạo tiền bối kiên trung như Chủ tịch Hội đồng Bộ trưởng Phạm Hùng, Thủ tướng Võ Văn Kiệt, Giáo sư Viện sĩ Trần Đại Nghĩa cùng nhiều di tích cách mạng hào hùng.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-emerald-700 font-semibold">
                      Giáo dục truyền thống cách mạng
                    </div>
                  </div>

                  {/* Highlight 2 */}
                  <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                        Giao thoa Văn hóa Khmer & Lễ hội
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        Danh lam thắng cảnh Ao Bà Om với những cây cổ thụ sao dầu hàng trăm năm tuổi, Chùa Âng cổ kính và lễ hội Ok Om Bok cúng trăng rực rỡ sắc màu văn hóa truyền thống Nam Bộ.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-amber-700 font-semibold">
                      Di sản văn hóa phi vật thể
                    </div>
                  </div>

                  {/* Highlight 3 */}
                  <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                        Vương quốc Đỏ & Miệt vườn Sông nước
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        Di sản đương đại gốm đỏ Mang Thít độc nhất vô nhị trải dài ven sông Cổ Chiên hòa cùng những vườn cây trái trĩu quả Cù lao An Bình và bãi cát lộng gió Biển Ba Động.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-teal-700 font-semibold">
                      Du lịch sinh thái & Làng nghề
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Integrated AI Voice Narration Showcase Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <VoicePlayer />
            </section>
          </div>
        )}

        {/* TAB: PLACES */}
        {activeTab === 'places' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Khám Phá Địa Điểm Du Lịch Vĩnh Long
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Tra cứu chi tiết di tích lịch sử, danh thắng, văn hóa và nghe thuyết minh tự động bằng AI
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên di tích, mã, khu vực..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES_CONFIG.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    selectedCategory === cat.key
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 font-medium">
              Hiển thị {filteredLocations.length} địa điểm {isAdminLoggedIn ? '(Gồm cả bản nháp Quản trị)' : 'đã được thẩm định công khai'}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredLocations.map((loc) => (
                <LocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </div>
        )}

        {/* TAB: MAP */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <SmartMap />
          </div>
        )}

        {/* TAB: TTS */}
        {activeTab === 'tts' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <VoicePlayer />
          </div>
        )}

        {/* TAB: LEARNING CORNER */}
        {activeTab === 'learning' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <LearningCorner />
          </div>
        )}

        {/* TAB: AI CHATBOT */}
        {activeTab === 'chat' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AiChatbot />
          </div>
        )}

        {/* TAB: PROJECT INFO */}
        {activeTab === 'project' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ProjectInfoView />
          </div>
        )}

        {/* TAB: ADMIN (RBAC Gated) */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {isAdminLoggedIn ? <AdminPanel /> : <AdminLogin />}
          </div>
        )}
      </main>

      {/* Floating Mini Player (visible when audio is playing and not on tts tab) */}
      {isPlaying && activeTab !== 'tts' && currentVoiceLocation && (
        <aside 
          aria-label="Trình phát giọng nói thu nhỏ"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-stone-900/95 text-white backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-stone-700 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300"
        >
          <div 
            onClick={() => {
              setActiveTab('tts');
              window.location.hash = '#/tts';
            }}
            className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
          >
            <img
              src={currentVoiceLocation.imageUrl}
              alt={currentVoiceLocation.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0">
              <div className="text-[10px] text-emerald-400 font-semibold uppercase flex items-center gap-1">
                <Volume2 className="w-3 h-3 animate-pulse" />
                Đang thuyết minh AI
              </div>
              <div className="text-xs font-bold text-white truncate">
                {currentVoiceLocation.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isPaused ? (
              <button
                onClick={resumeNarration}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                title="Tiếp tục"
              >
                <Play className="w-4 h-4 fill-white" />
              </button>
            ) : (
              <button
                onClick={pauseNarration}
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white cursor-pointer"
                title="Tạm dừng"
              >
                <Pause className="w-4 h-4 fill-white" />
              </button>
            )}

            <button
              onClick={stopNarration}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
              title="Dừng"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </aside>
      )}

      {/* Location Detail Modal */}
      {selectedLocation && (
        <LocationDetailModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}

      {/* QR Code Modal */}
      {qrLocation && (
        <QRCodeModal
          location={qrLocation}
          onClose={() => setQrLocation(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <TourismProvider>
      <MainAppContent />
    </TourismProvider>
  );
}
