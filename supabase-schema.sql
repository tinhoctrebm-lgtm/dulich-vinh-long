-- =========================================================================
-- DU LỊCH VĨNH LONG THÔNG MINH - SUPABASE DATABASE SCHEMA
-- Bảng lưu trữ đồng bộ địa điểm du lịch trên Supabase PostgreSQL
-- =========================================================================

-- 1. Tạo bảng locations nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS public.locations (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Kích hoạt tính năng bảo mật cấp hàng (Row Level Security - RLS)
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- 3. Chính sách 1: Cho phép tất cả khách truy cập (anon & authenticated) đọc dữ liệu
DROP POLICY IF EXISTS "Cho phép khách tham quan đọc danh sách địa điểm" ON public.locations;
CREATE POLICY "Cho phép khách tham quan đọc danh sách địa điểm" 
  ON public.locations 
  FOR SELECT 
  USING (true);

-- 4. Chính sách 2: Cho phép máy chủ (Service Role Key) toàn quyền thêm, sửa, xóa
DROP POLICY IF EXISTS "Cho phép máy chủ quản trị ghi và đồng bộ dữ liệu" ON public.locations;
CREATE POLICY "Cho phép máy chủ quản trị ghi và đồng bộ dữ liệu" 
  ON public.locations 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 5. Tạo chỉ mục tìm kiếm trên cột data JSONB để tối ưu hiệu năng
CREATE INDEX IF NOT EXISTS idx_locations_updated_at ON public.locations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_locations_status ON public.locations USING gin ((data -> 'status'));
CREATE INDEX IF NOT EXISTS idx_locations_area ON public.locations USING gin ((data -> 'area'));
