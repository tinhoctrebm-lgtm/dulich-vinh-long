import React from 'react';
import { useTourism } from '../context/TourismContext';
import { Compass, ShieldCheck, Heart, Award, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { projectInfo, setActiveTab } = useTourism();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Project Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                VĨNH LONG SMART TOURISM
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              Sản phẩm dự thi Hội thi Khoa học kỹ thuật cấp tỉnh dành cho học sinh THCS năm học 2026–2027. Ứng dụng công nghệ trí tuệ nhân tạo và chuyển đổi số nhằm bảo tồn di sản, phát triển du lịch thông minh và đổi mới giáo dục địa phương.
            </p>

            <div className="text-xs text-emerald-400 font-medium">
              Đơn vị: {projectInfo.schoolUnit}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Phân hệ Chức năng
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('places')} className="hover:text-emerald-400 transition-colors">
                  Khám phá địa điểm du lịch
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('map')} className="hover:text-emerald-400 transition-colors">
                  Bản đồ số OpenStreetMap
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tts')} className="hover:text-emerald-400 transition-colors">
                  Thuyết minh AI giọng nói tiếng Việt
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learning')} className="hover:text-emerald-400 transition-colors">
                  Góc học tập & Trắc nghiệm lịch sử
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('chat')} className="hover:text-emerald-400 transition-colors">
                  Hỏi đáp Trợ lý Du lịch AI
                </button>
              </li>
            </ul>
          </div>

          {/* Credits & Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Thông tin Nhóm Tác giả
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div>
                <strong className="text-stone-300">Tác giả:</strong>
                <ul className="mt-1 space-y-0.5">
                  {projectInfo.students.map((s, idx) => (
                    <li key={idx} className="text-stone-300">{s}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <strong className="text-stone-300">GV hướng dẫn:</strong> {projectInfo.mentorTeacher}
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                Nguồn tư liệu: Cổng TTĐT tỉnh Vĩnh Long, Bảo tàng Vĩnh Long, Hồ sơ Di tích Cấp Quốc gia.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar without telemetry or status tickers (§1.B) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026–2027 Du Lịch Vĩnh Long Thông Minh · Đề tài KHKT Học sinh THCS
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <button onClick={() => handleNav('project')} className="hover:text-white transition-colors">
              Báo cáo đề tài
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNav('admin')} className="hover:text-white transition-colors">
              Cổng quản trị viên
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
