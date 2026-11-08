import React, { useState } from 'react';
import { useTourism } from '../context/TourismContext';
import { LocationItem, QuizQuestion, ExperienceTask, CategoryKey, RegionKey, LocationStatus } from '../types/tourism';
import { CATEGORIES_CONFIG, REGIONS_CONFIG } from '../data/initialLocations';
import { 
  Shield, Plus, Search, Edit2, Trash2, Copy, Eye, EyeOff, 
  Download, Upload, RotateCcw, CheckCircle2, AlertTriangle, 
  Volume2, VolumeX, Sparkles, X, Save, Image as ImageIcon, 
  MapPin, BookOpen, Layers, Check, Database, ExternalLink, LogOut, ChevronRight
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    locations,
    adminUser,
    logoutAdmin,
    addLocation,
    updateLocation,
    deleteLocation,
    togglePublishStatus,
    duplicateLocation,
    autoGenerateCode,
    exportDatabaseJson,
    importDatabaseJson,
    resetToDefaultDatabase,
    setSelectedLocation,
  } = useTourism();

  // Filters state
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'content' | 'images' | 'tts' | 'source' | 'quizzes'>('basic');
  const [formData, setFormData] = useState<LocationItem | null>(null);

  // Audio test state inside form
  const [isTestingAudio, setIsTestingAudio] = useState(false);

  // Delete confirmation modal state
  const [locationToDelete, setLocationToDelete] = useState<LocationItem | null>(null);

  // Notice & Firebase guide modal state
  const [notice, setNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [showFirebaseGuide, setShowFirebaseGuide] = useState(false);

  // Statistics
  const totalCount = locations.length;
  const publishedCount = locations.filter(l => l.status === 'published').length;
  const draftCount = locations.filter(l => l.status === 'draft').length;
  const featuredCount = locations.filter(l => l.isFeatured).length;

  // Filtered rows for admin table
  const filteredRows = locations.filter(loc => {
    const matchSearch =
      loc.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
      (loc.code && loc.code.toLowerCase().includes(filterSearch.toLowerCase())) ||
      loc.address.toLowerCase().includes(filterSearch.toLowerCase());
    const matchCategory = filterCategory === 'all' || loc.category === filterCategory;
    const matchRegion = filterRegion === 'all' || filterRegion === 'Tất cả khu vực' || loc.area.includes(filterRegion);
    const matchStatus = filterStatus === 'all' || loc.status === filterStatus;
    return matchSearch && matchCategory && matchRegion && matchStatus;
  });

  // Open Add New Location Form
  const handleOpenAddNew = () => {
    const generatedId = 'loc-' + Date.now();
    const newLocation: LocationItem = {
      id: generatedId,
      code: autoGenerateCode('Địa điểm mới', 'historic'),
      name: '',
      area: 'Vĩnh Long',
      category: 'historic',
      categoryLabel: 'Di tích lịch sử',
      status: 'published',
      isFeatured: false,
      shortDescription: '',
      fullDescription: '',
      history: '',
      culturalValue: '',
      highlights: ['Điểm đến hấp dẫn', 'Bảo tồn di sản'],
      experiences: ['Dạo bước tham quan và chụp ảnh lưu niệm'],
      visitorGuide: 'Trang phục chỉnh tề, giữ gìn vệ sinh chung.',
      visitingHours: '07:30 – 17:00 hằng ngày',
      visitingDuration: '60 – 90 phút',
      ticketPrice: 'Miễn phí vào cổng',
      visitorNotes: 'Liên hệ trước nếu đi theo đoàn học sinh đông người.',
      environmentalNotes: 'Tuyệt đối không xả rác bừa bãi, bảo vệ cây xanh và cảnh quan.',
      sources: {
        title: 'Cổng thông tin Du lịch Vĩnh Long',
        url: 'https://vinhlongtourist.vn',
        author: 'Ban Biên tập Địa phương',
        editorName: adminUser?.fullName || 'Quản trị viên',
        verifiedDate: new Date().toISOString().slice(0, 10),
        reviewStatus: 'Đã kiểm duyệt',
      },
      verifiedDate: new Date().toISOString().slice(0, 10),
      verifiedStatus: 'Đã kiểm chứng',
      coordinates: {
        lat: 10.25,
        lng: 105.97,
      },
      address: 'Tỉnh Vĩnh Long',
      imageUrl: '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg',
      galleryUrls: [
        '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg',
      ],
      imageCredit: 'Ban Quản trị & Nhiếp ảnh gia',
      audioScript: 'Kính chào quý khách! Mời quý khách tìm hiểu điểm đến du lịch đặc sắc của quê hương Vĩnh Long...',
      multilingualScripts: {
        vi: 'Kính chào quý khách! Mời quý khách tìm hiểu điểm đến du lịch đặc sắc của quê hương Vĩnh Long...',
        en: 'Welcome visitors to explore this remarkable destination in Vinh Long!',
        km: 'សូមស្វាគមន៍ភ្ញៀវទេសចរមកកាន់គោលដៅទេសចរណ៍ពិសេសនៃខេត្តវិញឡុង!'
      },
      quizzes: [
        {
          id: 'q-' + Date.now(),
          question: 'Ý nghĩa quan trọng nhất của địa danh này là gì?',
          options: [
            'Bảo tồn và lan tỏa giá trị di sản địa phương',
            'Xây dựng trung tâm thương mại',
            'Phát triển công nghiệp nặng',
            'Khu vui chơi hiện đại'
          ],
          correctAnswer: 0,
          explanation: 'Địa danh góp phần bồi đắp lòng tự hào quê hương và phát triển du lịch bền vững.'
        }
      ],
      tasks: [
        {
          id: 't-' + Date.now(),
          title: 'Khảo sát và ghi chép thực tế',
          description: 'Ghi lại những nét đặc sắc về kiến trúc hoặc cảnh quan thiên nhiên tại địa điểm.',
          type: 'observe',
          promptTip: 'Ghi chép cẩn thận vào sổ tay học tập.'
        }
      ]
    };

    setFormData(newLocation);
    setIsCreatingNew(true);
    setActiveFormTab('basic');
    setIsEditorOpen(true);
  };

  // Open Edit Location Form
  const handleOpenEdit = (loc: LocationItem) => {
    setFormData(JSON.parse(JSON.stringify(loc)));
    setIsCreatingNew(false);
    setActiveFormTab('basic');
    setIsEditorOpen(true);
  };

  // Save Location (Add or Update)
  const handleSaveForm = async () => {
    if (!formData) return;
    if (!formData.name.trim()) {
      setFormError('Vui lòng nhập tên địa điểm trước khi lưu!');
      setActiveFormTab('basic');
      return;
    }

    if (isTestingAudio) {
      window.speechSynthesis?.cancel();
      setIsTestingAudio(false);
    }

    if (isCreatingNew) {
      await addLocation(formData);
      setNotice(`Đã thêm thành công địa điểm mới "${formData.name}" vào hệ thống.`);
    } else {
      await updateLocation(formData);
      setNotice(`Đã cập nhật thông tin địa điểm "${formData.name}".`);
    }

    setIsEditorOpen(false);
    setFormData(null);
    setFormError(null);
  };

  // Delete handler with modal confirmation
  const handleConfirmDelete = async () => {
    if (!locationToDelete) return;
    await deleteLocation(locationToDelete.id);
    setNotice(`Đã xóa địa điểm "${locationToDelete.name}" khỏi hệ thống.`);
    setLocationToDelete(null);
  };

  // Audio test handler using Web Speech API
  const handleTestAudio = () => {
    if (!('speechSynthesis' in window)) {
      setFormError('Trình duyệt chưa hỗ trợ Web Speech API.');
      return;
    }

    if (isTestingAudio) {
      window.speechSynthesis.cancel();
      setIsTestingAudio(false);
      return;
    }

    if (!formData?.audioScript) {
      setFormError('Vui lòng nhập kịch bản thuyết minh tiếng Việt trước khi nghe thử!');
      return;
    }

    setFormError(null);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(formData.audioScript);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;

    utterance.onend = () => setIsTestingAudio(false);
    utterance.onerror = () => setIsTestingAudio(false);

    setIsTestingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // Image file upload handler for avatar
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData({
        ...formData,
        imageUrl: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  // Image file upload for gallery
  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !formData) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setFormData(prev => {
          if (!prev) return prev;
          const currentGallery = prev.galleryUrls || [];
          return {
            ...prev,
            galleryUrls: [...currentGallery, dataUrl],
          };
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (index: number) => {
    if (!formData) return;
    const currentGallery = formData.galleryUrls || [];
    setFormData({
      ...formData,
      galleryUrls: currentGallery.filter((_, i) => i !== index),
    });
  };

  // JSON Import
  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const success = await importDatabaseJson(content);
      if (success) {
        setNotice('Đã nhập dữ liệu JSON và đồng bộ toàn bộ địa điểm thành công!');
      } else {
        setNotice('Lỗi: Tệp JSON không đúng định dạng chuẩn của Du Lịch Vĩnh Long.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8">
      {/* CMS Dashboard Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
              <Shield className="w-4 h-4 text-emerald-600" />
              Hệ Thống Quản Trị Nội Dung Động (CMS)
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Quản Lý Địa Điểm Du Lịch Vĩnh Long
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Thêm mới không giới hạn, cập nhật kịch bản thuyết minh AI, tọa độ bản đồ và câu hỏi giáo dục địa phương
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddNew}
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>THÊM ĐỊA ĐIỂM DU LỊCH</span>
            </button>

            <button
              onClick={() => setShowFirebaseGuide(true)}
              className="px-3.5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              title="Hướng dẫn cấu hình Firebase / Supabase trực tuyến"
            >
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Kết nối Online</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Real Statistical Dashboard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
              {totalCount}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">Tổng số địa điểm</div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="text-2xl font-bold font-mono text-emerald-800 tabular-nums">
              {publishedCount}
            </div>
            <div className="text-xs text-emerald-700 mt-0.5">Công khai (Hiển thị)</div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-2xl font-bold font-mono text-amber-800 tabular-nums">
              {draftCount}
            </div>
            <div className="text-xs text-amber-700 mt-0.5">Bản nháp (Đang ẩn)</div>
          </div>

          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
            <div className="text-2xl font-bold font-mono text-teal-800 tabular-nums">
              {featuredCount}
            </div>
            <div className="text-xs text-teal-700 mt-0.5">Địa điểm nổi bật</div>
          </div>
        </div>
      </div>

      {notice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Tìm theo tên, mã địa điểm..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Region Filter */}
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {REGIONS_CONFIG.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {CATEGORIES_CONFIG.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterStatus('published')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === 'published' ? 'bg-white text-emerald-800 font-semibold shadow-xs' : 'text-stone-600'
              }`}
            >
              Công khai
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === 'draft' ? 'bg-white text-amber-800 font-semibold shadow-xs' : 'text-stone-600'
              }`}
            >
              Bản nháp
            </button>
          </div>
        </div>

        {/* Database Utilities Bar: Export, Import, Reset */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            Đang hiển thị <strong>{filteredRows.length}</strong> / {totalCount} địa điểm trong hệ thống
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportDatabaseJson}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất JSON sao lưu</span>
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Nhập JSON</span>
              <input type="file" accept=".json" onChange={handleJsonUpload} className="hidden" />
            </label>

            <button
              onClick={() => {
                if (confirm('Khôi phục lại toàn bộ dữ liệu kiểm chứng mẫu ban đầu?')) {
                  resetToDefaultDatabase();
                  setNotice('Đã khôi phục dữ liệu gốc.');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 rounded-lg font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại gốc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Location Management Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold w-12 text-center">STT</th>
                <th className="py-3.5 px-4 font-semibold w-20">Ảnh</th>
                <th className="py-3.5 px-4 font-semibold">Tên địa điểm & Mã</th>
                <th className="py-3.5 px-4 font-semibold">Nhóm du lịch</th>
                <th className="py-3.5 px-4 font-semibold">Khu vực</th>
                <th className="py-3.5 px-4 font-semibold">Ngày cập nhật</th>
                <th className="py-3.5 px-4 font-semibold">Trạng thái</th>
                <th className="py-3.5 px-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRows.map((loc, index) => (
                <tr key={loc.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono text-stone-500">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <img
                      src={loc.imageUrl}
                      alt={loc.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-11 rounded-lg object-cover bg-stone-200 shrink-0"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-900 text-sm">{loc.name}</div>
                    <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                      {loc.code || loc.id}
                      {loc.isFeatured && (
                        <span className="ml-2 text-emerald-700 font-medium font-sans">
                          ★ Nổi bật
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-stone-800">{loc.categoryLabel}</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {loc.area}
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 font-mono">
                    {loc.verifiedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublishStatus(loc.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        loc.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                      title="Bấm để chuyển trạng thái Công khai / Bản nháp"
                    >
                      {loc.status === 'published' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Công khai</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-amber-600" />
                          <span>Bản nháp</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedLocation(loc)}
                        title="Xem chi tiết"
                        className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(loc)}
                        title="Chỉnh sửa địa điểm"
                        className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => duplicateLocation(loc.id)}
                        title="Nhân bản / Sao chép địa điểm"
                        className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setLocationToDelete(loc)}
                        title="Xóa địa điểm"
                        className="p-1.5 rounded-lg text-rose-600 hover:text-rose-900 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-stone-500">
                    Không tìm thấy địa điểm nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {locationToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
              Xác nhận xóa địa điểm du lịch
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
              Bạn có chắc chắn muốn xóa địa điểm <strong>"{locationToDelete.name}"</strong> (Mã: {locationToDelete.code || locationToDelete.id}) không? Thao tác này sẽ gỡ bỏ địa điểm khỏi danh sách du lịch, bản đồ và các bài trắc nghiệm liên quan.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setLocationToDelete(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Dynamic CMS Form Modal */}
      {isEditorOpen && formData && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
                  {isCreatingNew ? 'Thêm Địa Điểm Du Lịch Mới' : 'Chỉnh Sửa Địa Điểm Du Lịch'}
                </div>
                <h2 className="text-lg font-serif font-bold text-white">
                  {formData.name || 'Địa điểm chưa đặt tên'}
                </h2>
              </div>
              <button
                onClick={() => {
                  if (isTestingAudio) window.speechSynthesis?.cancel();
                  setIsEditorOpen(false);
                }}
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Section Tabs */}
            <div className="bg-stone-100 px-6 pt-2 border-b border-stone-200 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0 text-xs font-medium">
              <button
                onClick={() => setActiveFormTab('basic')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors shrink-0 ${
                  activeFormTab === 'basic'
                    ? 'bg-white text-emerald-800 font-bold border-t-2 border-emerald-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                A. Thông tin cơ bản
              </button>
              <button
                onClick={() => setActiveFormTab('content')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors shrink-0 ${
                  activeFormTab === 'content'
                    ? 'bg-white text-emerald-800 font-bold border-t-2 border-emerald-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                B. Nội dung chi tiết
              </button>
              <button
                onClick={() => setActiveFormTab('images')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors shrink-0 ${
                  activeFormTab === 'images'
                    ? 'bg-white text-emerald-800 font-bold border-t-2 border-emerald-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                C. Quản lý hình ảnh
              </button>
              <button
                onClick={() => setActiveFormTab('tts')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors shrink-0 ${
                  activeFormTab === 'tts'
                    ? 'bg-white text-emerald-800 font-bold border-t-2 border-emerald-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                D. Thuyết minh AI
              </button>
              <button
                onClick={() => setActiveFormTab('source')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors shrink-0 ${
                  activeFormTab === 'source'
                    ? 'bg-white text-emerald-800 font-bold border-t-2 border-emerald-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                E. Nguồn & Thẩm định
              </button>
              <button
                onClick={() => setActiveFormTab('quizzes')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors shrink-0 ${
                  activeFormTab === 'quizzes'
                    ? 'bg-white text-emerald-800 font-bold border-t-2 border-emerald-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                F. Góc học tập ({formData.quizzes?.length || 0})
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs text-stone-800">
              {formError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span className="font-semibold">{formError}</span>
                  </div>
                  <button
                    onClick={() => setFormError(null)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* TAB A: THÔNG TIN CƠ BẢN */}
              {activeFormTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Tên địa điểm (*):</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setFormData({
                            ...formData,
                            name: newName,
                            code: isCreatingNew && (!formData.code || formData.code.startsWith('VL-')) 
                              ? autoGenerateCode(newName, formData.category) 
                              : formData.code,
                          });
                        }}
                        placeholder="Ví dụ: Khu lưu niệm Phạm Hùng..."
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Mã địa điểm tự động:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                          className="flex-1 p-2.5 bg-stone-100 border border-stone-300 rounded-xl font-mono text-[11px]"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, code: autoGenerateCode(formData.name || 'Mới', formData.category) })}
                          className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl font-semibold"
                        >
                          Tạo lại mã
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Nhóm du lịch:</label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          const catKey = e.target.value as CategoryKey;
                          const catObj = CATEGORIES_CONFIG.find(c => c.key === catKey);
                          setFormData({
                            ...formData,
                            category: catKey,
                            categoryLabel: catObj ? catObj.label : 'Di tích',
                          });
                        }}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      >
                        {CATEGORIES_CONFIG.filter(c => c.key !== 'all').map(c => (
                          <option key={c.key} value={c.key}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Khu vực hành chính:</label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      >
                        <option value="Vĩnh Long">Vĩnh Long</option>
                        <option value="Trà Vinh (trước đây)">Trà Vinh (trước đây)</option>
                        <option value="Bến Tre (trước đây)">Bến Tre (trước đây)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Trạng thái hiển thị:</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as LocationStatus })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold"
                      >
                        <option value="published">Công khai (Hiển thị ngay trên website)</option>
                        <option value="draft">Bản nháp (Tạm ẩn khỏi khách truy cập)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Địa chỉ thực tế hiện tại:</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      placeholder="Xã/Phường, Huyện/Thị xã, Tỉnh..."
                    />
                  </div>

                  {/* GPS Coordinates */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                    <label className="block font-semibold text-stone-800 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Tọa độ GPS (Vĩ độ - Latitude / Kinh độ - Longitude) để hiển thị trên Bản đồ số:
                    </label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] text-stone-500">Vĩ độ (Lat):</span>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.coordinates?.lat || 10.25}
                          onChange={(e) => setFormData({
                            ...formData,
                            coordinates: { ...formData.coordinates, lat: parseFloat(e.target.value) || 0 }
                          })}
                          className="w-full p-2 bg-white border border-stone-300 rounded-lg font-mono text-xs mt-1"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-stone-500">Kinh độ (Lng):</span>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.coordinates?.lng || 105.97}
                          onChange={(e) => setFormData({
                            ...formData,
                            coordinates: { ...formData.coordinates, lng: parseFloat(e.target.value) || 0 }
                          })}
                          className="w-full p-2 bg-white border border-stone-300 rounded-lg font-mono text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mô tả ngắn (hiển thị trên thẻ địa điểm):</label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Mô tả súc tích từ 1-2 câu tóm tắt điểm đặc sắc nhất..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={Boolean(formData.isFeatured)}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-semibold text-stone-700 cursor-pointer">
                      Đánh dấu là Địa điểm Nổi bật (Ưu tiên hiển thị trên Banner và Trang chủ)
                    </label>
                  </div>
                </div>
              )}

              {/* TAB B: NỘI DUNG CHI TIẾT */}
              {activeFormTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Giới thiệu tổng quan:</label>
                    <textarea
                      rows={3}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Lịch sử hình thành & bối cảnh:</label>
                    <textarea
                      rows={3}
                      value={formData.history}
                      onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Giá trị văn hóa, lịch sử hoặc sinh thái:</label>
                    <textarea
                      rows={3}
                      value={formData.culturalValue}
                      onChange={(e) => setFormData({ ...formData, culturalValue: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs leading-relaxed"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Giờ mở cửa tham quan:</label>
                      <input
                        type="text"
                        value={formData.visitingHours || ''}
                        onChange={(e) => setFormData({ ...formData, visitingHours: e.target.value })}
                        placeholder="07:30 – 17:00..."
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Thời gian tham quan gợi ý:</label>
                      <input
                        type="text"
                        value={formData.visitingDuration || ''}
                        onChange={(e) => setFormData({ ...formData, visitingDuration: e.target.value })}
                        placeholder="60 – 90 phút..."
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Thông tin giá vé:</label>
                      <input
                        type="text"
                        value={formData.ticketPrice || ''}
                        onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                        placeholder="Miễn phí hoặc giá vé chính thức..."
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Hướng dẫn & Lưu ý dành cho du khách:</label>
                    <textarea
                      rows={2}
                      value={formData.visitorGuide}
                      onChange={(e) => setFormData({ ...formData, visitorGuide: e.target.value })}
                      placeholder="Quy định trang phục, thắp hương, giữ trật tự..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                    />
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <label className="block font-semibold text-emerald-950 mb-1">
                      Nội dung giáo dục bảo vệ môi trường:
                    </label>
                    <textarea
                      rows={2}
                      value={formData.environmentalNotes}
                      onChange={(e) => setFormData({ ...formData, environmentalNotes: e.target.value })}
                      placeholder="Hướng dẫn không xả rác thải nhựa, bảo vệ cảnh quan di tích..."
                      className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs text-emerald-950"
                    />
                  </div>
                </div>
              )}

              {/* TAB C: QUẢN LÝ HÌNH ẢNH */}
              {activeFormTab === 'images' && (
                <div className="space-y-6">
                  {/* Main Avatar Image */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                    <label className="block font-bold text-stone-900 mb-2">Ảnh đại diện chính:</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-40 h-28 bg-stone-200 rounded-xl overflow-hidden shrink-0 border border-stone-300">
                        <img
                          src={formData.imageUrl}
                          alt="Xem trước ảnh đại diện"
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.src = '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg')}
                        />
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          placeholder="Nhập đường dẫn URL ảnh hoặc tải từ máy..."
                          className="w-full p-2 bg-white border border-stone-300 rounded-lg font-mono text-[11px]"
                        />
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold cursor-pointer">
                            <span>Tải ảnh từ máy tính / điện thoại</span>
                            <input type="file" accept="image/*" onChange={handleAvatarFileUpload} className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Multiple Gallery Images */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-bold text-stone-900">
                        Thư viện ảnh ({formData.galleryUrls?.length || 0}):
                      </label>
                      <label className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold cursor-pointer">
                        <span>+ Thêm nhiều ảnh vào thư viện</span>
                        <input type="file" accept="image/*" multiple onChange={handleGalleryFileUpload} className="hidden" />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {formData.galleryUrls?.map((imgUrl, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden aspect-4/3 bg-stone-200 border">
                          <img src={imgUrl} alt={`Ảnh ${i}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(i)}
                            className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-full opacity-80 group-hover:opacity-100 hover:bg-rose-700 cursor-pointer"
                            title="Xóa ảnh này"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Ghi nguồn và quyền sử dụng hình ảnh:</label>
                    <input
                      type="text"
                      value={formData.imageCredit || ''}
                      onChange={(e) => setFormData({ ...formData, imageCredit: e.target.value })}
                      placeholder="Ví dụ: Sở VHTTDL tỉnh Vĩnh Long, tư liệu chụp thực địa..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB D: THUYẾT MINH AI */}
              {activeFormTab === 'tts' && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <label className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                        <Volume2 className="w-4 h-4 text-emerald-700" />
                        Kịch bản Thuyết minh tiếng Việt (AI Voice Script):
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleTestAudio}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isTestingAudio
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-emerald-700 text-white hover:bg-emerald-800'
                          }`}
                        >
                          {isTestingAudio ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              <span>Dừng nghe thử</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>NGHE THỬ THUYẾT MINH</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={5}
                      value={formData.audioScript}
                      onChange={(e) => setFormData({ ...formData, audioScript: e.target.value })}
                      placeholder="Kính chào quý khách! Mời quý khách tìm hiểu..."
                      className="w-full p-3 bg-white border border-emerald-300 rounded-xl text-xs leading-relaxed text-stone-900"
                    />
                    <div className="text-[11px] text-emerald-800 mt-1">
                      * Nhấn "NGHE THỬ THUYẾT MINH" để hệ thống tự động đọc thử kịch bản bằng giọng nói tiếng Việt chuẩn.
                    </div>
                  </div>

                  {/* Future Multilingual Script Slots */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Kịch bản tiếng Anh (tùy chọn):</label>
                      <textarea
                        rows={3}
                        value={formData.multilingualScripts?.en || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          multilingualScripts: { ...formData.multilingualScripts, vi: formData.audioScript, en: e.target.value }
                        })}
                        placeholder="Welcome visitors to explore..."
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Kịch bản tiếng Khmer (tùy chọn):</label>
                      <textarea
                        rows={3}
                        value={formData.multilingualScripts?.km || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          multilingualScripts: { ...formData.multilingualScripts, vi: formData.audioScript, km: e.target.value }
                        })}
                        placeholder="សូមស្វាគមន៍ភ្ញៀវទេសចរ..."
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB E: NGUỒN TÀI LIỆU & THẨM ĐỊNH */}
              {activeFormTab === 'source' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Tên nguồn tài liệu / cơ quan ban hành:</label>
                      <input
                        type="text"
                        value={formData.sources?.title || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          sources: { ...formData.sources, title: e.target.value }
                        })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                        placeholder="Sở VHTTDL tỉnh Vĩnh Long, Bảo tàng Vĩnh Long..."
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Đường dẫn liên kết nguồn (URL):</label>
                      <input
                        type="text"
                        value={formData.sources?.url || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          sources: { ...formData.sources, url: e.target.value }
                        })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono"
                        placeholder="https://vinhlong.gov.vn..."
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Người biên tập / Người thẩm định:</label>
                      <input
                        type="text"
                        value={formData.sources?.editorName || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          sources: { ...formData.sources, editorName: e.target.value }
                        })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Ngày kiểm chứng (YYYY-MM-DD):</label>
                      <input
                        type="date"
                        value={formData.verifiedDate}
                        onChange={(e) => setFormData({
                          ...formData,
                          verifiedDate: e.target.value,
                          sources: { ...formData.sources, verifiedDate: e.target.value }
                        })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Trạng thái kiểm duyệt:</label>
                      <select
                        value={formData.sources?.reviewStatus || 'Đã kiểm duyệt'}
                        onChange={(e) => setFormData({
                          ...formData,
                          sources: { ...formData.sources, reviewStatus: e.target.value as any }
                        })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold"
                      >
                        <option value="Đã kiểm duyệt">Đã kiểm duyệt (Chính thức)</option>
                        <option value="Chờ xác minh">Chờ xác minh thực địa</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB F: GÓC HỌC TẬP (TRẮC NGHIỆM & NHIỆM VỤ) */}
              {activeFormTab === 'quizzes' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-stone-900 text-sm">
                      Ngân hàng câu hỏi trắc nghiệm giáo dục địa phương ({formData.quizzes?.length || 0}):
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newQuiz: QuizQuestion = {
                          id: 'q-' + Date.now(),
                          question: 'Nội dung câu hỏi mới...',
                          options: ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
                          correctAnswer: 0,
                          explanation: 'Giải thích tại sao phương án này là chính xác...'
                        };
                        setFormData({
                          ...formData,
                          quizzes: [...(formData.quizzes || []), newQuiz]
                        });
                      }}
                      className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      + Thêm câu hỏi
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.quizzes?.map((quiz, qIdx) => (
                      <div key={quiz.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-emerald-800">Câu {qIdx + 1}:</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                quizzes: formData.quizzes.filter((_, i) => i !== qIdx)
                              });
                            }}
                            className="text-rose-600 hover:text-rose-800 text-xs font-semibold cursor-pointer"
                          >
                            Xóa câu này
                          </button>
                        </div>

                        <input
                          type="text"
                          value={quiz.question}
                          onChange={(e) => {
                            const updated = [...formData.quizzes];
                            updated[qIdx].question = e.target.value;
                            setFormData({ ...formData, quizzes: updated });
                          }}
                          placeholder="Nhập nội dung câu hỏi..."
                          className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs"
                        />

                        {/* 4 Options */}
                        <div className="grid sm:grid-cols-2 gap-2">
                          {quiz.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${quiz.id}`}
                                checked={quiz.correctAnswer === optIdx}
                                onChange={() => {
                                  const updated = [...formData.quizzes];
                                  updated[qIdx].correctAnswer = optIdx;
                                  setFormData({ ...formData, quizzes: updated });
                                }}
                                className="accent-emerald-600"
                                title="Đánh dấu đáp án đúng"
                              />
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const updated = [...formData.quizzes];
                                  updated[qIdx].options[optIdx] = e.target.value;
                                  setFormData({ ...formData, quizzes: updated });
                                }}
                                className="flex-1 p-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                                placeholder={`Đáp án ${String.fromCharCode(65 + optIdx)}`}
                              />
                            </div>
                          ))}
                        </div>

                        <input
                          type="text"
                          value={quiz.explanation}
                          onChange={(e) => {
                            const updated = [...formData.quizzes];
                            updated[qIdx].explanation = e.target.value;
                            setFormData({ ...formData, quizzes: updated });
                          }}
                          placeholder="Lời giải thích vì sao đáp án đúng..."
                          className="w-full p-2 bg-stone-100 border border-stone-200 rounded-lg text-xs italic"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Toolbar */}
            <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex items-center justify-between shrink-0">
              <span className="text-xs text-stone-500 hidden sm:inline">
                * Dữ liệu sau khi lưu sẽ đồng bộ ngay lập tức trên bản đồ, danh sách và giọng đọc AI.
              </span>
              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (isTestingAudio) window.speechSynthesis?.cancel();
                    setIsEditorOpen(false);
                  }}
                  className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleSaveForm}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>LƯU ĐỊA ĐIỂM</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Online Cloud Database Guide Modal (Firebase & Supabase) */}
      {showFirebaseGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto text-xs text-stone-800 space-y-4">
            <button
              onClick={() => setShowFirebaseGuide(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-2">
              <Database className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-serif font-bold text-stone-900">
              Hướng dẫn Cấu hình Cơ sở dữ liệu Trực tuyến (Online Cloud)
            </h3>

            <p className="text-stone-600 leading-relaxed">
              Hệ thống hiện tại đang sử dụng kiến trúc dữ liệu lai (Hybrid Architecture) gồm: <strong>REST API server-side</strong> tự động lưu vào tệp dữ liệu trên máy chủ, kết hợp <strong>LocalStorage</strong> dự phòng khi xuất bản lên GitHub Pages tĩnh.
            </p>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="font-bold text-emerald-950 text-sm">
                1. Cách tạo tài khoản Quản trị viên đầu tiên:
              </div>
              <ul className="list-disc pl-5 space-y-1 text-emerald-900">
                <li>Tài khoản mặc định: <code>admin</code></li>
                <li>Mật khẩu mặc định: <code>vinhlong2026</code></li>
                <li>Có thể tùy biến thông qua biến môi trường <code>ADMIN_USERNAME</code> và <code>ADMIN_PASSWORD</code> trên server.</li>
              </ul>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 text-sm">
                2. Nâng cấp lưu trữ Firebase Firestore / Supabase:
              </div>
              <p className="leading-relaxed">
                Khi triển khai thực tế trên Internet cho toàn bộ các trường THCS trong tỉnh cùng truy cập:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-stone-700">
                <li>Tạo một dự án tại Firebase Console hoặc Supabase Dashboard.</li>
                <li>Bật Firestore Database hoặc Postgres Database.</li>
                <li>Cấu hình phân quyền bảo mật: Cho phép <code>read</code> công khai đối với các bản ghi có <code>status == 'published'</code>, và chỉ cho phép <code>write</code> đối với người dùng đã xác thực (Admin).</li>
                <li>Sao lưu và di chuyển dữ liệu bất kỳ lúc nào bằng tính năng <strong>"Xuất JSON"</strong> và <strong>"Nhập JSON"</strong> có sẵn trong bảng điều khiển này.</li>
              </ol>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFirebaseGuide(false)}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-xl font-semibold"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
