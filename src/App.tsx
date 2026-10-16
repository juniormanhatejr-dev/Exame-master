import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  GraduationCap,
  CheckCircle2,
  XCircle,
  FileText,
  Play,
  Pause,
  Award,
  User,
  ChevronRight,
  ArrowLeft,
  RotateCcw,
  Search,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  BarChart3,
  SlidersHorizontal,
  Compass,
  Check,
  HelpCircle,
  TrendingUp,
  Target,
  Calculator,
  Volume2,
  Calendar,
  ExternalLink,
  Share2,
  Trash2,
  PlusCircle,
  Sparkles,
  Download,
  File,
  Film,
  UploadCloud,
  ShieldCheck,
  MessageSquare,
  Send
} from 'lucide-react';

import {
  Exam,
  Question,
  StudyManual,
  VideoLesson,
  UserTarget,
  ExamAttemptRecord,
  UserAccount,
  StudentProfile,
  TeacherProfile,
  UserRole,
  TeacherEvaluation,
  AcademicContactMessage
} from './types';

import {
  initialUserTarget,
  initialStudentProfile,
  initialTeacherProfile,
  UNIVERSITIES,
  SUBJECTS,
  EXAMS_LIST,
  STUDY_MANUALS,
  VIDEO_LESSONS,
  INITIAL_ATTEMPTS,
  INITIAL_REGISTERED_ACCOUNTS,
  INITIAL_EVALUATIONS,
  INITIAL_ACADEMIC_MESSAGES
} from './data/mockData';

import { AuthModal } from './components/AuthModal';
import { TeacherDashboard } from './components/TeacherDashboard';

export default function App() {
  // User Account (Student or Teacher) - Persisted in localStorage
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('em_user_account');
      if (saved) return JSON.parse(saved);
      return initialStudentProfile;
    } catch {
      return initialStudentProfile;
    }
  });

  // Modal for Registration & Switching Roles
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole>('student');

  // Navigation tabs
  const [activeNav, setActiveNav] = useState<'dashboard' | 'exams' | 'study_quiz' | 'timed_quiz' | 'manuals' | 'videos' | 'analytics' | 'profile' | 'teacher_panel'>('dashboard');

  // Dynamic Exams List (allows teachers to add questions/exams dynamically)
  const [examsList, setExamsList] = useState<Exam[]>(() => {
    try {
      const saved = localStorage.getItem('em_custom_exams');
      return saved ? JSON.parse(saved) : EXAMS_LIST;
    } catch {
      return EXAMS_LIST;
    }
  });

  // Dynamic Study Manuals (allows teachers to publish study manuals)
  const [studyManualsList, setStudyManualsList] = useState<StudyManual[]>(() => {
    try {
      const saved = localStorage.getItem('em_custom_manuals');
      return saved ? JSON.parse(saved) : STUDY_MANUALS;
    } catch {
      return STUDY_MANUALS;
    }
  });

  // Dynamic Video Lessons (allows teachers to publish and delete video lessons)
  const [videoLessonsList, setVideoLessonsList] = useState<VideoLesson[]>(() => {
    try {
      const saved = localStorage.getItem('em_custom_videos');
      return saved ? JSON.parse(saved) : VIDEO_LESSONS;
    } catch {
      return VIDEO_LESSONS;
    }
  });

  // User target & Profile state (synced with student profile or fallback)
  const [userTarget, setUserTarget] = useState<UserTarget>(() => {
    try {
      const saved = localStorage.getItem('em_user_target');
      return saved ? JSON.parse(saved) : initialUserTarget;
    } catch {
      return initialUserTarget;
    }
  });

  // Save currentUser to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('em_user_account', JSON.stringify(currentUser));
      if (currentUser.role === 'student') {
        setUserTarget({
          name: currentUser.name,
          email: currentUser.email,
          targetUniversity: currentUser.targetUniversity,
          targetCourse: currentUser.targetCourse,
          targetYear: currentUser.targetYear,
          targetCutoffScore: currentUser.targetCutoffScore
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Save exams & manuals
  useEffect(() => {
    try {
      localStorage.setItem('em_custom_exams', JSON.stringify(examsList));
    } catch (e) {
      console.error(e);
    }
  }, [examsList]);

  useEffect(() => {
    try {
      localStorage.setItem('em_custom_manuals', JSON.stringify(studyManualsList));
    } catch (e) {
      console.error(e);
    }
  }, [studyManualsList]);

  useEffect(() => {
    try {
      localStorage.setItem('em_custom_videos', JSON.stringify(videoLessonsList));
    } catch (e) {
      console.error(e);
    }
  }, [videoLessonsList]);

  // Attempt History (persisted and isolated per student)
  const [attempts, setAttempts] = useState<ExamAttemptRecord[]>(() => {
    try {
      const saved = localStorage.getItem('em_attempts');
      return saved ? JSON.parse(saved) : INITIAL_ATTEMPTS;
    } catch {
      return INITIAL_ATTEMPTS;
    }
  });

  // Bookmarked questions IDs (isolated per user)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`em_bookmarks_${currentUser.id}`);
      return saved ? JSON.parse(saved) : ['uem-mat-2024-q1', 'uem-mat-2024-q4'];
    } catch {
      return [];
    }
  });

  // Reload bookmarks when user switches
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`em_bookmarks_${currentUser.id}`);
      setBookmarkedIds(saved ? JSON.parse(saved) : []);
    } catch {
      setBookmarkedIds([]);
    }
  }, [currentUser.id]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('em_user_target', JSON.stringify(userTarget));
    } catch (e) {
      console.error(e);
    }
  }, [userTarget]);

  useEffect(() => {
    try {
      localStorage.setItem('em_attempts', JSON.stringify(attempts));
    } catch (e) {
      console.error(e);
    }
  }, [attempts]);

  useEffect(() => {
    try {
      localStorage.setItem(`em_bookmarks_${currentUser.id}`, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds, currentUser.id]);

  // Selected Exam for active study or simulation
  const [selectedExamId, setSelectedExamId] = useState<string>('uem-mat-2024');
  const currentExam = useMemo(() => {
    return examsList.find(e => e.id === selectedExamId) || examsList[0];
  }, [selectedExamId, examsList]);

  // Exams Filter State
  const [selectedUniversityFilter, setSelectedUniversityFilter] = useState<string>('TODAS');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Study Mode State
  const [studyQuestionIndex, setStudyQuestionIndex] = useState<number>(0);
  const [studySelectedOption, setStudySelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [studySubmitted, setStudySubmitted] = useState<boolean>(false);
  const [studyShowScratchpad, setStudyShowScratchpad] = useState<boolean>(false);
  const [scratchpadNote, setScratchpadNote] = useState<string>('');

  // Timed Simulation State
  const [timedSecondsLeft, setTimedSecondsLeft] = useState<number>(currentExam.durationMinutes * 60);
  const [timedIsRunning, setTimedIsRunning] = useState<boolean>(false);
  const [timedCurrentIdx, setTimedCurrentIdx] = useState<number>(0);
  const [timedAnswers, setTimedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [timedFlagged, setTimedFlagged] = useState<Record<string, boolean>>({});
  const [timedResult, setTimedResult] = useState<ExamAttemptRecord | null>(null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  // Manual Reader State
  const [selectedManualId, setSelectedManualId] = useState<string>('man-mat-01');
  const currentManual = useMemo(() => {
    return studyManualsList.find(m => m.id === selectedManualId) || studyManualsList[0];
  }, [selectedManualId, studyManualsList]);
  const [manualChapterIdx, setManualChapterIdx] = useState<number>(0);

  // Confirmation modal for deletions across pages
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{
    type: 'exam' | 'manual' | 'video';
    id: string;
    title: string;
  } | null>(null);

  // Handlers for Teacher content management (Exams, Manuals, Videos, Questions)
  const handleAddExam = (exam: Exam) => {
    setExamsList(prev => [exam, ...prev]);
    setSelectedExamId(exam.id);
  };

  const handleDeleteExam = (examId: string) => {
    setExamsList(prev => {
      const target = prev.find(ex => ex.id === examId);
      if (target && target.authorId && currentUser.role === 'teacher' && target.authorId !== currentUser.id) {
        alert('Acesso restrito: Você só pode eliminar exames criados pelo seu próprio perfil docente.');
        return prev;
      }
      const updated = prev.filter(ex => ex.id !== examId);
      if (selectedExamId === examId && updated.length > 0) {
        setSelectedExamId(updated[0].id);
      }
      return updated;
    });
  };

  const handleAddQuestionToExam = (examId: string, question: Question) => {
    setExamsList(prev => prev.map(ex => {
      if (ex.id === examId) {
        return {
          ...ex,
          totalQuestions: ex.questions.length + 1,
          questions: [question, ...ex.questions]
        };
      }
      return ex;
    }));
  };

  const handleAddStudyManual = (manual: StudyManual) => {
    setStudyManualsList(prev => [manual, ...prev]);
    setSelectedManualId(manual.id);
    setManualChapterIdx(0);
  };

  const handleDeleteStudyManual = (manualId: string) => {
    setStudyManualsList(prev => {
      const target = prev.find(m => m.id === manualId);
      if (target && target.authorId && currentUser.role === 'teacher' && target.authorId !== currentUser.id) {
        alert('Acesso restrito: Você só pode eliminar manuais criados pelo seu próprio perfil docente.');
        return prev;
      }
      const updated = prev.filter(m => m.id !== manualId);
      if (selectedManualId === manualId && updated.length > 0) {
        setSelectedManualId(updated[0].id);
        setManualChapterIdx(0);
      }
      return updated;
    });
  };

  const handleAddVideoLesson = (video: VideoLesson) => {
    setVideoLessonsList(prev => [video, ...prev]);
    setSelectedVideoId(video.id);
  };

  const handleDeleteVideoLesson = (videoId: string) => {
    setVideoLessonsList(prev => {
      const target = prev.find(v => v.id === videoId);
      if (target && target.authorId && currentUser.role === 'teacher' && target.authorId !== currentUser.id) {
        alert('Acesso restrito: Você só pode eliminar vídeo aulas criadas pelo seu próprio perfil docente.');
        return prev;
      }
      const updated = prev.filter(v => v.id !== videoId);
      if (selectedVideoId === videoId && updated.length > 0) {
        setSelectedVideoId(updated[0].id);
      }
      return updated;
    });
  };

  // Video Lesson State
  const [selectedVideoId, setSelectedVideoId] = useState<string>('video-mat-01');
  const currentVideo = useMemo(() => {
    return videoLessonsList.find(v => v.id === selectedVideoId) || videoLessonsList[0];
  }, [selectedVideoId, videoLessonsList]);
  const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(false);
  const [videoPlaybackRate, setVideoPlaybackRate] = useState<number>(1);

  // Timer countdown hook for timed exam
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (activeNav === 'timed_quiz' && timedIsRunning && timedSecondsLeft > 0) {
      timer = setInterval(() => {
        setTimedSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer!);
            finishTimedExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeNav, timedIsRunning, timedSecondsLeft]);

  // Formatter for time display (MM:SS or HH:MM:SS)
  const formatTime = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hours > 0) {
      return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Bookmark toggle
  const toggleBookmark = (qId: string) => {
    setBookmarkedIds(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  // Launch Study Mode
  const startStudyExam = (exam: Exam) => {
    setSelectedExamId(exam.id);
    setStudyQuestionIndex(0);
    setStudySelectedOption(null);
    setStudySubmitted(false);
    setActiveNav('study_quiz');
  };

  // Launch Timed Exam
  const startTimedExam = (exam: Exam) => {
    setSelectedExamId(exam.id);
    setTimedSecondsLeft(exam.durationMinutes * 60);
    setTimedAnswers({});
    setTimedFlagged({});
    setTimedCurrentIdx(0);
    setTimedResult(null);
    setTimedIsRunning(true);
    setActiveNav('timed_quiz');
  };

  // Finish and compute exam score
  const finishTimedExam = () => {
    setTimedIsRunning(false);
    setShowSubmitConfirmModal(false);

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    currentExam.questions.forEach(q => {
      const ans = timedAnswers[q.id];
      if (!ans) {
        unanswered++;
      } else if (ans === q.correctOption) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = currentExam.questions.length;
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    // Mozambican academic grading scale: 0 to 20 valores
    const scoreValores = Number(((correct / total) * 20).toFixed(1));
    const timeSpent = currentExam.durationMinutes * 60 - timedSecondsLeft;

    const newAttempt: ExamAttemptRecord = {
      id: `attempt-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      examId: currentExam.id,
      examTitle: currentExam.title,
      university: currentExam.university,
      subject: currentExam.subject,
      date: new Date().toLocaleDateString('pt-MZ', { day: '2-digit', month: 'short', year: 'numeric' }),
      score: scoreValores,
      percentage: Number(percentage.toFixed(1)),
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      totalQuestions: total,
      timeSpentSeconds: timeSpent,
      answers: timedAnswers
    };

    setTimedResult(newAttempt);
    setAttempts(prev => [newAttempt, ...prev]);
  };

  // Student-specific isolated attempts (students cannot see each other's grades or performance)
  const studentAttempts = useMemo(() => {
    if (currentUser.role !== 'student') return [];
    return attempts.filter(att => att.studentId === currentUser.id);
  }, [attempts, currentUser.id, currentUser.role]);

  // Computed summary metrics (strictly using active student's records)
  const totalCompletedAttempts = studentAttempts.length;
  const averageScore = totalCompletedAttempts > 0
    ? (studentAttempts.reduce((acc, curr) => acc + curr.score, 0) / totalCompletedAttempts).toFixed(1)
    : '0.0';
  const averagePercentage = totalCompletedAttempts > 0
    ? (studentAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalCompletedAttempts).toFixed(0)
    : '0';

  // Filtered exams catalogue
  const filteredExams = useMemo(() => {
    return examsList.filter(exam => {
      const matchUni = selectedUniversityFilter === 'TODAS' || exam.universityCode === selectedUniversityFilter;
      const matchSub = selectedSubjectFilter === 'TODAS' || exam.subject.toLowerCase() === selectedSubjectFilter.toLowerCase();
      const matchSearch = searchQuery.trim() === '' ||
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchUni && matchSub && matchSearch;
    });
  }, [examsList, selectedUniversityFilter, selectedSubjectFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* ============================================================ */}
      {/* 1. TOP HEADER / APP BAR - DESIGN INSTITUCIONAL LIMPO */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and National Exam Identity */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveNav('dashboard')}>
              <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-300 font-serif font-black text-lg flex items-center justify-center tracking-tighter border border-emerald-950 shadow-xs">
                EM
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-bold text-lg text-emerald-950 tracking-tight">Exame Master</span>
                  <span className="text-stone-400 font-light">·</span>
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Moçambique</span>
                </div>
                <p className="text-[11px] text-stone-500 hidden sm:block">
                  Preparação para Admissão Universitária (UEM · UP · UniZambeze · UJC)
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-medium">
              {[
                { id: 'dashboard', label: 'Painel Geral', icon: Compass },
                { id: 'exams', label: 'Provas Oficiais', icon: BookOpen },
                { id: 'manuals', label: 'Manuais Teóricos', icon: FileText },
                { id: 'videos', label: 'Videoaulas', icon: Play },
                { id: 'analytics', label: 'Desempenho', icon: BarChart3 },
                ...(currentUser.role === 'teacher'
                  ? [{ id: 'teacher_panel', label: 'Painel Docente', icon: Award }]
                  : [])
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id as any)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-emerald-900 text-white font-semibold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Target, Role Switch & Registration Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Cadastrar / Alternar Perfil Button */}
              <button
                onClick={() => {
                  setAuthModalInitialRole(currentUser.role === 'teacher' ? 'student' : 'teacher');
                  setAuthModalOpen(true);
                }}
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-stone-300 hover:border-emerald-700 bg-white hover:bg-stone-50 text-[11px] font-semibold text-stone-700 transition"
                title="Cadastre-se como Aluno ou Professor"
              >
                {currentUser.role === 'student' ? (
                  <>
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Cadastrar Professor</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>Cadastrar Aluno</span>
                  </>
                )}
              </button>

              <div 
                onClick={() => {
                  if (currentUser.role === 'teacher') {
                    setActiveNav('teacher_panel');
                  } else {
                    setActiveNav('profile');
                  }
                }}
                className="cursor-pointer flex items-center space-x-2 py-1 px-2.5 rounded-lg border border-stone-200 hover:border-emerald-700 bg-stone-50/50 hover:bg-stone-50 transition"
              >
                <div className={`w-8 h-8 rounded-full font-semibold flex items-center justify-center text-xs border ${
                  currentUser.role === 'teacher'
                    ? 'bg-amber-100 text-amber-950 border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-stone-800 leading-tight truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm ${
                      currentUser.role === 'teacher'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {currentUser.role === 'teacher' ? 'Prof' : 'Aluno'}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 truncate max-w-[140px]">
                    {currentUser.role === 'teacher' ? (currentUser as TeacherProfile).institution : (currentUser as StudentProfile).targetCourse}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-2 py-1 flex items-center justify-around overflow-x-auto text-[11px]">
          {[
            { id: 'dashboard', label: 'Painel', icon: Compass },
            { id: 'exams', label: 'Exames', icon: BookOpen },
            { id: 'manuals', label: 'Manuais', icon: FileText },
            { id: 'videos', label: 'Aulas', icon: Play },
            ...(currentUser.role === 'teacher' ? [{ id: 'teacher_panel', label: 'Docente', icon: Award }] : []),
            { id: 'analytics', label: 'Métricas', icon: BarChart3 },
            { id: 'profile', label: 'Perfil', icon: User },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id as any)}
              className={`px-2.5 py-1.5 font-medium rounded-md flex items-center space-x-1 ${
                activeNav === item.id ? 'bg-emerald-800 text-white font-semibold' : 'text-stone-600'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setAuthModalInitialRole(currentUser.role === 'teacher' ? 'student' : 'teacher');
              setAuthModalOpen(true);
            }}
            className="px-2 py-1 bg-amber-100 text-amber-950 font-bold rounded-md text-[10px]"
          >
            + Cadastros
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN APPLICATION CONTENT AREA */}
      {/* ============================================================ */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

        {/* ------------------------------------------------------------ */}
        {/* VIEW A: DASHBOARD PRINCIPAL */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Academic Greeting & Goal Banner */}
            <div className="bg-emerald-900 text-white rounded-xl p-6 sm:p-8 shadow-xs border border-emerald-950 relative overflow-hidden">
              <div className="max-w-2xl relative z-10 space-y-4">
                <div className="flex items-center space-x-2 text-xs text-emerald-200 font-medium">
                  <span>{currentUser.role === 'teacher' ? 'Ambiente Pedagógico Docente' : 'Candidatura Universitária'}</span>
                  <span>·</span>
                  <span>Exames de Admissão {currentUser.role === 'teacher' ? '2024 / 2025' : userTarget.targetYear}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                  Bem-vindo, {currentUser.name.split(' ')[0]} {currentUser.role === 'teacher' ? '(Professor)' : ''}
                </h2>
                <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                  {currentUser.role === 'teacher' ? (
                    <>
                      Você está conectado como docente da <strong className="text-amber-300 font-semibold">{(currentUser as TeacherProfile).institution}</strong>. 
                      Utilize o Painel Docente para elaborar novas questões oficiais resolvidas e publicar manuais para orientar milhares de estudantes moçambicanos.
                    </>
                  ) : (
                    <>
                      Seu foco actual é a admissão na <strong className="text-amber-300 font-semibold">{userTarget.targetUniversity}</strong> para o curso de <strong className="text-amber-300 font-semibold">{userTarget.targetCourse}</strong>.
                      Pratique com enunciados oficiais comentados por professores moçambicanos.
                    </>
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {currentUser.role === 'teacher' ? (
                    <>
                      <button
                        onClick={() => setActiveNav('teacher_panel')}
                        className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2.5 rounded-lg text-xs sm:text-sm shadow-xs transition flex items-center space-x-2"
                      >
                        <Award className="w-4 h-4 text-stone-950" />
                        <span>Abrir Painel do Professor</span>
                      </button>
                      <button
                        onClick={() => setActiveNav('exams')}
                        className="bg-emerald-950/70 hover:bg-emerald-950 text-white font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm border border-emerald-700/60 transition flex items-center space-x-2"
                      >
                        <span>Examinar Banco de Provas</span>
                        <ChevronRight className="w-4 h-4 text-emerald-300" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          startStudyExam(examsList[0]);
                        }}
                        className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2.5 rounded-lg text-xs sm:text-sm shadow-xs transition flex items-center space-x-2"
                      >
                        <BookOpen className="w-4 h-4 text-stone-950" />
                        <span>Iniciar Exame Recomendado</span>
                      </button>
                      <button
                        onClick={() => setActiveNav('exams')}
                        className="bg-emerald-950/70 hover:bg-emerald-950 text-white font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm border border-emerald-700/60 transition flex items-center space-x-2"
                      >
                        <span>Ver Todas as Provas Oficiais</span>
                        <ChevronRight className="w-4 h-4 text-emerald-300" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Decorative Subtle Background Stamp */}
              <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none select-none text-white font-serif text-[180px] font-black leading-none">
                UEM
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium">Provas Concluídas</span>
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900">{totalCompletedAttempts}</div>
                <p className="text-[11px] text-stone-500 mt-1">Registradas localmente</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium">Média Obtida</span>
                  <Award className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-serif font-bold text-emerald-800">
                  {averageScore} <span className="text-xs font-sans text-stone-500 font-normal">/ 20</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">{averagePercentage}% de acerto médio</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium">Nota de Corte Meta</span>
                  <Target className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  {userTarget.targetCutoffScore} <span className="text-xs font-sans text-stone-500 font-normal">/ 20</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">Corte histórico de referência</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-medium">Questões Salvas</span>
                  <Bookmark className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900">{bookmarkedIds.length}</div>
                <p className="text-[11px] text-stone-500 mt-1">Marcadas para revisão</p>
              </div>
            </div>

            {/* Two-Column Section: Priority Exams & Topics Requiring Attention */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Exames Oficiais em Destaque */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-stone-900">Provas de Admissão Recentes</h3>
                    <p className="text-xs text-stone-500">Enunciados fiéis aos aplicados pelas comissões universitárias</p>
                  </div>
                  <button
                    onClick={() => setActiveNav('exams')}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center space-x-1"
                  >
                    <span>Ver todas ({examsList.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {examsList.slice(0, 3).map(exam => (
                    <div 
                      key={exam.id}
                      className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-emerald-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="text-xs text-stone-500 flex items-center space-x-2">
                          <span className="font-semibold text-emerald-900">{exam.universityCode}</span>
                          <span>·</span>
                          <span>{exam.subject}</span>
                          <span>·</span>
                          <span>Ano {exam.year}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-stone-900">{exam.title}</h4>
                        <p className="text-xs text-stone-600 line-clamp-1">{exam.description}</p>
                        <div className="text-[11px] text-stone-500 flex items-center space-x-3 pt-1">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            <span>{exam.durationMinutes} minutos</span>
                          </span>
                          <span>·</span>
                          <span>{exam.questions.length} questões com resolução</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 sm:self-center flex-shrink-0">
                        <button
                          onClick={() => startStudyExam(exam)}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition"
                        >
                          Modo Estudo
                        </button>
                        <button
                          onClick={() => startTimedExam(exam)}
                          className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center space-x-1"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Simulado Oficial</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Áreas que requerem atenção & Plano de Estudo */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">Diagnóstico & Revisão</h3>
                  <p className="text-xs text-stone-500">Tópicos com maior incidência de erro nos exames</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
                  {[
                    { topic: 'Logaritmos & Domínio de Funções', sub: 'Matemática · UEM', rate: '58% acerto', rec: 'Ler Manual de Funções Reais' },
                    { topic: 'Equilíbrio Iônico & Cálculo de pH', sub: 'Química · UniZambeze', rate: '62% acerto', rec: 'Resolver 5 questões anteriores' },
                    { topic: 'Orações Subordinadas Concessivas', sub: 'Português · UP', rate: '66% acerto', rec: 'Assistir videoaula do Prof. Sitoe' }
                  ].map((item, idx) => (
                    <div key={idx} className="pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900">{item.topic}</span>
                        <span className="text-amber-700 font-semibold text-[11px]">{item.rate}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{item.sub}</div>
                      <div className="mt-2 text-[11px] bg-stone-50 p-2 rounded text-emerald-900 font-medium flex items-center justify-between">
                        <span>{item.rec}</span>
                        <ChevronRight className="w-3 h-3 text-stone-400" />
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveNav('manuals')}
                      className="w-full text-center text-xs text-emerald-800 hover:text-emerald-950 font-bold py-2 border border-emerald-800/30 rounded-lg hover:bg-emerald-50 transition"
                    >
                      Abrir Manuais Teóricos Completos
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW B: CATÁLOGO DE PROVAS E EXAMES OFICIAIS */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'exams' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Page Header */}
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Repositório Oficial</div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Banco de Exames de Admissão</h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Provas dos anos anteriores digitalizadas, com gabarito oficial e resolução fundamentada por tópicos.
              </p>
            </div>

            {/* Teacher Fast Action Banner */}
            {currentUser.role === 'teacher' && (
              <div className="bg-emerald-900 text-white p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs border border-emerald-950">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-xs sm:text-sm font-semibold">Modo Docente Ativo no Catálogo</strong>
                    <p className="text-[11px] text-emerald-200">Você pode introduzir novos exames oficiais ou gerir e eliminar provas existentes.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveNav('teacher_panel')}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition shrink-0 flex items-center space-x-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Introduzir Novo Exame</span>
                </button>
              </div>
            )}

            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar por disciplina, instituição ou ano..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800 bg-stone-50/50"
                  />
                </div>

                {/* University Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-500 whitespace-nowrap">Universidade:</span>
                  <select
                    value={selectedUniversityFilter}
                    onChange={(e) => setSelectedUniversityFilter(e.target.value)}
                    className="text-xs border border-stone-300 rounded-lg px-2.5 py-2 bg-white focus:outline-hidden focus:border-emerald-800"
                  >
                    <option value="TODAS">Todas as Universidades</option>
                    {UNIVERSITIES.map(u => (
                      <option key={u.code} value={u.code}>{u.code} - {u.name}</option>
                    ))}
                  </select>
                </div>

                {/* Subject Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-500 whitespace-nowrap">Disciplina:</span>
                  <select
                    value={selectedSubjectFilter}
                    onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                    className="text-xs border border-stone-300 rounded-lg px-2.5 py-2 bg-white focus:outline-hidden focus:border-emerald-800"
                  >
                    <option value="TODAS">Todas as Disciplinas</option>
                    {SUBJECTS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exams Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExams.map(exam => (
                <div
                  key={exam.id}
                  className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-emerald-700 transition flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-bold text-emerald-900 tracking-wide">{exam.university} ({exam.universityCode})</span>
                      <span className="font-semibold text-stone-600">Ano {exam.year}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">{exam.title}</h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{exam.description}</p>

                    <div className="pt-2 text-xs text-stone-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>Disciplina: <strong className="text-stone-800">{exam.subject}</strong></span>
                      <span>·</span>
                      <span>Duração: <strong className="text-stone-800">{exam.durationMinutes} min</strong></span>
                      <span>·</span>
                      <span>Questões: <strong className="text-stone-800">{exam.questions.length > 0 ? exam.questions.length : 'Documento Anexo'}</strong></span>
                    </div>

                    {exam.fileMeta && (
                      <div className="mt-2 p-2.5 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 truncate">
                          <File className="w-4 h-4 text-emerald-800 shrink-0" />
                          <span className="font-medium text-stone-800 truncate">{exam.fileMeta.name}</span>
                          <span className="text-stone-400">({exam.fileMeta.size})</span>
                        </div>
                        {exam.fileMeta.url && (
                          <a
                            href={exam.fileMeta.url}
                            download={exam.fileMeta.name}
                            className="text-emerald-800 font-bold hover:underline shrink-0 flex items-center space-x-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Baixar</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-stone-500">
                      Corte Sugerido: <strong className="text-emerald-900 font-semibold">{exam.passingScoreSuggestion}/20</strong>
                    </div>

                    <div className="flex items-center space-x-2">
                      {currentUser.role === 'teacher' && exam.authorId === currentUser.id && (
                        <button
                          onClick={() => setConfirmDeleteModal({ type: 'exam', id: exam.id, title: exam.title })}
                          className="px-2.5 py-2 text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 text-xs font-semibold transition flex items-center space-x-1"
                          title="Eliminar seu exame publicado"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Eliminar Meu Exame</span>
                        </button>
                      )}

                      {exam.fileMeta?.url && exam.questions.length === 0 ? (
                        <a
                          href={exam.fileMeta.url}
                          download={exam.fileMeta.name}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center space-x-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Baixar Arquivo da Prova</span>
                        </a>
                      ) : (
                        <>
                          <button
                            onClick={() => startStudyExam(exam)}
                            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition"
                          >
                            Treino com Gabarito
                          </button>
                          <button
                            onClick={() => startTimedExam(exam)}
                            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center space-x-1.5"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Simulado ⏱</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW C: MODO ESTUDO / RESOLUÇÃO INTERACTIVA COM FEEDBACK */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'study_quiz' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveNav('exams')}
                  className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="text-xs text-stone-500">
                    {currentExam.universityCode} · {currentExam.subject} ({currentExam.year})
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                    Modo Estudo: Questão {studyQuestionIndex + 1} de {currentExam.questions.length}
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStudyShowScratchpad(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center space-x-1.5 transition ${
                    studyShowScratchpad ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-white text-stone-600 border-stone-300'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Rascunho de Contas</span>
                </button>

                <button
                  onClick={() => toggleBookmark(currentExam.questions[studyQuestionIndex].id)}
                  className={`p-2 rounded-lg border transition ${
                    bookmarkedIds.includes(currentExam.questions[studyQuestionIndex].id)
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-white text-stone-400 border-stone-300 hover:text-stone-700'
                  }`}
                  title="Salvar para revisão"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Optional Scratchpad Drawer */}
            {studyShowScratchpad && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                  <span>Bloco de Rascunho / Fórmulas Rápidas</span>
                  <button onClick={() => setScratchpadNote('')} className="text-stone-500 hover:text-stone-800 text-[11px] font-normal">
                    Limpar
                  </button>
                </div>
                <textarea
                  value={scratchpadNote}
                  onChange={(e) => setScratchpadNote(e.target.value)}
                  placeholder="Escreva aqui deduções, passos algébricos ou anotações para resolver a questão..."
                  rows={3}
                  className="w-full text-xs font-mono p-2.5 rounded-lg border border-amber-300 bg-white focus:outline-hidden"
                />
              </div>
            )}

            {/* Question Card */}
            {(() => {
              const q = currentExam.questions[studyQuestionIndex];
              const isCorrect = studySelectedOption === q.correctOption;

              return (
                <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
                  
                  {/* Topic & Metadata */}
                  <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-emerald-950">Tópico: {q.topic}</span>
                    <span className="text-stone-600">Dificuldade: <strong className="text-stone-800">{q.difficulty}</strong></span>
                  </div>

                  {/* Statement */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="font-serif text-base sm:text-lg text-stone-900 leading-relaxed font-normal">
                      {q.statement}
                    </div>

                    {/* Options A, B, C, D */}
                    <div className="space-y-3">
                      {q.options.map(opt => {
                        const isChosen = studySelectedOption === opt.key;
                        const isTargetCorrect = opt.key === q.correctOption;

                        let borderClass = 'border-stone-200 hover:border-stone-400 bg-white';
                        let badgeClass = 'bg-stone-100 text-stone-700';

                        if (studySubmitted) {
                          if (isTargetCorrect) {
                            borderClass = 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600';
                            badgeClass = 'bg-emerald-700 text-white font-bold';
                          } else if (isChosen && !isTargetCorrect) {
                            borderClass = 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-500';
                            badgeClass = 'bg-rose-600 text-white font-bold';
                          } else {
                            borderClass = 'border-stone-200 opacity-60 bg-white';
                          }
                        } else if (isChosen) {
                          borderClass = 'border-emerald-800 bg-emerald-50/40 ring-1 ring-emerald-800';
                          badgeClass = 'bg-emerald-800 text-white font-bold';
                        }

                        return (
                          <div
                            key={opt.key}
                            onClick={() => {
                              if (!studySubmitted) {
                                setStudySelectedOption(opt.key);
                              }
                            }}
                            className={`p-4 rounded-xl border transition cursor-pointer flex items-start space-x-3.5 ${borderClass}`}
                          >
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 font-medium ${badgeClass}`}>
                              {opt.key}
                            </span>
                            <span className="text-sm sm:text-base text-stone-800 leading-snug pt-0.5">
                              {opt.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action button */}
                    <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                      <button
                        onClick={() => {
                          if (studyQuestionIndex > 0) {
                            setStudyQuestionIndex(prev => prev - 1);
                            setStudySelectedOption(null);
                            setStudySubmitted(false);
                          }
                        }}
                        disabled={studyQuestionIndex === 0}
                        className="px-4 py-2 text-xs font-semibold text-stone-600 disabled:opacity-30 hover:bg-stone-100 rounded-lg transition"
                      >
                        Questão Anterior
                      </button>

                      {!studySubmitted ? (
                        <button
                          onClick={() => {
                            if (studySelectedOption) {
                              setStudySubmitted(true);
                            }
                          }}
                          disabled={!studySelectedOption}
                          className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-bold text-xs rounded-lg shadow-xs transition"
                        >
                          Confirmar Resposta
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (studyQuestionIndex < currentExam.questions.length - 1) {
                              setStudyQuestionIndex(prev => prev + 1);
                              setStudySelectedOption(null);
                              setStudySubmitted(false);
                            } else {
                              setActiveNav('exams');
                            }
                          }}
                          className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center space-x-1.5"
                        >
                          <span>{studyQuestionIndex < currentExam.questions.length - 1 ? 'Próxima Questão' : 'Concluir Exame'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Pedagogical Feedback Section */}
                  {studySubmitted && (
                    <div className={`p-6 sm:p-8 border-t ${
                      isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                    }`}>
                      <div className="flex items-center space-x-2.5 mb-4">
                        {isCorrect ? (
                          <>
                            <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </div>
                            <span className="font-serif font-bold text-base text-emerald-900">
                              Resposta correcta! Parabéns.
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
                              <XCircle className="w-4 h-4" />
                            </div>
                            <span className="font-serif font-bold text-base text-rose-900">
                              Resposta incorrecta. A alternativa correcta é a <strong>{q.correctOption}</strong>.
                            </span>
                          </>
                        )}
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4 text-xs sm:text-sm text-stone-800">
                        <div className="font-semibold text-stone-900">
                          Resolução Oficial e Fundamentação:
                        </div>
                        <p className="leading-relaxed text-stone-700">
                          {q.explanation.summary}
                        </p>

                        <div className="space-y-1.5 pl-2 border-l-2 border-emerald-700 text-stone-700 font-mono text-xs">
                          {q.explanation.steps.map((step, idx) => (
                            <div key={idx}>{step}</div>
                          ))}
                        </div>

                        {q.explanation.keyFormulaOrConcept && (
                          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                            <span className="text-stone-500 font-medium block">Fórmula / Relação Fundamental:</span>
                            <span className="font-mono text-emerald-950 font-bold">{q.explanation.keyFormulaOrConcept}</span>
                          </div>
                        )}

                        {q.videoLessonId && (
                          <div className="pt-2 flex items-center justify-between">
                            <button
                              onClick={() => {
                                setSelectedVideoId(q.videoLessonId!);
                                setActiveNav('videos');
                              }}
                              className="text-xs text-emerald-900 hover:text-emerald-950 font-bold flex items-center space-x-1.5"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Assistir à resolução desta questão em vídeo</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              );
            })()}

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW D: SIMULADO OFICIAL CRONOMETRADO COM GRELHA DE RESPOSTAS */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'timed_quiz' && (
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            
            {/* If Exam is already completed, show Result Summary */}
            {timedResult ? (
              <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 mx-auto flex items-center justify-center font-serif text-2xl font-bold border border-emerald-300">
                    <Award className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">
                    Resultado Oficial do Simulado
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {timedResult.examTitle} ({timedResult.university})
                  </p>
                </div>

                {/* Score breakdown metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-500 block">Classificação</span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">
                      {timedResult.score} <span className="text-xs font-sans text-stone-500">/ 20</span>
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-1">{timedResult.percentage}% de rendimento</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-500 block">Acertos</span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700">
                      {timedResult.correctCount}
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-1">de {timedResult.totalQuestions} questões</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-500 block">Erros</span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-rose-600">
                      {timedResult.wrongCount}
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-1">{timedResult.unansweredCount} em branco</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-500 block">Tempo Total</span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
                      {Math.floor(timedResult.timeSpentSeconds / 60)}m
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-1">
                      {Math.round(timedResult.timeSpentSeconds / timedResult.totalQuestions)}s por questão
                    </span>
                  </div>
                </div>

                {/* Admission Cutoff Verdict */}
                <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start space-x-3 ${
                  timedResult.score >= userTarget.targetCutoffScore
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}>
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-800" />
                  <div>
                    <span className="font-bold block">
                      {timedResult.score >= userTarget.targetCutoffScore
                        ? 'Pontuação acima da nota de corte estimada!'
                        : 'Abaixo da nota de corte de referência.'}
                    </span>
                    <span className="text-stone-700">
                      Sua nota foi de <strong>{timedResult.score} valores</strong>. A média histórica para ingressar em {userTarget.targetCourse} na {userTarget.targetUniversity} é de aproximadamente <strong>{userTarget.targetCutoffScore} valores</strong>.
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => startStudyExam(currentExam)}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition"
                  >
                    Rever Questões com Gabarito
                  </button>
                  <button
                    onClick={() => startTimedExam(currentExam)}
                    className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-xs transition"
                  >
                    Tentar Novamente Este Simulado
                  </button>
                  <button
                    onClick={() => setActiveNav('dashboard')}
                    className="px-5 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition"
                  >
                    Voltar ao Painel
                  </button>
                </div>
              </div>
            ) : (
              /* Ongoing Timed Exam Workspace */
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Main Exam Paper (3 cols) */}
                <div className="lg:col-span-3 space-y-4">
                  
                  {/* Countdown Status Bar */}
                  <div className="bg-white px-6 py-4 rounded-xl border border-stone-200 shadow-2xs flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-500 font-medium">
                        {currentExam.universityCode} · {currentExam.subject}
                      </div>
                      <div className="font-serif font-bold text-stone-900 text-base">
                        Questão {timedCurrentIdx + 1} de {currentExam.questions.length}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className={`px-4 py-2 rounded-lg font-mono text-sm font-bold flex items-center space-x-2 ${
                        timedSecondsLeft < 300 ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-stone-100 text-stone-800'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(timedSecondsLeft)}</span>
                      </div>

                      <button
                        onClick={() => setShowSubmitConfirmModal(true)}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-xs transition"
                      >
                        Entregar Prova
                      </button>
                    </div>
                  </div>

                  {/* Active Question Statement & Options */}
                  {(() => {
                    const q = currentExam.questions[timedCurrentIdx];
                    const selected = timedAnswers[q.id];

                    return (
                      <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs space-y-6">
                        <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-100">
                          <span>Tópico da Prova: <strong className="text-stone-700">{q.topic}</strong></span>
                          
                          <button
                            onClick={() => {
                              setTimedFlagged(prev => ({
                                ...prev,
                                [q.id]: !prev[q.id]
                              }));
                            }}
                            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs transition ${
                              timedFlagged[q.id] ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-stone-500 hover:bg-stone-100'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>{timedFlagged[q.id] ? 'Marcada p/ Revisão' : 'Marcar p/ Revisar'}</span>
                          </button>
                        </div>

                        <div className="font-serif text-base sm:text-lg text-stone-900 leading-relaxed font-normal">
                          {q.statement}
                        </div>

                        <div className="space-y-3">
                          {q.options.map(opt => {
                            const isChosen = selected === opt.key;
                            return (
                              <div
                                key={opt.key}
                                onClick={() => {
                                  setTimedAnswers(prev => ({
                                    ...prev,
                                    [q.id]: opt.key
                                  }));
                                }}
                                className={`p-4 rounded-xl border transition cursor-pointer flex items-start space-x-3.5 ${
                                  isChosen
                                    ? 'border-emerald-800 bg-emerald-50/60 ring-1 ring-emerald-800'
                                    : 'border-stone-200 hover:border-stone-400 bg-white'
                                }`}
                              >
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 font-medium ${
                                  isChosen ? 'bg-emerald-800 text-white font-bold' : 'bg-stone-100 text-stone-700'
                                }`}>
                                  {opt.key}
                                </span>
                                <span className="text-sm sm:text-base text-stone-800 pt-0.5">
                                  {opt.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Navigation controls */}
                        <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                          <button
                            onClick={() => setTimedCurrentIdx(prev => Math.max(0, prev - 1))}
                            disabled={timedCurrentIdx === 0}
                            className="px-4 py-2 text-xs font-semibold text-stone-600 disabled:opacity-30 hover:bg-stone-100 rounded-lg transition"
                          >
                            Anterior
                          </button>

                          <button
                            onClick={() => {
                              if (timedCurrentIdx < currentExam.questions.length - 1) {
                                setTimedCurrentIdx(prev => prev + 1);
                              } else {
                                setShowSubmitConfirmModal(true);
                              }
                            }}
                            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg transition flex items-center space-x-1"
                          >
                            <span>{timedCurrentIdx < currentExam.questions.length - 1 ? 'Próxima Questão' : 'Finalizar Exame'}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                </div>

                {/* Right: Optical Answer Sheet Grid (Grelha de Respostas) */}
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-sans">
                        Grelha de Respostas
                      </h4>
                      <span className="text-[11px] text-stone-500">
                        {Object.keys(timedAnswers).length} de {currentExam.questions.length} respondidas
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      Clique em qualquer número para navegar diretamente à questão.
                    </p>

                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {currentExam.questions.map((q, idx) => {
                        const isAnswered = !!timedAnswers[q.id];
                        const isFlagged = !!timedFlagged[q.id];
                        const isCurrent = timedCurrentIdx === idx;

                        let style = 'bg-stone-50 text-stone-700 border-stone-200';
                        if (isCurrent) {
                          style = 'ring-2 ring-emerald-800 bg-white font-bold text-emerald-900 border-emerald-800';
                        } else if (isAnswered) {
                          style = 'bg-emerald-800 text-white font-semibold border-emerald-800';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setTimedCurrentIdx(idx)}
                            className={`h-10 rounded-lg border text-xs flex flex-col items-center justify-center transition relative ${style}`}
                          >
                            <span>{idx + 1}</span>
                            {isFlagged && (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-stone-100 text-[11px] space-y-1.5 text-stone-500">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded bg-emerald-800 inline-block" />
                        <span>Respondida</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded bg-stone-100 border border-stone-300 inline-block" />
                        <span>Em branco / Pendente</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                        <span>Marcada para rever</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Confirm Submission Modal */}
            {showSubmitConfirmModal && (
              <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-xl border border-stone-200 max-w-md w-full p-6 space-y-4 shadow-xl">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Entregar Folha de Respostas?
                  </h3>

                  {(() => {
                    const answeredCount = Object.keys(timedAnswers).length;
                    const totalCount = currentExam.questions.length;
                    const remaining = totalCount - answeredCount;

                    return (
                      <div className="text-xs text-stone-600 space-y-2">
                        <p>
                          Você respondeu <strong>{answeredCount}</strong> de <strong>{totalCount}</strong> questões.
                        </p>
                        {remaining > 0 && (
                          <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-700" />
                            <span>
                              Atenção: Existem <strong>{remaining} questões em branco</strong>. Deseja realmente concluir agora?
                            </span>
                          </div>
                        )}
                        <p className="text-stone-500 pt-1">
                          Ao confirmar, o cronômetro será finalizado e o relatório de nota oficial (0 a 20 valores) será emitido.
                        </p>
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
                    <button
                      onClick={() => setShowSubmitConfirmModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition"
                    >
                      Continuar a Resolver
                    </button>
                    <button
                      onClick={finishTimedExam}
                      className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-xs transition"
                    >
                      Sim, Entregar Exame
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW E: MANUAIS TEÓRICOS DE ESTUDO */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'manuals' && (
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Biblioteca Acadêmica</div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Manuais e Resumos Teóricos</h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Conteúdo doutrinário, fórmulas deduzidas e regras ortográficas exigidas nas provas de Moçambique.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Left Column: List of manuals */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                    Manuais Disponíveis ({studyManualsList.length})
                  </span>
                  {currentUser.role === 'teacher' && (
                    <button
                      onClick={() => setActiveNav('teacher_panel')}
                      className="text-[10px] text-emerald-800 font-bold hover:underline"
                    >
                      + Novo Manual
                    </button>
                  )}
                </div>
                {studyManualsList.map(manual => (
                  <div
                    key={manual.id}
                    onClick={() => {
                      setSelectedManualId(manual.id);
                      setManualChapterIdx(0);
                    }}
                    className={`p-4 rounded-xl border transition cursor-pointer space-y-1.5 ${
                      selectedManualId === manual.id
                        ? 'border-emerald-800 bg-white ring-1 ring-emerald-800 shadow-2xs'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    <div className="text-[11px] text-stone-500 flex items-center justify-between">
                      <span className="font-semibold text-emerald-900">{manual.subject}</span>
                      <span>{manual.readTimeMinutes} min</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                      {manual.title}
                    </h4>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[11px] text-stone-500">
                        Foco: {manual.universityFocus}
                      </p>
                      {currentUser.role === 'teacher' && manual.authorId === currentUser.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteModal({ type: 'manual', id: manual.id, title: manual.title });
                          }}
                          className="text-stone-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition"
                          title="Eliminar este seu manual"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Active Manual Reader */}
              <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs space-y-6">
                
                {/* Header of the manual */}
                <div className="border-b border-stone-200 pb-4 space-y-2">
                  <div className="text-xs text-stone-500">
                    {currentManual.subject} · {currentManual.universityFocus} · {currentManual.readTimeMinutes} min de leitura
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    {currentManual.title}
                  </h3>

                  {currentManual.fileMeta && (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2.5">
                        <File className="w-5 h-5 text-emerald-800" />
                        <div>
                          <div className="text-xs font-bold text-stone-900">{currentManual.fileMeta.name}</div>
                          <div className="text-[10px] text-stone-500">Arquivo Original Carregado ({currentManual.fileMeta.size})</div>
                        </div>
                      </div>
                      {currentManual.fileMeta.url && (
                        <a
                          href={currentManual.fileMeta.url}
                          download={currentManual.fileMeta.name}
                          className="px-3 py-1.5 bg-emerald-850 hover:bg-emerald-950 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center space-x-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Baixar Manual</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Chapter selector tabs */}
                <div className="flex items-center space-x-2 border-b border-stone-100 pb-2 overflow-x-auto text-xs">
                  {currentManual.chapters.map((chap, idx) => (
                    <button
                      key={idx}
                      onClick={() => setManualChapterIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-medium ${
                        manualChapterIdx === idx
                          ? 'bg-emerald-900 text-white font-bold'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {chap.title}
                    </button>
                  ))}
                </div>

                {/* Chapter Content Body */}
                {(() => {
                  const chap = currentManual.chapters[manualChapterIdx] || currentManual.chapters[0];
                  return (
                    <div className="space-y-6 text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
                      <h4 className="font-serif font-bold text-lg text-emerald-950">
                        {chap.title}
                      </h4>

                      <div className="space-y-3">
                        {chap.content.map((p, idx) => (
                          <p key={idx} className="leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* Formulas Box */}
                      {chap.keyFormulas && chap.keyFormulas.length > 0 && (
                        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                            Formulário Rápido de Aplicação:
                          </span>
                          <div className="space-y-1 text-xs sm:text-sm font-mono text-emerald-950">
                            {chap.keyFormulas.map((f, idx) => (
                              <div key={idx} className="p-1.5 bg-white border border-stone-200 rounded">
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dica da comissão de exame */}
                      {chap.tips && (
                        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 flex items-start space-x-2.5">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-700" />
                          <div>
                            <strong className="block font-serif text-stone-900">Dica de Exame de Admissão:</strong>
                            <span>{chap.tips}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW F: VIDEOAULAS EXPLICATIVAS */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'videos' && (
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Aulas Multimídia</div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">Videoaulas com Resolução Comentada</h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Aulas gravadas por docentes de referência, detalhando resoluções oficiais passo a passo.
                </p>
              </div>

              {currentUser.role === 'teacher' && (
                <button
                  onClick={() => setActiveNav('teacher_panel')}
                  className="px-3.5 py-2 bg-emerald-850 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 shrink-0 self-start sm:self-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Introduzir Vídeo Aula</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Video Player & Overview */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Simulated High-Fidelity Video Player */}
                <div className="bg-stone-900 rounded-xl overflow-hidden shadow-md text-white aspect-video relative flex flex-col justify-between p-4 sm:p-6 border border-stone-800">
                  
                  {/* Top Bar inside player */}
                  <div className="flex items-center justify-between text-xs text-stone-300 z-10">
                    <span className="font-semibold text-emerald-400">{currentVideo.subject} · {currentVideo.institution}</span>
                    <span className="bg-stone-800/80 px-2 py-0.5 rounded text-[11px]">{currentVideo.duration}</span>
                  </div>

                  {/* Middle Play Button state */}
                  <div className="text-center space-y-3 z-10 self-center">
                    <button
                      onClick={() => setVideoIsPlaying(prev => !prev)}
                      className="w-16 h-16 rounded-full bg-emerald-700/90 hover:bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg transition"
                    >
                      {videoIsPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                    </button>
                    <p className="text-xs text-stone-300 font-serif">
                      {videoIsPlaying ? 'Reproduzindo aula...' : 'Clique para reproduzir resolução completa'}
                    </p>
                  </div>

                  {/* Player Bottom Controls */}
                  <div className="space-y-2 z-10 bg-stone-950/80 p-3 rounded-lg backdrop-blur-xs">
                    <div className="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-1/3" />
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <div className="flex items-center space-x-3">
                        <button onClick={() => setVideoIsPlaying(prev => !prev)} className="hover:text-white">
                          {videoIsPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <span>08:45 / {currentVideo.duration}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-[11px] text-stone-400">Velocidade:</span>
                        {[1, 1.25, 1.5].map(rate => (
                          <button
                            key={rate}
                            onClick={() => setVideoPlaybackRate(rate)}
                            className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                              videoPlaybackRate === rate ? 'bg-emerald-800 text-white' : 'text-stone-400 hover:text-white'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info Details */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-stone-500">
                    <span className="font-semibold text-emerald-900">{currentVideo.instructor}</span>
                    <span>·</span>
                    <span>{currentVideo.institution}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 leading-snug">
                    {currentVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {currentVideo.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-600">
                    <span className="font-semibold text-stone-800">Tópicos abordados:</span>
                    {currentVideo.topicsCovered.map((t, idx) => (
                      <span key={idx} className="bg-stone-100 px-2.5 py-1 rounded-md text-stone-700 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>

                  {currentVideo.fileMeta && (
                    <div className="mt-3 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <Film className="w-5 h-5 text-indigo-800 shrink-0" />
                        <div>
                          <div className="font-bold text-stone-900">{currentVideo.fileMeta.name}</div>
                          <div className="text-[10px] text-stone-500">Vídeo Original Carregado pelo Docente · {currentVideo.fileMeta.size}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Col: Chapters and Playlist */}
              <div className="space-y-4">
                
                {/* Chapters in this video */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Índice de Resoluções nesta Aula
                  </h4>
                  <div className="space-y-2 text-xs">
                    {currentVideo.chapters.map((chap, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-100 flex items-center justify-between cursor-pointer transition"
                      >
                        <span className="text-stone-800 pr-2">{chap.label}</span>
                        <span className="font-mono text-emerald-900 font-semibold text-[11px] whitespace-nowrap">
                          {chap.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other video lessons */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Aulas Disponíveis ({videoLessonsList.length})
                  </h4>
                  <div className="space-y-2.5">
                    {videoLessonsList.map(v => (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVideoId(v.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition space-y-1 ${
                          selectedVideoId === v.id
                            ? 'border-emerald-800 bg-emerald-50/40 ring-1 ring-emerald-800'
                            : 'border-stone-200 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-emerald-950">{v.subject}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-stone-500 font-mono">{v.duration}</span>
                            {currentUser.role === 'teacher' && v.authorId === currentUser.id && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmDeleteModal({ type: 'video', id: v.id, title: v.title });
                                }}
                                className="text-stone-400 hover:text-rose-600 p-0.5 rounded hover:bg-rose-50 transition"
                                title="Eliminar sua vídeo aula"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                        <h5 className="font-serif font-bold text-xs text-stone-900 leading-snug">
                          {v.title}
                        </h5>
                        <p className="text-[11px] text-stone-500">{v.instructor}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW G: ANALYTICS & HISTÓRICO DE DESEMPENHO */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'analytics' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Relatório Evolutivo Pessoal</div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Histórico de Provas e Diagnóstico Individual</h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Acompanhe a sua evolução em relação à nota de corte do curso de {userTarget.targetCourse}.
              </p>
            </div>

            {/* Student Privacy & Confidentiality Notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Boletim Individual e Confidencial de {currentUser.name}</span>
                <span className="text-emerald-900/90">
                  Para resguardar a sua privacidade e dos outros candidatos, <strong>os alunos cadastrados não têm acesso às notas nem ao desempenho uns dos outros</strong>. Todas as notas, gráficos e simulados abaixo são estritamente individuais e privados da sua conta.
                </span>
              </div>
            </div>

            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-xs text-stone-500 block">Sua Média Geral Ponderada</span>
                <span className="text-3xl font-serif font-bold text-emerald-800 block mt-1">
                  {averageScore} <span className="text-xs font-sans text-stone-500 font-normal">/ 20</span>
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">Escala oficial de Moçambique</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-xs text-stone-500 block">Seus Simulados Realizados</span>
                <span className="text-3xl font-serif font-bold text-stone-900 block mt-1">
                  {studentAttempts.length}
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">Simulados cronometrados</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-xs text-stone-500 block">Probabilidade de Admissão</span>
                <span className="text-3xl font-serif font-bold text-emerald-700 block mt-1">
                  {Number(averageScore) >= userTarget.targetCutoffScore ? 'Alta' : 'Em Preparação'}
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Corte: {userTarget.targetCutoffScore} valores ({userTarget.targetUniversity})
                </span>
              </div>
            </div>

            {/* Attempt Records Table */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Meus Simulados Registados
                </h3>
                {studentAttempts.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Deseja limpar o seu histórico pessoal de simulados?')) {
                        setAttempts(prev => prev.filter(att => att.studentId !== currentUser.id));
                      }
                    }}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                  >
                    Limpar Meu Histórico
                  </button>
                )}
              </div>

              {studentAttempts.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500 space-y-2">
                  <p>Você ainda não concluiu nenhum simulado cronometrado com esta conta.</p>
                  <p className="text-[11px] text-stone-400">
                    O histórico de outros alunos é confidencial e não é exibido no seu painel.
                  </p>
                  <button
                    onClick={() => setActiveNav('exams')}
                    className="px-4 py-2 bg-emerald-800 text-white font-bold rounded-lg text-xs mt-2"
                  >
                    Fazer Meu Primeiro Simulado
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 font-medium">
                      <tr>
                        <th className="px-6 py-3">Exame / Instituição</th>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Nota (0 a 20)</th>
                        <th className="px-4 py-3">Acertos</th>
                        <th className="px-4 py-3">Tempo</th>
                        <th className="px-6 py-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {studentAttempts.map(att => (
                        <tr key={att.id} className="hover:bg-stone-50/70 transition">
                          <td className="px-6 py-4">
                            <div className="font-serif font-bold text-stone-900">{att.examTitle}</div>
                            <div className="text-[11px] text-stone-500">{att.university} · {att.subject}</div>
                          </td>
                          <td className="px-4 py-4 text-stone-600 whitespace-nowrap">{att.date}</td>
                          <td className="px-4 py-4 whitespace-nowrap font-serif font-bold text-emerald-800 text-sm">
                            {att.score} <span className="text-[10px] text-stone-400 font-sans">/20</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-emerald-700 font-semibold">{att.correctCount}</span>
                            <span className="text-stone-400"> / {att.totalQuestions}</span>
                          </td>
                          <td className="px-4 py-4 text-stone-600 whitespace-nowrap">
                            {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                const ex = EXAMS_LIST.find(e => e.id === att.examId) || EXAMS_LIST[0];
                                startStudyExam(ex);
                              }}
                              className="text-xs text-emerald-800 hover:text-emerald-950 font-bold"
                            >
                              Rever Gabarito
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW I: PAINEL DOCENTE / PROFESSOR */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'teacher_panel' && currentUser.role === 'teacher' && (
          <TeacherDashboard
            teacher={currentUser as TeacherProfile}
            examsList={examsList}
            studyManualsList={studyManualsList}
            videoLessonsList={videoLessonsList}
            onAddExam={handleAddExam}
            onDeleteExam={handleDeleteExam}
            onAddStudyManual={handleAddStudyManual}
            onDeleteStudyManual={handleDeleteStudyManual}
            onAddVideoLesson={handleAddVideoLesson}
            onDeleteVideoLesson={handleDeleteVideoLesson}
            onAddQuestionToExam={handleAddQuestionToExam}
            onOpenSwitchRole={() => {
              setAuthModalInitialRole('student');
              setAuthModalOpen(true);
            }}
          />
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW H: PERFIL DO CANDIDATO E METAS DE ADMISSÃO */}
        {/* ------------------------------------------------------------ */}
        {activeNav === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Configurações Acadêmicas</div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  {currentUser.role === 'teacher' ? 'Perfil do Docente' : 'Perfil do Aluno'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  {currentUser.role === 'teacher'
                    ? 'Dados da titulação, instituição de ensino e especialidades curriculares.'
                    : 'Personalize seus objetivos de admissão para que as métricas e sugestões reflitam suas metas reais.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setAuthModalInitialRole(currentUser.role === 'teacher' ? 'student' : 'teacher');
                  setAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-2xs transition"
              >
                {currentUser.role === 'teacher' ? 'Alternar / Registar Aluno' : 'Alternar / Registar Professor'}
              </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-lg border ${
                    currentUser.role === 'teacher'
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900">{currentUser.name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-stone-500">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        currentUser.role === 'teacher'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {currentUser.role === 'teacher' ? 'Professor / Docente' : 'Aluno Candidato'}
                      </span>
                      <span>·</span>
                      <span>{currentUser.email}</span>
                    </div>
                  </div>
                </div>

                {currentUser.role === 'teacher' && (
                  <button
                    onClick={() => setActiveNav('teacher_panel')}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs"
                  >
                    Aceder ao Painel Docente
                  </button>
                )}
              </div>

              {currentUser.role === 'teacher' ? (
                // TEACHER VIEW IN PROFILE
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-stone-500 block">Instituição:</span>
                      <span className="text-stone-800 font-medium text-sm">{(currentUser as TeacherProfile).institution}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-stone-500 block">Titulação / Cargo:</span>
                      <span className="text-stone-800 font-medium text-sm">{(currentUser as TeacherProfile).titleOrRank || 'Docente'}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-500 block mb-1">Disciplinas Lecionadas:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(currentUser as TeacherProfile).specialties.map(spec => (
                        <span key={spec} className="bg-emerald-50 text-emerald-900 px-2.5 py-0.5 rounded-md font-medium border border-emerald-200">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(currentUser as TeacherProfile).academicBio && (
                    <div>
                      <span className="font-semibold text-stone-500 block">Biografia Académica:</span>
                      <p className="text-stone-700 mt-0.5 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
                        {(currentUser as TeacherProfile).academicBio}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // STUDENT VIEW IN PROFILE
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Nome Completo</label>
                    <input
                      type="text"
                      value={userTarget.name}
                      onChange={(e) => {
                        setUserTarget(prev => ({ ...prev, name: e.target.value }));
                        setCurrentUser(prev => ({ ...prev, name: e.target.value }));
                      }}
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Endereço de E-mail</label>
                    <input
                      type="email"
                      value={userTarget.email}
                      onChange={(e) => {
                        setUserTarget(prev => ({ ...prev, email: e.target.value }));
                        setCurrentUser(prev => ({ ...prev, email: e.target.value }));
                      }}
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Universidade Alvo</label>
                    <select
                      value={userTarget.targetUniversity}
                      onChange={(e) => {
                        setUserTarget(prev => ({ ...prev, targetUniversity: e.target.value }));
                        setCurrentUser(prev => ({ ...prev, targetUniversity: e.target.value }));
                      }}
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:border-emerald-800"
                    >
                      {UNIVERSITIES.map(u => (
                        <option key={u.code} value={u.name}>{u.name} ({u.code})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Curso Pretendido</label>
                    <input
                      type="text"
                      value={userTarget.targetCourse}
                      onChange={(e) => {
                        setUserTarget(prev => ({ ...prev, targetCourse: e.target.value }));
                        setCurrentUser(prev => ({ ...prev, targetCourse: e.target.value }));
                      }}
                      placeholder="Ex: Engenharia Informática, Medicina Geral, Direito..."
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700">Ano da Prova</label>
                      <input
                        type="number"
                        value={userTarget.targetYear}
                        onChange={(e) => {
                          const yr = Number(e.target.value);
                          setUserTarget(prev => ({ ...prev, targetYear: yr }));
                          setCurrentUser(prev => ({ ...prev, targetYear: yr }));
                        }}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700">Meta / Nota de Corte (0-20)</label>
                      <input
                        type="number"
                        step="0.5"
                        min="10"
                        max="20"
                        value={userTarget.targetCutoffScore}
                        onChange={(e) => {
                          const cut = Number(e.target.value);
                          setUserTarget(prev => ({ ...prev, targetCutoffScore: cut }));
                          setCurrentUser(prev => ({ ...prev, targetCutoffScore: cut }));
                        }}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  Os dados são salvos automaticamente no armazenamento local do navegador.
                </span>
                <button
                  onClick={() => alert('Configurações salvas com sucesso!')}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-xs transition"
                >
                  Salvar Alterações
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Global Auth Modal with Student and Teacher registration */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        initialRole={authModalInitialRole}
        onLogin={(account) => {
          setCurrentUser(account);
          if (account.role === 'teacher') {
            setActiveNav('teacher_panel');
          } else {
            setActiveNav('dashboard');
          }
        }}
      />

      {/* Global Deletion Confirmation Modal */}
      {confirmDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Confirmar Eliminação
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tem a certeza que deseja eliminar {confirmDeleteModal.type === 'exam' ? 'o exame' : confirmDeleteModal.type === 'manual' ? 'o manual' : 'a vídeo aula'}:
              </p>
              <div className="p-3 bg-stone-100 rounded-lg font-serif font-semibold text-xs text-stone-900">
                "{confirmDeleteModal.title}"
              </div>
              <p className="text-[11px] text-rose-600 font-medium">
                Esta ação removerá o conteúdo permanentemente da plataforma.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteModal(null)}
                className="flex-1 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmDeleteModal.type === 'exam') {
                    handleDeleteExam(confirmDeleteModal.id);
                  } else if (confirmDeleteModal.type === 'manual') {
                    handleDeleteStudyManual(confirmDeleteModal.id);
                  } else if (confirmDeleteModal.type === 'video') {
                    handleDeleteVideoLesson(confirmDeleteModal.id);
                  }
                  setConfirmDeleteModal(null);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Eliminar Permanentemente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. FOOTER INSTITUCIONAL */}
      {/* ============================================================ */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-emerald-950">Exame Master Moçambique</span>
            <span>·</span>
            <span>Plataforma Preparatória Universitária</span>
          </div>

          <div className="text-[11px] text-stone-500 text-center sm:text-right">
            <span>UEM · UP · UniZambeze · UJC · UniLúrio · ISRI</span>
            <span className="block mt-0.5">Construído em conformidade com as matrizes curriculares e editais de admissão vigentes.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
