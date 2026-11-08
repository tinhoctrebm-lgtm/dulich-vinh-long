import React, { useEffect, useRef, useState } from 'react';
import { useTourism } from '../context/TourismContext';
import { LocationItem } from '../types/tourism';
import L from 'leaflet';
import { Search, MapPin, Navigation, Volume2, Compass, Layers, Filter } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/initialLocations';

export const SmartMap: React.FC = () => {
  const { locations, publicLocations, isAdminLoggedIn, setSelectedLocation, playNarration } = useTourism();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const [mapSearch, setMapSearch] = useState('');
  const [mapCategory, setMapCategory] = useState('all');
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);

  const baseLocations = isAdminLoggedIn ? locations : publicLocations;

  // Filter locations based on search and category
  const filteredLocations = baseLocations.filter(loc => {
    const matchesCategory = mapCategory === 'all' || loc.category === mapCategory;
    const matchesSearch = 
      loc.name.toLowerCase().includes(mapSearch.toLowerCase()) ||
      loc.area.toLowerCase().includes(mapSearch.toLowerCase()) ||
      loc.categoryLabel.toLowerCase().includes(mapSearch.toLowerCase()) ||
      (loc.code && loc.code.toLowerCase().includes(mapSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Vĩnh Long center (~10.15° N, 106.1° E)
    const map = L.map(mapContainerRef.current, {
      center: [10.15, 106.1],
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when locations or filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    const bounds = L.latLngBounds([]);

    filteredLocations.forEach(loc => {
      if (!loc.coordinates?.lat || !loc.coordinates?.lng) return;

      const latLng = L.latLng(loc.coordinates.lat, loc.coordinates.lng);
      bounds.extend(latLng);

      // Create custom SVG HTML marker pin with category icon color
      const getPinColor = () => {
        switch (loc.category) {
          case 'historic': return '#b91c1c'; // Red
          case 'culture': return '#d97706'; // Amber
          case 'eco': return '#059669'; // Emerald
          case 'coastal': return '#0284c7'; // Blue
          case 'craft': return '#ea580c'; // Orange
          default: return '#4f46e5';
        }
      };

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${getPinColor()};
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            cursor: pointer;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 14px;
              font-weight: bold;
            ">★</div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34],
      });

      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates.lat},${loc.coordinates.lng}`;

      const popupHtml = `
        <div style="width: 260px; font-family: system-ui, sans-serif;">
          <div style="position: relative; height: 130px; width: 100%; overflow: hidden; background: #292524;">
            <img src="${loc.imageUrl}" alt="${loc.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; bottom: 6px; left: 8px; color: #fff; font-size: 11px; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
              ${loc.categoryLabel}
            </div>
          </div>
          <div style="padding: 12px;">
            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #1c1917; line-height: 1.3;">
              ${loc.name}
            </h4>
            <p style="margin: 0 0 10px 0; font-size: 11px; color: #78716c;">
              ${loc.area}
            </p>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button id="btn-detail-${loc.id}" style="
                background: #059669; color: white; border: none; border-radius: 6px;
                padding: 6px 10px; font-size: 12px; font-weight: 600; cursor: pointer; text-align: center;
              ">
                Xem chi tiết & Học tập
              </button>
              <div style="display: flex; gap: 6px;">
                <button id="btn-audio-${loc.id}" style="
                  flex: 1; background: #f5f5f4; color: #1c1917; border: 1px solid #e7e5e4;
                  border-radius: 6px; padding: 5px; font-size: 11px; font-weight: 600; cursor: pointer;
                ">
                  🔊 Thuyết minh
                </button>
                <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="
                  flex: 1; background: #f5f5f4; color: #0284c7; border: 1px solid #e7e5e4;
                  border-radius: 6px; padding: 5px; font-size: 11px; font-weight: 600; text-align: center; text-decoration: none;
                ">
                  🧭 Chỉ đường
                </a>
              </div>
            </div>
          </div>
        </div>
      `;

      const marker = L.marker(latLng, { icon: customIcon }).addTo(map);
      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        setActiveLocationId(loc.id);
        setTimeout(() => {
          const detailBtn = document.getElementById(`btn-detail-${loc.id}`);
          if (detailBtn) {
            detailBtn.onclick = () => setSelectedLocation(loc);
          }
          const audioBtn = document.getElementById(`btn-audio-${loc.id}`);
          if (audioBtn) {
            audioBtn.onclick = () => playNarration(loc);
          }
        }, 50);
      });

      markersRef.current[loc.id] = marker;
    });

    if (filteredLocations.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  }, [filteredLocations]);

  // Pan to selected location from list
  const focusOnLocation = (loc: LocationItem) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView([loc.coordinates.lat, loc.coordinates.lng], 13, { animate: true });
    const marker = markersRef.current[loc.id];
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
      {/* Top Filter and Search Bar (§1.A, §1.B) */}
      <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Bản đồ Du lịch Vĩnh Long Thông minh
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Định vị tọa độ thực tế di tích lịch sử, thắng cảnh văn hóa và làng nghề trên nền bản đồ số OpenStreetMap
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              placeholder="Tìm kiếm địa điểm trên bản đồ..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Filters: functional segmented buttons (§1.A) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {CATEGORIES_CONFIG.map(cat => (
            <button
              key={cat.key}
              onClick={() => setMapCategory(cat.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                mapCategory === cat.key
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout Container */}
      <div className="grid lg:grid-cols-12 min-h-[550px] relative">
        {/* Left Side: Interactive Location Quick List */}
        <div className="lg:col-span-4 border-r border-stone-200 bg-white max-h-[550px] overflow-y-auto divide-y divide-stone-100">
          <div className="p-3 bg-stone-100/60 text-xs font-semibold text-stone-600 flex items-center justify-between">
            <span>Danh sách địa điểm ({filteredLocations.length})</span>
            <span className="text-[11px] text-stone-500 font-normal">Bấm để định vị</span>
          </div>

          {filteredLocations.map(loc => (
            <div
              key={loc.id}
              onClick={() => focusOnLocation(loc)}
              className={`p-3.5 hover:bg-emerald-50/50 cursor-pointer transition-colors flex gap-3 ${
                activeLocationId === loc.id ? 'bg-emerald-50 border-l-4 border-emerald-600' : ''
              }`}
            >
              <img
                src={loc.imageUrl}
                alt={loc.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-200"
              />
              <div className="min-w-0 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-emerald-700 font-medium truncate">
                    {loc.categoryLabel}
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                    {loc.name}
                  </h4>
                  <div className="text-[11px] text-stone-500 truncate">
                    {loc.area}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-stone-400 font-mono">
                    {loc.coordinates.lat.toFixed(4)}, {loc.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredLocations.length === 0 && (
            <div className="p-8 text-center text-xs text-stone-500">
              Không tìm thấy địa điểm nào phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>

        {/* Right Side: Leaflet Map Viewport */}
        <div className="lg:col-span-8 min-h-[400px] lg:min-h-[550px] relative">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Quick Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-stone-200 shadow-md text-[11px] space-y-1">
            <div className="font-semibold text-stone-800">Chú giải ký hiệu:</div>
            <div className="flex items-center gap-2 text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Di tích lịch sử
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Văn hóa Khmer/Tâm linh
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Miệt vườn sinh thái
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Du lịch biển
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
