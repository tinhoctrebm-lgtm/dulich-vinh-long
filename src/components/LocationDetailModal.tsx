import React, { useState } from 'react';
import { LocationItem } from '../types/tourism';
import { useTourism } from '../context/TourismContext';
import { 
  X, Volume2, MapPin, Navigation, QrCode, Share2, ArrowLeft, 
  BookOpen, ShieldCheck, Calendar, Compass, Leaf, CheckCircle2, 
  Copy, Check, Clock, Tag, Image as ImageIcon, Sparkles 
} from 'lucide-react';

interface LocationDetailModalProps {
  location: LocationItem;
  onClose: () => void;
}

export const LocationDetailModal: React.FC<LocationDetailModalProps> = ({ location, onClose }) => {
  const { playNarration, setQrLocation, setActiveTab } = useTourism();
  const [copied, setCopied] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(location.imageUrl);

  // Link for direct Google Maps navigation based on actual coordinates or address fallback
  const hasValidCoords = location.coordinates && (location.coordinates.lat !== 0 || location.coordinates.lng !== 0);
  const destinationParam = hasValidCoords
    ? `${location.coordinates.lat},${location.coordinates.lng}`
    : encodeURIComponent(`${location.name}, ${location.address || 'Vĩnh Long'}`);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationParam}`;

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/place/${location.id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleViewOnMap = () => {
    onClose();
    setActiveTab('map');
    window.location.hash = '#/map';
  };

  const handlePlayAudio = () => {
    playNarration(location);
    setActiveTab('tts');
    window.location.hash = '#/tts';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden bg-stone-900">
          <img
            src={selectedPhoto}
            alt={location.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Action Ribbon at Bottom of Image */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-300 mb-1">
              <span>{location.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{location.area}</span>
              {location.code && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{location.code}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                {location.verifiedStatus}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              {location.name}
            </h2>
          </div>
        </div>

        {/* Gallery Thumbnails Strip (if multiple images exist) */}
        {location.galleryUrls && location.galleryUrls.length > 1 && (
          <div className="bg-stone-900 px-5 py-2.5 flex items-center gap-2 overflow-x-auto border-t border-white/10 shrink-0">
            <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" />
              Thư viện ảnh:
            </span>
            {location.galleryUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(url)}
                className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedPhoto === url ? 'border-emerald-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={url} alt={`Ảnh ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Toolbar: Action Buttons */}
        <div className="bg-stone-50 border-b border-stone-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe thuyết minh AI</span>
            </button>

            <button
              onClick={handleViewOnMap}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Xem bản đồ</span>
            </button>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-xs font-medium transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Chỉ đường</span>
            </a>

            <button
              onClick={() => setQrLocation(location)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-stone-700" />
              <span>Tạo mã QR</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã sao chép link</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-600" />
                  <span>Chia sẻ địa điểm</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại danh sách</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-stone-800">
          {/* Key Facts Ribbon: Address, Hours, Tickets, Date */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-stone-100 p-4 rounded-2xl">
            <div>
              <div className="text-stone-400 font-medium uppercase text-[10px]">Địa chỉ:</div>
              <div className="font-semibold text-stone-800 mt-0.5 truncate" title={location.address}>
                {location.address}
              </div>
            </div>

            <div>
              <div className="text-stone-400 font-medium uppercase text-[10px]">Giờ mở cửa:</div>
              <div className="font-semibold text-stone-800 mt-0.5">
                {location.visitingHours || '07:30 – 17:00 hằng ngày'}
              </div>
            </div>

            <div>
              <div className="text-stone-400 font-medium uppercase text-[10px]">Giá vé:</div>
              <div className="font-semibold text-emerald-800 mt-0.5">
                {location.ticketPrice || 'Miễn phí vé vào cổng'}
              </div>
            </div>

            <div>
              <div className="text-stone-400 font-medium uppercase text-[10px]">Ngày thẩm định:</div>
              <div className="font-semibold text-stone-800 mt-0.5 font-mono">
                {location.verifiedDate}
              </div>
            </div>
          </div>

          {/* Highlights */}
          {location.highlights && location.highlights.length > 0 && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Những điểm nổi bật không nên bỏ lỡ
              </h4>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-stone-800">
                {location.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1. Giới thiệu tổng quan */}
          <section>
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Giới thiệu tổng quan
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {location.fullDescription}
            </p>
          </section>

          {/* 2. Lịch sử hình thành */}
          <section className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              Lịch sử hình thành & bối cảnh
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              {location.history}
            </p>
          </section>

          {/* 3. Giá trị văn hóa, lịch sử hoặc sinh thái */}
          <section>
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Giá trị văn hóa, lịch sử và sinh thái
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {location.culturalValue}
            </p>
          </section>

          {/* 4. Những điều nên trải nghiệm */}
          <section>
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-700" />
              Các hoạt động trải nghiệm
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {location.experiences.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Hướng dẫn tham quan & Lưu ý bảo vệ môi trường */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <h4 className="font-semibold text-xs text-amber-900 uppercase tracking-wider mb-2">
                Hướng dẫn tham quan & Quy định
              </h4>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                {location.visitorGuide}
              </p>
              {location.visitorNotes && (
                <p className="text-xs text-amber-900/80 mt-2 italic">
                  * {location.visitorNotes}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <h4 className="font-semibold text-xs text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                Lưu ý bảo vệ môi trường
              </h4>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {location.environmentalNotes}
              </p>
            </div>
          </div>

          {/* 6. Kịch bản thuyết minh giọng nói AI */}
          <section className="p-5 rounded-2xl bg-stone-900 text-stone-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Kịch bản Thuyết minh AI chuẩn
              </h3>
              <button
                onClick={handlePlayAudio}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
              >
                Phát âm thanh
              </button>
            </div>
            <blockquote className="italic text-sm sm:text-base text-stone-200 leading-relaxed border-l-2 border-emerald-500 pl-4 py-1">
              "{location.audioScript}"
            </blockquote>
          </section>

          {/* 7. Nguồn tài liệu tham khảo & Bản quyền ảnh */}
          <section className="pt-4 border-t border-stone-200 text-xs text-stone-500 space-y-1">
            <div className="font-medium text-stone-700">Tài liệu tham khảo & Thẩm định:</div>
            <div>
              {location.sources.title} {location.sources.author ? `(Tác giả: ${location.sources.author})` : ''}
              {location.sources.editorName ? ` · Biên tập: ${location.sources.editorName}` : ''}
            </div>
            {location.sources.url && (
              <a 
                href={location.sources.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 hover:underline break-all"
              >
                {location.sources.url}
              </a>
            )}
            {location.imageCredit && (
              <div className="text-[11px] text-stone-400 pt-1">
                Bản quyền hình ảnh: {location.imageCredit}
              </div>
            )}
            <div>Trạng thái: <span className="font-semibold text-emerald-700">{location.verifiedStatus}</span> · Kiểm chứng ngày: {location.verifiedDate}</div>
          </section>
        </div>
      </div>
    </div>
  );
};
