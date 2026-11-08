export type CategoryKey = 
  | 'historic'
  | 'culture'
  | 'eco'
  | 'coastal'
  | 'craft'
  | 'community';

export type RegionKey = 
  | 'Vĩnh Long'
  | 'Trà Vinh (trước đây)'
  | 'Bến Tre (trước đây)'
  | string;

export type LocationStatus = 'published' | 'draft';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
}

export interface ExperienceTask {
  id: string;
  title: string;
  description: string;
  type: 'observe' | 'history' | 'culture' | 'photo' | 'environment' | 'reflection';
  promptTip: string;
}

export interface LocationSource {
  title: string;
  url?: string;
  author?: string;
  verifiedDate: string;
  editorName?: string;
  reviewStatus?: 'Đã kiểm chứng' | 'Chờ xác minh' | 'Đã kiểm duyệt';
}

export interface MultilingualScripts {
  vi: string;
  en?: string;
  km?: string; // Khmer
}

export interface LocationItem {
  id: string;
  code: string; // Auto generated e.g. 'VL-PH-001'
  name: string;
  area: RegionKey;
  category: CategoryKey;
  categoryLabel: string;
  status: LocationStatus; // 'published' | 'draft'
  isFeatured?: boolean;
  shortDescription: string;
  fullDescription: string;
  history: string;
  culturalValue: string;
  highlights?: string[];
  experiences: string[];
  visitorGuide: string;
  visitingHours?: string;
  visitingDuration?: string;
  ticketPrice?: string;
  visitorNotes?: string;
  environmentalNotes: string;
  sources: LocationSource;
  verifiedDate: string;
  verifiedStatus: 'Đã kiểm chứng' | 'Chờ xác minh';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  imageUrl: string;
  galleryUrls?: string[];
  imageCredit?: string;
  audioScript: string;
  multilingualScripts?: MultilingualScripts;
  quizzes: QuizQuestion[];
  tasks: ExperienceTask[];
}

export interface ProjectInfo {
  projectName: string;
  englishName: string;
  competition: string;
  schoolYear: string;
  schoolUnit: string;
  students: string[];
  mentorTeacher: string;
  motivation: string;
  researchGoal: string;
  practicalProblem: string;
  proposedSolution: string;
  innovations: string[];
  technologies: string[];
  tourismImpact: string;
  educationImpact: string;
}

export interface UserQuizProgress {
  [locationId: string]: {
    score: number;
    total: number;
    completedAt: string;
    answers: { [questionId: string]: number };
  };
}

export interface AdminUser {
  username: string;
  fullName: string;
  role: 'admin' | 'editor';
  token: string;
  loginAt: string;
}
