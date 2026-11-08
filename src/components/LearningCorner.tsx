import React, { useState } from 'react';
import { useTourism } from '../context/TourismContext';
import { LocationItem, QuizQuestion } from '../types/tourism';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, CheckCircle2, XCircle, RotateCcw, Award, 
  HelpCircle, ClipboardList, BookOpen, Sparkles, Check, ArrowRight, Eye, Leaf, FileText
} from 'lucide-react';

export const LearningCorner: React.FC = () => {
  const { locations, publicLocations, isAdminLoggedIn, quizProgress, saveQuizResult } = useTourism();
  const baseLocations = isAdminLoggedIn ? locations : publicLocations;

  // Active location selected for quiz/tasks
  const [selectedLocationId, setSelectedLocationId] = useState<string>(baseLocations[0]?.id || '');
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'tasks'>('quiz');

  // Quiz state for the selected location
  const currentLocation = baseLocations.find(l => l.id === selectedLocationId) || baseLocations[0];
  const questions: QuizQuestion[] = currentLocation?.quizzes || [];

  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizNotice, setQuizNotice] = useState<string | null>(null);

  // Check if current user has saved quiz progress
  const savedProgress = quizProgress[currentLocation?.id];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setQuizNotice(null);
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleCheckAnswers = () => {
    if (Object.keys(userAnswers).length === 0) {
      setQuizNotice('Em vui lòng chọn ít nhất một đáp án trước khi bấm kiểm tra nhé!');
      return;
    }

    if (questions.length === 0) return;
    setQuizNotice(null);
    setIsSubmitted(true);

    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scoreOutOfTen = Math.round((correctCount / questions.length) * 10 * 10) / 10;
    saveQuizResult(currentLocation.id, correctCount, questions.length, userAnswers);

    // Trigger confetti if high score
    if (correctCount >= Math.ceil(questions.length * 0.8)) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleLocationChange = (locId: string) => {
    setSelectedLocationId(locId);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  // Score calculation for active submission
  let activeScore = 0;
  if (isSubmitted) {
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) activeScore++;
    });
  }

  const getScoreFeedback = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) return { title: 'Xuất sắc! Điểm tuyệt đối!', comment: 'Em có kiến thức lịch sử và văn hóa địa phương rất vững vàng và sâu sắc. Tiếp tục phát huy nhé!' };
    if (ratio >= 0.8) return { title: 'Rất giỏi!', comment: 'Em đã nắm vững phần lớn các nội dung trọng tâm về địa phương. Hãy tìm hiểu thêm một vài chi tiết nhỏ để hoàn thiện kiến thức.' };
    if (ratio >= 0.5) return { title: 'Đạt yêu cầu!', comment: 'Em đã hiểu được các nét cơ bản. Hãy nghe lại bài thuyết minh AI để củng cố thêm những điểm thú vị nhé.' };
    return { title: 'Cần cố gắng hơn!', comment: 'Đừng nản lòng nhé! Em hãy dành ít phút đọc lại phần giới thiệu và nghe bài thuyết minh tự động để làm lại bài đạt điểm cao hơn.' };
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
            <GraduationCap className="w-5 h-5 text-emerald-300" />
            Phân hệ Giáo dục Địa phương – Dành cho Học sinh THCS & Giáo viên
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-3">
            Góc Học Tập & Trải Nghiệm Lịch Sử
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
            Kiểm tra hiểu biết lịch sử – văn hóa địa phương qua hệ thống trắc nghiệm tương tác và thực hiện các nhiệm vụ trải nghiệm học đường bổ ích gắn liền với từng địa danh quê hương Vĩnh Long.
          </p>
        </div>
      </div>

      {/* Location Selector Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
            Chọn chủ đề địa điểm học tập:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {baseLocations.map(loc => (
              <button
                key={loc.id}
                onClick={() => handleLocationChange(loc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedLocationId === loc.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-tab Switcher: Trắc nghiệm vs Nhiệm vụ */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'quiz' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Trắc nghiệm kiến thức ({questions.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('tasks')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'tasks' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            <span>Nhiệm vụ trải nghiệm ({currentLocation?.tasks?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Main Content: Quiz Tab or Tasks Tab */}
      {activeSubTab === 'quiz' ? (
        <div className="space-y-6">
          {/* Quiz Summary Result Card (when submitted) */}
          {isSubmitted && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Award className="w-9 h-9" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                      Kết quả hoàn thành
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                      {getScoreFeedback(activeScore, questions.length).title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">
                      {getScoreFeedback(activeScore, questions.length).comment}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-stone-200 sm:pl-6 shrink-0">
                  <div className="text-3xl font-bold font-mono text-emerald-700 tabular-nums">
                    {activeScore} / {questions.length}
                  </div>
                  <div className="text-xs text-stone-500">
                    Điểm số: {((activeScore / questions.length) * 10).toFixed(1)} / 10.0
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-2">
                <span className="text-xs text-stone-500">
                  Tiến độ làm bài đã được tự động lưu trên thiết bị của em.
                </span>
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài trắc nghiệm</span>
                </button>
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-5">
            {questions.map((q, qIndex) => {
              const selectedOption = userAnswers[q.id];
              const isAnswered = selectedOption !== undefined;
              const isCorrect = isSubmitted && selectedOption === q.correctAnswer;
              const isWrong = isSubmitted && isAnswered && selectedOption !== q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-300 ring-1 ring-emerald-200'
                        : isWrong
                        ? 'border-rose-300 ring-1 ring-rose-200'
                        : 'border-stone-200'
                      : 'border-stone-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h4 className="text-base font-semibold text-stone-900 leading-snug">
                      <span className="text-emerald-700 mr-2">Câu {qIndex + 1}:</span>
                      {q.question}
                    </h4>

                    {isSubmitted && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Đúng
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            Chưa chính xác
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 4 Options: A, B, C, D */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {q.options.map((option, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                      const isSelected = selectedOption === optIdx;
                      const isCorrectChoice = isSubmitted && optIdx === q.correctAnswer;

                      let btnStyle = 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700';

                      if (isSubmitted) {
                        if (isCorrectChoice) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                        } else if (isSelected && !isCorrectChoice) {
                          btnStyle = 'border-rose-300 bg-rose-50 text-rose-900';
                        } else {
                          btnStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-600';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={isSubmitted}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors cursor-pointer ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700'
                          }`}>
                            {letter}
                          </span>
                          <span className="leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Section */}
                  {isSubmitted && (
                    <div className="mt-4 p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
                      <div className="font-semibold text-emerald-800 mb-1">
                        Giải thích chi tiết:
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
            {questions.length === 0 && (
              <div className="p-10 text-center bg-white rounded-2xl border border-stone-200">
                <p className="text-sm text-stone-600 mb-2">
                  Địa điểm này hiện đang được biên tập ngân hàng câu hỏi trắc nghiệm.
                </p>
                <p className="text-xs text-stone-400">
                  Em hãy chọn các địa điểm như Khu lưu niệm Phạm Hùng, Ao Bà Om hoặc Biển Ba Động để thử sức ngay nhé!
                </p>
              </div>
            )}
          </div>

          {/* Inline Warning Notice */}
          {quizNotice && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
              <span>{quizNotice}</span>
              <button onClick={() => setQuizNotice(null)} className="text-amber-700 font-bold ml-2">×</button>
            </div>
          )}

          {/* Bottom Action Bar for Quiz */}
          {!isSubmitted && questions.length > 0 && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleCheckAnswers}
                className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer hover:scale-102"
              >
                KIỂM TRA KẾT QUẢ & CHẤM ĐIỂM
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Tasks Tab: Nhiệm vụ trải nghiệm */
        <div className="space-y-6">
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950">
            <strong>Hướng dẫn dành cho học sinh:</strong> Các nhiệm vụ dưới đây được thiết kế nhằm khuyến khích tinh thần tự học, quan sát thực tế và nâng cao kỹ năng mềm trong các buổi sinh hoạt ngoại khóa hoặc chuyến tham quan thực tế cùng nhà trường.
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {currentLocation?.tasks?.map((task, idx) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-700 mb-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{task.title}</span>
                  </div>

                  <p className="text-sm text-stone-700 leading-relaxed mb-4">
                    {task.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 bg-stone-50/60 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="text-[11px] text-stone-500 italic">
                    <strong>Gợi ý thực hiện:</strong> {task.promptTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
