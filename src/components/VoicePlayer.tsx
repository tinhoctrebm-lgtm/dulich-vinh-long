import React from 'react';
import { useTourism } from '../context/TourismContext';
import { 
  Play, Pause, Square, RotateCcw, Volume2, VolumeX, 
  Sparkles, CheckCircle, Mic, AlertCircle, Compass 
} from 'lucide-react';

export const VoicePlayer: React.FC = () => {
  const {
    locations,
    publicLocations,
    isAdminLoggedIn,
    currentVoiceLocation,
    isPlaying,
    isPaused,
    speechRate,
    speechVolume,
    availableVoices,
    selectedVoice,
    currentSentence,
    sentenceIndex,
    totalSentences,
    playNarration,
    pauseNarration,
    resumeNarration,
    stopNarration,
    replayNarration,
    setSpeechRate,
    setSpeechVolume,
    setSelectedVoice,
    setSelectedLocation,
  } = useTourism();

  const baseLocations = isAdminLoggedIn ? locations : publicLocations;

  // Active location is either currently playing location or first item
  const activeLocation = currentVoiceLocation || baseLocations[0];

  // Filter Vietnamese voices
  const vietnameseVoices = availableVoices.filter(v => 
    v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn')
  );

  const rateOptions = [0.75, 1.0, 1.25, 1.5];

  // Calculate progress percent
  const progressPercent = totalSentences > 0 
    ? Math.round(((sentenceIndex + (isPlaying ? 1 : 0)) / totalSentences) * 100) 
    : 0;

  // Status string
  const getStatusText = () => {
    if (isPlaying && !isPaused) return 'Đang phát thuyết minh';
    if (isPlaying && isPaused) return 'Đang tạm dừng';
    return 'Đã dừng phát';
  };

  const getStatusBadgeClass = () => {
    if (isPlaying && !isPaused) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (isPlaying && isPaused) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-stone-100 text-stone-600 border-stone-200';
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8">
      {/* Header of Player */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-2">
            <Mic className="w-4 h-4 text-emerald-600" />
            Hệ thống Thuyết minh AI Tự động bằng Giọng nói Tiếng Việt
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            {activeLocation ? activeLocation.name : 'Chọn địa điểm để thuyết minh'}
          </h2>
          <div className="text-xs text-stone-500 mt-1">
            {activeLocation ? `${activeLocation.categoryLabel} · ${activeLocation.area}` : ''}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass()}`}>
            {getStatusText()}
          </span>
          {activeLocation && (
            <button
              onClick={() => setSelectedLocation(activeLocation)}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-4 cursor-pointer"
            >
              Xem chi tiết địa điểm
            </button>
          )}
        </div>
      </div>

      {/* Main Player Body */}
      <div className="py-6 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: Thumbnail & Visualizer */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative aspect-4/3 w-full max-w-sm rounded-2xl overflow-hidden shadow-md bg-stone-100">
            {activeLocation && (
              <img
                src={activeLocation.imageUrl}
                alt={activeLocation.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying && !isPaused ? 'scale-105' : ''
                }`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            
            {/* Visualizer bars when playing */}
            {isPlaying && !isPaused && (
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-center gap-1.5 h-8 bg-stone-950/40 backdrop-blur-xs rounded-xl p-2">
                {[40, 70, 100, 60, 90, 45, 80, 65, 95, 50, 75, 40].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-emerald-400 rounded-full animate-pulse"
                    style={{
                      height: `${h}%`,
                      animationDuration: `${0.4 + (i % 4) * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick place switcher */}
          <div className="w-full max-w-sm mt-4">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Chuyển nhanh bài thuyết minh địa điểm:
            </label>
            <select
              value={activeLocation?.id || ''}
              onChange={(e) => {
                const target = baseLocations.find(l => l.id === e.target.value);
                if (target) {
                  playNarration(target);
                }
              }}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {baseLocations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Audio Control Console & Live Subtitle */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          {/* Synchronous Subtitle Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 min-h-[140px] flex flex-col justify-between">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Đồng bộ lời thuyết minh</span>
              {totalSentences > 0 && (
                <span className="font-mono text-emerald-700">
                  Câu {sentenceIndex + 1}/{totalSentences}
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg font-serif text-stone-800 leading-relaxed italic">
              {currentSentence ? (
                <span className="bg-emerald-100/70 text-emerald-950 px-1.5 py-0.5 rounded-md font-medium">
                  "{currentSentence}"
                </span>
              ) : activeLocation ? (
                <span className="text-stone-500">
                  "{activeLocation.audioScript}"
                </span>
              ) : (
                'Chưa có dữ liệu thuyết minh.'
              )}
            </p>

            {/* Progress Bar */}
            <div className="mt-4 pt-3 border-t border-stone-200/60">
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-stone-500 mt-1 font-mono">
                <span>0%</span>
                <span>{progressPercent}% hoàn thành</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Primary Audio Controls: Play, Pause, Resume, Stop, Replay */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {!isPlaying ? (
              <button
                onClick={() => activeLocation && playNarration(activeLocation)}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>PHÁT THUYẾT MINH</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={resumeNarration}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>TIẾP TỤC</span>
              </button>
            ) : (
              <button
                onClick={pauseNarration}
                className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>TẠM DỪNG</span>
              </button>
            )}

            <button
              onClick={stopNarration}
              disabled={!isPlaying}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                isPlaying
                  ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                  : 'border-stone-200 bg-stone-50 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>DỪNG</span>
            </button>

            <button
              onClick={replayNarration}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>NGHE LẠI</span>
            </button>
          </div>

          {/* Secondary Controls: Speed presets, Volume, Voice Selector */}
          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200 text-xs">
            {/* Speed Presets */}
            <div>
              <label className="block font-medium text-stone-700 mb-1.5">
                Tốc độ đọc:
              </label>
              <div className="flex items-center gap-1">
                {rateOptions.map(r => (
                  <button
                    key={r}
                    onClick={() => setSpeechRate(r)}
                    className={`flex-1 py-1.5 rounded-lg font-mono font-semibold transition-colors cursor-pointer ${
                      speechRate === r
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-stone-700 flex items-center gap-1">
                  {speechVolume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                  Âm lượng:
                </span>
                <span className="font-mono text-stone-500">{Math.round(speechVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={speechVolume}
                onChange={(e) => setSpeechVolume(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Voice Engine Selector */}
            <div>
              <label className="block font-medium text-stone-700 mb-1.5">
                Giọng đọc (Tiếng Việt):
              </label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const v = availableVoices.find(voice => voice.name === e.target.value);
                  if (v) setSelectedVoice(v);
                }}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 truncate"
              >
                {vietnameseVoices.length > 0 ? (
                  vietnameseVoices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))
                ) : (
                  <option value="">Giọng đọc mặc định trình duyệt</option>
                )}
              </select>
            </div>
          </div>

          {/* Browser compatibility helper notice */}
          {vietnameseVoices.length === 0 && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Gợi ý giọng đọc:</strong> Trình duyệt của bạn đang sử dụng bộ phát âm mặc định. Trên Chrome, Edge hoặc Safari, hệ thống sẽ tự động tối ưu hóa ngữ điệu tiếng Việt chuẩn.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
