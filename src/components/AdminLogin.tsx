import React, { useState } from 'react';
import { useTourism } from '../context/TourismContext';
import { Lock, Shield, Eye, EyeOff, LogIn, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setActiveTab } = useTourism();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginAdmin(username, password);
      if (!result.success) {
        setError(result.error || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
      }
    } catch (err: any) {
      setError('Đã xảy ra lỗi khi kết nối máy chủ xác thực.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
        <button
          onClick={() => {
            setActiveTab('home');
            window.location.hash = '#/home';
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Cổng Quản Trị Viên (CMS)
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Đăng nhập tài khoản quản trị để thêm mới, cập nhật và quản lý địa điểm du lịch Vĩnh Long
          </p>
        </div>

        {/* Security Role Notice */}
        <div className="p-3.5 mb-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-1">
          <div className="font-semibold flex items-center gap-1.5 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Hệ thống phân quyền an toàn (RBAC):
          </div>
          <p className="text-[11px] leading-relaxed text-emerald-900">
            Khách tham quan chỉ được xem dữ liệu công khai. Chỉ tài khoản Quản trị viên sau khi xác thực thành công mới có quyền thêm không giới hạn địa điểm, biên tập kịch bản thuyết minh và xuất/sao lưu dữ liệu.
          </p>
          <div className="pt-1.5 border-t border-emerald-200/60 font-mono text-[11px] text-emerald-800">
            Tài khoản thử nghiệm: <strong>admin</strong> / Mật khẩu: <strong>vinhlong2026</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Tên tài khoản quản trị:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Mật khẩu:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Đang xác thực...' : 'ĐĂNG NHẬP VÀO BẢNG ĐIỀU KHIỂN'}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-[11px] text-stone-400">
          Hội thi Khoa học Kỹ thuật THCS 2026–2027 · Phân hệ CMS Du lịch Vĩnh Long
        </div>
      </div>
    </div>
  );
};
