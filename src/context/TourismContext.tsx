import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { LocationItem, QuizQuestion, ProjectInfo, UserQuizProgress, AdminUser } from '../types/tourism';
import { INITIAL_LOCATIONS, INITIAL_PROJECT_INFO } from '../data/initialLocations';

interface TourismContextType {
  // Location collections
  locations: LocationItem[]; // All locations (including drafts if admin)
  publicLocations: LocationItem[]; // Only published locations for regular visitors
  featuredLocations: LocationItem[];
  projectInfo: ProjectInfo;
  
  // Navigation & Filtering
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLocation: LocationItem | null;
  setSelectedLocation: (loc: LocationItem | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Voice narration player state
  currentVoiceLocation: LocationItem | null;
  isPlaying: boolean;
  isPaused: boolean;
  speechRate: number;
  speechVolume: number;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  currentSentence: string;
  sentenceIndex: number;
  totalSentences: number;
  playNarration: (location: LocationItem) => void;
  pauseNarration: () => void;
  resumeNarration: () => void;
  stopNarration: () => void;
  replayNarration: () => void;
  setSpeechRate: (rate: number) => void;
  setSpeechVolume: (volume: number) => void;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;

  // QR Modal
  qrLocation: LocationItem | null;
  setQrLocation: (loc: LocationItem | null) => void;

  // Learning progress
  quizProgress: UserQuizProgress;
  saveQuizResult: (locationId: string, score: number, total: number, answers: { [key: string]: number }) => void;

  // Authentication & Access Control (RBAC)
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;

  // Dynamic CMS Location Management
  addLocation: (loc: LocationItem) => Promise<boolean>;
  updateLocation: (loc: LocationItem) => Promise<boolean>;
  deleteLocation: (id: string) => Promise<boolean>;
  togglePublishStatus: (id: string) => Promise<boolean>;
  duplicateLocation: (id: string) => Promise<boolean>;
  autoGenerateCode: (name: string, category: string) => string;

  // Database tools
  exportDatabaseJson: () => void;
  importDatabaseJson: (jsonString: string) => Promise<boolean>;
  resetToDefaultDatabase: () => void;
  updateProjectInfo: (info: ProjectInfo) => void;
}

const TourismContext = createContext<TourismContextType | undefined>(undefined);

const STORAGE_KEY_LOCATIONS = 'vinhlong_smart_tourism_locations_v2';
const STORAGE_KEY_PROJECT = 'vinhlong_smart_tourism_project_v2';
const STORAGE_KEY_QUIZ = 'vinhlong_smart_tourism_quiz_v2';
const STORAGE_KEY_AUTH = 'vinhlong_smart_tourism_auth_v2';

export const TourismProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.token) return parsed;
      }
    } catch (e) {
      console.warn('Lỗi đọc auth từ localStorage:', e);
    }
    return null;
  });

  const isAdminLoggedIn = Boolean(adminUser && adminUser.token);

  // Locations State
  const [locations, setLocations] = useState<LocationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOCATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Lỗi nạp dữ liệu từ localStorage:', e);
    }
    return INITIAL_LOCATIONS;
  });

  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Lỗi nạp thông tin dự án:', e);
    }
    return INITIAL_PROJECT_INFO;
  });

  const [quizProgress, setQuizProgress] = useState<UserQuizProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUIZ);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Lỗi nạp tiến độ trắc nghiệm:', e);
    }
    return {};
  });

  // Navigation & Filter state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [qrLocation, setQrLocation] = useState<LocationItem | null>(null);

  // Voice narration player state
  const [currentVoiceLocation, setCurrentVoiceLocation] = useState<LocationItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechVolume, setSpeechVolume] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [totalSentences, setTotalSentences] = useState<number>(0);

  const sentencesRef = useRef<string[]>([]);
  const currentSentenceIdxRef = useRef<number>(0);
  const isCancelledRef = useRef<boolean>(false);

  // Sync with backend API on mount if available
  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.locations) && data.locations.length > 0) {
          setLocations(data.locations);
          localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(data.locations));
        }
      })
      .catch(() => {
        // Silently use localStorage fallback for offline / static mode
      });
  }, []);

  // Listen to hash changes (for QR codes and direct links e.g. #/place/ao-ba-om, #/admin/login)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/place/')) {
        const placeId = hash.replace('#/place/', '').trim();
        const found = locations.find(l => l.id === placeId || l.code === placeId);
        if (found) {
          setSelectedLocation(found);
          setActiveTab('places');
        }
      } else if (hash === '#/admin' || hash === '#/admin/login') {
        setActiveTab('admin');
      } else if (hash.startsWith('#/')) {
        const tab = hash.replace('#/', '');
        if (['home', 'places', 'map', 'tts', 'learning', 'chat', 'project', 'admin'].includes(tab)) {
          setActiveTab(tab);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [locations]);

  // Save locations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(locations));
    } catch (e) {
      console.error('Không thể lưu locations:', e);
    }
  }, [locations]);

  // Save projectInfo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECT, JSON.stringify(projectInfo));
    } catch (e) {
      console.error('Không thể lưu projectInfo:', e);
    }
  }, [projectInfo]);

  // Save quizProgress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUIZ, JSON.stringify(quizProgress));
    } catch (e) {
      console.error('Không thể lưu quizProgress:', e);
    }
  }, [quizProgress]);

  // Derived: Public locations (only published ones for regular visitors)
  const publicLocations = useMemo(() => {
    return locations.filter(l => l.status === 'published');
  }, [locations]);

  // Derived: Featured locations
  const featuredLocations = useMemo(() => {
    const published = locations.filter(l => l.status === 'published');
    const featured = published.filter(l => l.isFeatured);
    return featured.length > 0 ? featured : published;
  }, [locations]);

  // Helper to persist locations to both server API and state
  const persistLocations = async (newLocations: LocationItem[]) => {
    setLocations(newLocations);
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(newLocations));

    if (adminUser?.token) {
      try {
        await fetch('/api/locations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminUser.token}`,
          },
          body: JSON.stringify({ locations: newLocations }),
        });
      } catch (err) {
        console.warn('Lưu API server không thành công, dữ liệu đã được lưu an toàn tại localStorage:', err);
      }
    }
  };

  // Auto generate location code
  const autoGenerateCode = (name: string, category: string): string => {
    const catPrefix = category.slice(0, 3).toUpperCase();
    const cleanName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 4)
      .toUpperCase();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    return `VL-${catPrefix || 'LOC'}-${cleanName || 'SITE'}-${randomSuffix}`;
  };

  // Login handler
  const loginAdmin = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        const userObj: AdminUser = {
          username: data.user.username,
          fullName: data.user.fullName,
          role: data.user.role || 'admin',
          token: data.token,
          loginAt: new Date().toISOString(),
        };
        setAdminUser(userObj);
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(userObj));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Đăng nhập không thành công.' };
      }
    } catch (e) {
      // Local fallback check if server API is unavailable
      if (username === 'admin' && (password === 'vinhlong2026' || password === 'admin')) {
        const userObj: AdminUser = {
          username: 'admin',
          fullName: 'Quản trị viên Hệ thống Du Lịch Vĩnh Long (Offline Mode)',
          role: 'admin',
          token: 'vl_adm_token_local_' + Date.now(),
          loginAt: new Date().toISOString(),
        };
        setAdminUser(userObj);
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(userObj));
        return { success: true };
      }
      return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' };
    }
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  // Dynamic CMS Methods
  const addLocation = async (newLoc: LocationItem): Promise<boolean> => {
    if (!isAdminLoggedIn) return false;
    const updated = [newLoc, ...locations];
    await persistLocations(updated);
    return true;
  };

  const updateLocation = async (updatedLoc: LocationItem): Promise<boolean> => {
    if (!isAdminLoggedIn) return false;
    const updated = locations.map(l => (l.id === updatedLoc.id ? updatedLoc : l));
    await persistLocations(updated);
    if (selectedLocation?.id === updatedLoc.id) setSelectedLocation(updatedLoc);
    if (currentVoiceLocation?.id === updatedLoc.id) setCurrentVoiceLocation(updatedLoc);
    return true;
  };

  const deleteLocation = async (id: string): Promise<boolean> => {
    if (!isAdminLoggedIn) return false;
    const updated = locations.filter(l => l.id !== id);
    await persistLocations(updated);
    if (selectedLocation?.id === id) setSelectedLocation(null);
    if (currentVoiceLocation?.id === id) stopNarration();
    return true;
  };

  const togglePublishStatus = async (id: string): Promise<boolean> => {
    if (!isAdminLoggedIn) return false;
    const updated = locations.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status: (l.status === 'published' ? 'draft' : 'published') as 'published' | 'draft',
        };
      }
      return l;
    });
    await persistLocations(updated);
    return true;
  };

  const duplicateLocation = async (id: string): Promise<boolean> => {
    if (!isAdminLoggedIn) return false;
    const origin = locations.find(l => l.id === id);
    if (!origin) return false;

    const cloned: LocationItem = {
      ...origin,
      id: `${origin.id}-copy-${Date.now().toString().slice(-4)}`,
      code: `${origin.code}-COPY`,
      name: `${origin.name} (Bản sao)`,
      status: 'draft',
      isFeatured: false,
      verifiedDate: new Date().toISOString().slice(0, 10),
    };

    const updated = [cloned, ...locations];
    await persistLocations(updated);
    return true;
  };

  // Load available speech synthesis voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        const viVoice = voices.find(v => v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn'));
        if (viVoice && !selectedVoice) {
          setSelectedVoice(viVoice);
        }
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoice]);

  // Split audio script into natural sentences
  const splitSentences = (text: string): string[] => {
    return text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  const playSentenceAtIndex = (index: number) => {
    if (isCancelledRef.current) return;
    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt của bạn hiện chưa hỗ trợ Web Speech Synthesis API.');
      return;
    }

    const sentences = sentencesRef.current;
    if (index >= sentences.length) {
      setIsPlaying(false);
      setIsPaused(false);
      currentSentenceIdxRef.current = 0;
      setSentenceIndex(0);
      setCurrentSentence('');
      return;
    }

    currentSentenceIdxRef.current = index;
    setSentenceIndex(index);
    setCurrentSentence(sentences[index]);

    const utterance = new SpeechSynthesisUtterance(sentences[index]);
    utterance.rate = speechRate;
    utterance.volume = speechVolume;
    utterance.lang = 'vi-VN';

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      if (!isCancelledRef.current && isPlaying) {
        playSentenceAtIndex(index + 1);
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesisUtterance error:', e);
      if (!isCancelledRef.current && isPlaying && index + 1 < sentences.length) {
        playSentenceAtIndex(index + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const playNarration = (location: LocationItem) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt không hỗ trợ Web Speech API.');
      return;
    }

    window.speechSynthesis.cancel();
    isCancelledRef.current = false;

    const sentences = splitSentences(location.audioScript);
    sentencesRef.current = sentences;
    setTotalSentences(sentences.length);
    setCurrentVoiceLocation(location);
    setIsPlaying(true);
    setIsPaused(false);

    playSentenceAtIndex(0);
  };

  const pauseNarration = () => {
    if ('speechSynthesis' in window && isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeNarration = () => {
    if ('speechSynthesis' in window && isPlaying && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopNarration = () => {
    isCancelledRef.current = true;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    currentSentenceIdxRef.current = 0;
    setSentenceIndex(0);
    setCurrentSentence('');
  };

  const replayNarration = () => {
    if (currentVoiceLocation) {
      stopNarration();
      setTimeout(() => {
        playNarration(currentVoiceLocation);
      }, 100);
    }
  };

  const saveQuizResult = (locationId: string, score: number, total: number, answers: { [key: string]: number }) => {
    setQuizProgress(prev => ({
      ...prev,
      [locationId]: {
        score,
        total,
        completedAt: new Date().toISOString(),
        answers,
      },
    }));
  };

  const exportDatabaseJson = () => {
    const data = {
      project: projectInfo,
      locations: locations,
      exportDate: new Date().toISOString(),
      version: '2.0-cms',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `du-lich-vinh-long-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDatabaseJson = async (jsonString: string): Promise<boolean> => {
    try {
      const data = JSON.parse(jsonString);
      if (data && Array.isArray(data.locations) && data.locations.length > 0) {
        await persistLocations(data.locations);
        if (data.project) setProjectInfo(data.project);
        return true;
      }
    } catch (e) {
      console.error('Lỗi nhập tệp JSON:', e);
    }
    return false;
  };

  const resetToDefaultDatabase = () => {
    persistLocations(INITIAL_LOCATIONS);
    setProjectInfo(INITIAL_PROJECT_INFO);
    setQuizProgress({});
    localStorage.removeItem(STORAGE_KEY_QUIZ);
  };

  const updateProjectInfo = (info: ProjectInfo) => {
    setProjectInfo(info);
  };

  return (
    <TourismContext.Provider
      value={{
        locations,
        publicLocations,
        featuredLocations,
        projectInfo,
        activeTab,
        setActiveTab,
        selectedLocation,
        setSelectedLocation,
        selectedCategory,
        setSelectedCategory,
        selectedRegion,
        setSelectedRegion,
        searchQuery,
        setSearchQuery,
        currentVoiceLocation,
        isPlaying,
        isPaused,
        speechRate,
        speechVolume,
        availableVoices,
        selectedVoice,
        currentSentence,
        sentenceIndex,
        totalSentences,
        playNarration,
        pauseNarration,
        resumeNarration,
        stopNarration,
        replayNarration,
        setSpeechRate,
        setSpeechVolume,
        setSelectedVoice,
        qrLocation,
        setQrLocation,
        quizProgress,
        saveQuizResult,
        adminUser,
        isAdminLoggedIn,
        loginAdmin,
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
        updateProjectInfo,
      }}
    >
      {children}
    </TourismContext.Provider>
  );
};

export const useTourism = () => {
  const context = useContext(TourismContext);
  if (!context) {
    throw new Error('useTourism must be used within a TourismProvider');
  }
  return context;
};
