import React, { useState } from 'react';
import { useTourism } from '../context/TourismContext';
import { ProjectInfo } from '../types/tourism';
import { 
  Award, BookOpen, Lightbulb, Cpu, Users, School, 
  CheckCircle2, Compass, Heart, Edit3, Save, RotateCcw, Share2 
} from 'lucide-react';

export const ProjectInfoView: React.FC = () => {
  const { projectInfo, updateProjectInfo } = useTourism();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProjectInfo>(projectInfo);

  const handleSave = () => {
    updateProjectInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Exhibition Header (§3 Pattern A of museum_editorial) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1">
              Báo cáo khoa học kỹ thuật cấp tỉnh · Năm học 2026 – 2027
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
              {projectInfo.projectName}
            </h1>
            <p className="text-sm font-serif italic text-stone-500 mt-1">
              {projectInfo.englishName}
            </p>
          </div>

          <button
            onClick={() => {
              if (isEditing) handleSave();
              else {
                setFormData(projectInfo);
                setIsEditing(true);
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu thông tin</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Chỉnh sửa thông tin dự thi</span>
              </>
            )}
          </button>
        </div>

        {/* Member and Mentor Credit Strip */}
        <div className="grid sm:grid-cols-3 gap-6 pt-6">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <School className="w-4 h-4 text-emerald-600" />
              Đơn vị dự thi
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.schoolUnit}
                onChange={(e) => setFormData({ ...formData, schoolUnit: e.target.value })}
                className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
              />
            ) : (
              <div className="text-sm font-semibold text-stone-900">
                {projectInfo.schoolUnit}
              </div>
            )}
            <div className="text-xs text-stone-500 mt-0.5">{projectInfo.competition}</div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Học sinh thực hiện
            </div>
            {isEditing ? (
              <textarea
                rows={2}
                value={formData.students.join('\n')}
                onChange={(e) => setFormData({ ...formData, students: e.target.value.split('\n') })}
                className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
              />
            ) : (
              <ul className="text-xs sm:text-sm font-medium text-stone-800 space-y-1">
                {projectInfo.students.map((student, i) => (
                  <li key={i}>{student}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Giáo viên hướng dẫn
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.mentorTeacher}
                onChange={(e) => setFormData({ ...formData, mentorTeacher: e.target.value })}
                className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
              />
            ) : (
              <div className="text-sm font-semibold text-stone-900">
                {projectInfo.mentorTeacher}
              </div>
            )}
            <div className="text-xs text-stone-500 mt-0.5">{projectInfo.schoolYear}</div>
          </div>
        </div>
      </div>

      {/* Structured Proposal Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 1. Lý do chọn đề tài */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 font-serif font-bold text-lg mb-3">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            1. Lý do chọn đề tài
          </div>
          <p className="text-stone-700 text-sm leading-relaxed text-justify">
            {projectInfo.motivation}
          </p>
        </section>

        {/* 2. Vấn đề thực tiễn & Mục tiêu */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 font-serif font-bold text-lg mb-3">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            2. Vấn đề thực tiễn & Mục tiêu
          </div>
          <div className="space-y-3 text-sm text-stone-700 leading-relaxed text-justify">
            <p>
              <strong>Vấn đề thực tiễn:</strong> {projectInfo.practicalProblem}
            </p>
            <p>
              <strong>Mục tiêu nghiên cứu:</strong> {projectInfo.researchGoal}
            </p>
          </div>
        </section>
      </div>

      {/* 3. Điểm mới và Tính sáng tạo */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2.5 text-emerald-800 font-serif font-bold text-xl mb-4">
          <Compass className="w-5 h-5 text-emerald-600" />
          3. Điểm mới và Tính sáng tạo của đề tài
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {projectInfo.innovations.map((item, index) => (
            <div key={index} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Công nghệ sử dụng */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2.5 text-emerald-800 font-serif font-bold text-xl mb-4">
          <Cpu className="w-5 h-5 text-emerald-600" />
          4. Công nghệ và Kiến trúc Hệ thống
        </div>

        <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-700">
          {projectInfo.technologies.map((tech, idx) => (
            <li key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Ý nghĩa đối với Du lịch & Giáo dục địa phương */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50/60 p-6 sm:p-8 rounded-3xl border border-emerald-200/80">
          <h3 className="text-base font-serif font-bold text-emerald-950 mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            Ý nghĩa đối với Du lịch địa phương
          </h3>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
            {projectInfo.tourismImpact}
          </p>
        </section>

        <section className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200/80">
          <h3 className="text-base font-serif font-bold text-amber-950 mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-700" />
            Ý nghĩa đối với Giáo dục truyền thống quê hương
          </h3>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
            {projectInfo.educationImpact}
          </p>
        </section>
      </div>
    </div>
  );
};
