import React from 'react';
import { LocationItem } from '../types/tourism';
import { useTourism } from '../context/TourismContext';
import { Volume2, QrCode, ArrowRight, CheckCircle, Clock, Tag } from 'lucide-react';

interface LocationCardProps {
  location: LocationItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const { setSelectedLocation, playNarration, setQrLocation, isPlaying, currentVoiceLocation, isAdminLoggedIn } = useTourism();

  const isCurrentPlaying = isPlaying && currentVoiceLocation?.id === location.id;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Thumbnail with fallbacks (§3.E) */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={location.imageUrl}
          alt={location.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Admin Draft Badge if Draft */}
        {isAdminLoggedIn && location.status === 'draft' && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-amber-500/90 text-white text-[10px] font-bold tracking-wide uppercase backdrop-blur-xs">
            Bản nháp
          </span>
        )}

        {/* Featured marker */}
        {location.isFeatured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold tracking-wide uppercase backdrop-blur-xs">
            Nổi bật
          </span>
        )}

        {/* Quick Voice Play Trigger on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playNarration(location);
          }}
          title={isCurrentPlaying ? "Đang phát thuyết minh" : "Nghe thuyết minh AI ngay"}
          className={`absolute bottom-3 right-3 p-3 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer ${
            isCurrentPlaying
              ? 'bg-emerald-600 text-white ring-4 ring-emerald-300 animate-pulse'
              : 'bg-white text-emerald-800 hover:bg-emerald-50'
          }`}
          aria-label={`Nghe thuyết minh ${location.name}`}
        >
          <Volume2 className="w-5 h-5" />
        </button>

        {/* Quick QR code button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQrLocation(location);
          }}
          title="Tạo mã QR cho địa điểm này"
          className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
          aria-label="Tạo mã QR"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content with unboxed metadata discipline (§1.A) */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line with subtle typographic separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
            <span className="font-medium text-emerald-700">{location.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{location.area}</span>
            {location.code && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[10px] text-stone-400">{location.code}</span>
              </>
            )}
          </div>

          <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 mb-2 leading-snug">
            {location.name}
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
            {location.shortDescription}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-stone-500">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{location.verifiedStatus}</span>
          </div>

          <button
            onClick={() => setSelectedLocation(location)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
          >
            <span>Khám phá</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
