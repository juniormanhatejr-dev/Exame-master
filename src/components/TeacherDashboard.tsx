import React, { useState, useRef } from 'react';
import { 
  TeacherProfile, 
  StudentProfile,
  Exam, 
  StudyManual, 
  VideoLesson, 
  UploadedFileMeta, 
  Question,
  TeacherEvaluation,
  AcademicContactMessage,
  ExamAttemptRecord
} from '../types';
import { UNIVERSITIES, SUBJECTS } from '../data/mockData';
import { 
  BookOpen, 
  CheckCircle, 
  FileText, 
  Award, 
  Trash2, 
  Video, 
  AlertTriangle, 
  X, 
  UploadCloud, 
  File, 
  Film, 
  Download, 
  FolderCheck,
  Building,
  Check,
  Eye,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  MessageSquare,
  Send,
  UserCheck,
  User,
  Star,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

interface TeacherDashboardProps {
  teacher: TeacherProfile;
  examsList: Exam[];
  studyManualsList: StudyManual[];
  videoLessonsList: VideoLesson[];
  registeredStudents?: StudentProfile[];
  evaluations?: TeacherEvaluation[];
  onAddEvaluation?: (ev: TeacherEvaluation) => void;
  onDeleteEvaluation?: (evalId: string) => void;
  academicMessages?: AcademicContactMessage[];
  onSendMessage?: (msg: AcademicContactMessage) => void;
  allAttempts?: ExamAttemptRecord[];
  onAddExam: (exam: Exam) => void;
  onDeleteExam: (examId: string) => void;
  onAddStudyManual: (manual: StudyManual) => void;
  onDeleteStudyManual: (manualId: string) => void;
  onAddVideoLesson: (video: VideoLesson) => void;
  onDeleteVideoLesson: (videoId: string) => void;
  onAddQuestionToExam?: (examId: string, question: Question) => void;
  onOpenSwitchRole: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  examsList,
  studyManualsList,
  videoLessonsList,
  registeredStudents = [],
  evaluations = [],
  onAddEvaluation,
  onDeleteEvaluation,
  academicMessages = [],
  onSendMessage,
  allAttempts = [],
  onAddExam,
  onDeleteExam,
  onAddStudyManual,
  onDeleteStudyManual,
  onAddVideoLesson,
  onDeleteVideoLesson,
  onOpenSwitchRole
}) => {
  const [activeTab, setActiveTab] = useState<'upload_hub' | 'students_evaluations' | 'exams' | 'manuals' | 'videos'>('students_evaluations');
  const [uploadCategory, setUploadCategory] = useState<'exam' | 'manual' | 'video'>('exam');

  // Confirmation modal state for deletions
  const [deleteModal, setDeleteModal] = useState<{
    type: 'exam' | 'manual' | 'video';
    id: string;
    title: string;
  } | null>(null);

  // Success message toast
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const showSuccess = (msg: string) => {
    setFeedbackSuccess(msg);
    setTimeout(() => setFeedbackSuccess(null), 4500);
  };

  // -------------------------------------------------------------
  // REQUISITO: O professor só avalia ou tem contacto com os alunos inscritos na sua disciplina
  // -------------------------------------------------------------
  const enrolledStudents = registeredStudents.filter(student => {
    const subjects = student.enrolledSubjects && student.enrolledSubjects.length > 0
      ? student.enrolledSubjects
      : ['Matemática']; // fallback para compatibilidade
    return subjects.some(sub => teacher.specialties.includes(sub));
  });

  const otherStudentsCount = Math.max(0, registeredStudents.length - enrolledStudents.length);

  // Modal / Form state for evaluating a student
  const [evaluatingStudent, setEvaluatingStudent] = useState<StudentProfile | null>(null);
  const [evalScore, setEvalScore] = useState<number>(16.0);
  const [evalQualitative, setEvalQualitative] = useState<'Excelente' | 'Bom' | 'Suficiente' | 'Necessita Apoio' | 'Insuficiente'>('Bom');
  const [evalSubject, setEvalSubject] = useState<string>(teacher.specialties[0] || 'Matemática');
  const [evalComment, setEvalComment] = useState<string>('');
  const [evalAction, setEvalAction] = useState<string>('');

  // Drawer / Modal state for academic contact chat
  const [chatStudent, setChatStudent] = useState<StudentProfile | null>(null);
  const [chatMessageText, setChatMessageText] = useState<string>('');

  // -------------------------------------------------------------
  // SIMPLIFIED UPLOAD STATE (File + Tema + Disciplina)
  // -------------------------------------------------------------
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileObjectUrl, setFileObjectUrl] = useState<string | null>(null);
  const [contentTheme, setContentTheme] = useState('');
  const [contentSubject, setContentSubject] = useState(teacher.specialties[0] || 'Matemática');
  
  // Quick optional metadata for exams
  const [examUniCode, setExamUniCode] = useState<'UEM' | 'UP' | 'UniZambeze' | 'UJC' | 'UniLúrio' | 'ISRI'>('UEM');
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // -------------------------------------------------------------
  // TEACHER DATA ISOLATION (No teacher has access to another's content)
  // -------------------------------------------------------------
  const myExams = examsList.filter(ex => ex.authorId === teacher.id);
  const myManuals = studyManualsList.filter(m => m.authorId === teacher.id);
  const myVideos = videoLessonsList.filter(v => v.authorId === teacher.id);

  // Format file size helper
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle local file selection
  const processFile = (file: File) => {
    setSelectedFile(file);
    const objUrl = URL.createObjectURL(file);
    setFileObjectUrl(objUrl);

    // Auto-fill theme if empty from file name (cleaned)
    if (!contentTheme.trim()) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .trim();
      setContentTheme(cleanName);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setFileObjectUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // -------------------------------------------------------------
  // INSTANT PUBLISHING HANDLER (Zero tedious forms)
  // -------------------------------------------------------------
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contentTheme.trim()) {
      alert('Por favor, informe o tema.');
      return;
    }

    const todayStr = new Date().toLocaleDateString('pt-MZ', { day: '2-digit', month: 'short', year: 'numeric' });
    const fileMeta: UploadedFileMeta = {
      name: selectedFile ? selectedFile.name : `${contentTheme.replace(/\s+/g, '_')}.${uploadCategory === 'video' ? 'mp4' : 'pdf'}`,
      size: selectedFile ? formatFileSize(selectedFile.size) : '4.5 MB',
      type: selectedFile ? selectedFile.type : (uploadCategory === 'video' ? 'video/mp4' : 'application/pdf'),
      url: fileObjectUrl || (uploadCategory === 'video' ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' : undefined),
      uploadedAt: todayStr
    };

    if (uploadCategory === 'exam') {
      const uniObj = UNIVERSITIES.find(u => u.code === examUniCode) || UNIVERSITIES[0];
      const newExam: Exam = {
        id: `exam-upld-${Date.now()}`,
        title: contentTheme.trim(),
        university: uniObj.name,
        universityCode: examUniCode,
        subject: contentSubject,
        year: new Date().getFullYear(),
        durationMinutes: 120,
        totalQuestions: 0,
        passingScoreSuggestion: 14.0,
        description: `Prova oficial introduzida pelo docente ${teacher.name} (${teacher.institution}). Ficheiro original digitalizado disponível para consulta e resolução.`,
        questions: [],
        fileMeta,
        fileUrl: fileMeta.url,
        authorId: teacher.id,
        authorName: teacher.name,
        authorInstitution: teacher.institution,
        authorEmail: teacher.email
      };

      onAddExam(newExam);
      showSuccess(`Exame "${newExam.title}" publicado com sucesso!`);
      setActiveTab('exams');
    } else if (uploadCategory === 'manual') {
      const newManual: StudyManual = {
        id: `man-upld-${Date.now()}`,
        title: contentTheme.trim(),
        subject: contentSubject,
        universityFocus: 'UEM, UP e Universidades Públicas',
        readTimeMinutes: 25,
        authorId: teacher.id,
        authorName: teacher.name,
        authorInstitution: teacher.institution,
        authorEmail: teacher.email,
        chapters: [
          {
            title: `Capítulo 1: ${contentTheme.trim()}`,
            content: [
              `Manual didático oficial disponibilizado pelo docente ${teacher.name} para aprofundamento e consolidação de ${contentSubject}.`,
              `O arquivo completo anexado contém os tópicos programáticos, exercícios comentados e sínteses teóricas preparatórias para os exames de admissão.`
            ],
            tips: 'Consulte o documento completo anexado para dominar os modelos de questões mais frequentes da comissão examinadora.'
          }
        ],
        fileMeta,
        fileUrl: fileMeta.url
      };

      onAddStudyManual(newManual);
      showSuccess(`Manual "${newManual.title}" publicado com sucesso!`);
      setActiveTab('manuals');
    } else if (uploadCategory === 'video') {
      const newVideo: VideoLesson = {
        id: `vid-upld-${Date.now()}`,
        title: contentTheme.trim(),
        subject: contentSubject,
        instructor: teacher.name,
        institution: teacher.institution,
        authorId: teacher.id,
        authorName: teacher.name,
        authorInstitution: teacher.institution,
        authorEmail: teacher.email,
        duration: '30:00',
        description: `Aula em vídeo carregada pelo docente ${teacher.name}. Explicação detalhada do tema ${contentTheme.trim()} com resolução de exercícios práticos.`,
        videoUrl: fileMeta.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        topicsCovered: [contentSubject, contentTheme.trim(), 'Resolução de Exercícios'],
        chapters: [
          { time: '00:00', label: 'Introdução e Teoria' },
          { time: '10:00', label: 'Resolução Prática' },
          { time: '22:00', label: 'Dicas de Admissão' }
        ],
        fileMeta
      };

      onAddVideoLesson(newVideo);
      showSuccess(`Vídeo aula "${newVideo.title}" publicada com sucesso!`);
      setActiveTab('videos');
    }

    // Reset upload state
    clearSelectedFile();
    setContentTheme('');
  };

  // -------------------------------------------------------------
  // CONFIRM DELETION HANDLER
  // -------------------------------------------------------------
  const executeDelete = () => {
    if (!deleteModal) return;

    if (deleteModal.type === 'exam') {
      const target = examsList.find(e => e.id === deleteModal.id);
      if (target && target.authorId && target.authorId !== teacher.id) {
        alert('Acesso restrito: Você não tem permissão para eliminar exames publicados por outros docentes.');
        setDeleteModal(null);
        return;
      }
      onDeleteExam(deleteModal.id);
      showSuccess(`Exame "${deleteModal.title}" eliminado com sucesso.`);
    } else if (deleteModal.type === 'manual') {
      const target = studyManualsList.find(m => m.id === deleteModal.id);
      if (target && target.authorId && target.authorId !== teacher.id) {
        alert('Acesso restrito: Você não tem permissão para eliminar manuais de outros docentes.');
        setDeleteModal(null);
        return;
      }
      onDeleteStudyManual(deleteModal.id);
      showSuccess(`Manual "${deleteModal.title}" eliminado com sucesso.`);
    } else if (deleteModal.type === 'video') {
      const target = videoLessonsList.find(v => v.id === deleteModal.id);
      if (target && target.authorId && target.authorId !== teacher.id) {
        alert('Acesso restrito: Você não tem permissão para eliminar vídeos de outros docentes.');
        setDeleteModal(null);
        return;
      }
      onDeleteVideoLesson(deleteModal.id);
      showSuccess(`Vídeo aula "${deleteModal.title}" eliminada com sucesso.`);
    }

    setDeleteModal(null);
  };

  // -------------------------------------------------------------
  // EVALUATION HANDLER (Only for students in teacher's subject)
  // -------------------------------------------------------------
  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingStudent) return;
    if (!evalComment.trim()) {
      alert('Por favor preencha o parecer pedagógico da avaliação.');
      return;
    }

    const todayStr = new Date().toLocaleDateString('pt-MZ', { day: '2-digit', month: 'short', year: 'numeric' });
    const newEval: TeacherEvaluation = {
      id: `eval-${Date.now()}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherInstitution: teacher.institution,
      studentId: evaluatingStudent.id,
      studentName: evaluatingStudent.name,
      subject: evalSubject,
      date: todayStr,
      scoreValores: Number(evalScore),
      qualitativeAssessment: evalQualitative,
      feedbackComment: evalComment.trim(),
      suggestedAction: evalAction.trim() || 'Continuar praticando provas anteriores.'
    };

    if (onAddEvaluation) {
      onAddEvaluation(newEval);
    }
    showSuccess(`Avaliação de ${evalSubject} lançada com sucesso para ${evaluatingStudent.name}!`);
    setEvaluatingStudent(null);
    setEvalComment('');
    setEvalAction('');
  };

  // -------------------------------------------------------------
  // ACADEMIC CONTACT / CHAT HANDLER (Only for students in teacher's subject)
  // -------------------------------------------------------------
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatStudent || !chatMessageText.trim()) return;

    const matchedSubject = teacher.specialties.find(s => (chatStudent.enrolledSubjects || ['Matemática']).includes(s)) || teacher.specialties[0];
    const newMsg: AcademicContactMessage = {
      id: `msg-${Date.now()}`,
      subject: matchedSubject,
      studentId: chatStudent.id,
      studentName: chatStudent.name,
      teacherId: teacher.id,
      teacherName: teacher.name,
      senderId: teacher.id,
      senderRole: 'teacher',
      message: chatMessageText.trim(),
      timestamp: 'Hoje às ' + new Date().toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' })
    };

    if (onSendMessage) {
      onSendMessage(newMsg);
    }
    setChatMessageText('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Feedback Toast Notification */}
      {feedbackSuccess && (
        <div className="bg-emerald-800 text-white p-4 rounded-xl shadow-lg border border-emerald-700 flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{feedbackSuccess}</span>
          </div>
          <button 
            onClick={() => setFeedbackSuccess(null)}
            className="text-emerald-300 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Teacher Profile Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-stone-950 font-bold px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider flex items-center space-x-1">
                <Award className="w-3.5 h-3.5" />
                <span>Perfil de Professor / Docente Autor</span>
              </span>
              <span className="text-stone-400 text-xs">
                {teacher.institution}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {teacher.name}
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Carregamento ágil de materiais didáticos: basta anexar o arquivo, definir o tema e a disciplina para disponibilizar aos estudantes.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-stone-400">Disciplinas:</span>
              {teacher.specialties.map(spec => (
                <span key={spec} className="bg-stone-800 text-amber-300 px-2.5 py-0.5 rounded-md font-medium border border-stone-700">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-stone-800/80 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-stone-700 shrink-0 space-y-3 min-w-[260px]">
            <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Ações do Docente</div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-700/60">
                <span className="text-stone-400">E-mail:</span>
                <span className="text-stone-200 font-mono text-[11px]">{teacher.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-700/60">
                <span className="text-stone-400">Fluxo:</span>
                <span className="text-emerald-400 font-bold">Upload Rápido (Arquivo + Tema + Disciplina)</span>
              </div>
            </div>

            <button
              onClick={onOpenSwitchRole}
              className="w-full text-center py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg text-xs font-semibold transition"
            >
              Trocar Perfil / Registar Aluno
            </button>
          </div>
        </div>
      </div>

      {/* Teacher Isolation & Privacy Guarantee Box */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-amber-950">
        <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold block">Espaço Docente Exclusivo & Confidencial</span>
          <span className="text-amber-900/90">
            Você está conectado como <strong>{teacher.name}</strong> ({teacher.institution}). Conforme as normas de confidencialidade, os professores cadastrados <strong>não têm acesso aos dados, exames, manuais ou vídeos uns dos outros</strong>. Apenas os materiais da sua autoria são exibidos e geridos aqui.
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('students_evaluations')}
          className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition shrink-0 ${
            activeTab === 'students_evaluations'
              ? 'bg-emerald-850 text-white font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Alunos da Minha Disciplina & Avaliações ({enrolledStudents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('upload_hub')}
          className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition shrink-0 ${
            activeTab === 'upload_hub'
              ? 'bg-emerald-850 text-white font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Carregar Novo Conteúdo</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition ${
            activeTab === 'exams'
              ? 'bg-emerald-850 text-white font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Meus Exames Cadastrados ({myExams.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('manuals')}
          className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition ${
            activeTab === 'manuals'
              ? 'bg-emerald-850 text-white font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Meus Manuais Publicados ({myManuals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 transition ${
            activeTab === 'videos'
              ? 'bg-emerald-850 text-white font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Minhas Vídeo Aulas ({myVideos.length})</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 0. ALUNOS DA MINHA DISCIPLINA & AVALIAÇÕES */}
      {/* ============================================================ */}
      {activeTab === 'students_evaluations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Turma da Disciplina</div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Alunos Matriculados em {teacher.specialties.join(' & ')} ({enrolledStudents.length})
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Acompanhamento pedagógico, avaliação individual e canal direto de tira-dúvidas.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-lg border border-emerald-300 flex items-center space-x-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{enrolledStudents.length} Aluno(s) Elegíveis</span>
              </span>
            </div>
          </div>

          {/* Privacy & Restriction Rule Box */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 text-xs text-emerald-950 shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-emerald-800 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sm block text-emerald-950">
                Regra de Sigilo e Acesso Exclusivo à Disciplina
              </span>
              <p className="text-emerald-900/90 leading-relaxed text-xs">
                Em estrita conformidade com as normas da plataforma, <strong>o professor só avalia ou tem contacto com os alunos inscritos na sua disciplina ({teacher.specialties.join(', ')})</strong>.
                {otherStudentsCount > 0 && (
                  <> Os restantes <strong>{otherStudentsCount} aluno(s)</strong> cadastrados na plataforma que estão matriculados exclusivamente noutras disciplinas não têm os seus dados expostos nem podem ser contatados por este perfil docente.</>
                )}
              </p>
            </div>
          </div>

          {enrolledStudents.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Nenhum aluno matriculado em {teacher.specialties.join(', ')} no momento
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Assim que novos alunos se inscreverem nas disciplinas de {teacher.specialties.join(', ')} durante o cadastro ou no perfil, eles aparecerão automaticamente aqui para avaliação e orientação.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {enrolledStudents.map(student => {
                const commonSubjects = teacher.specialties.filter(s => (student.enrolledSubjects || ['Matemática']).includes(s));
                const studentAttemptsInSubject = allAttempts.filter(
                  att => att.studentId === student.id && teacher.specialties.includes(att.subject)
                );
                const studentEvaluations = evaluations.filter(
                  ev => ev.teacherId === teacher.id && ev.studentId === student.id
                );
                const studentMessages = academicMessages.filter(
                  msg => msg.teacherId === teacher.id && msg.studentId === student.id
                );

                const avgScore = studentAttemptsInSubject.length > 0
                  ? (studentAttemptsInSubject.reduce((acc, curr) => acc + curr.score, 0) / studentAttemptsInSubject.length).toFixed(1)
                  : null;

                return (
                  <div
                    key={student.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-5 hover:border-emerald-700/60 transition"
                  >
                    {/* Student Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-12 h-12 rounded-xl bg-emerald-850 text-amber-300 font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-emerald-950 shadow-2xs">
                          {student.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                              {student.name}
                            </h3>
                            <span className="bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                              <Check className="w-3 h-3 text-emerald-800" />
                              <span>Inscrito em {commonSubjects.join(', ')}</span>
                            </span>
                          </div>

                          <div className="text-xs text-stone-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span>Alvo: <strong className="text-stone-800 font-semibold">{student.targetUniversity}</strong> ({student.targetCourse})</span>
                            <span>·</span>
                            <span>Escola: <strong className="text-stone-800">{student.secondarySchool || 'ESG'}</strong> ({student.province || 'Moçambique'})</span>
                          </div>
                        </div>
                      </div>

                      {/* Fast Action Buttons */}
                      <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setEvaluatingStudent(student);
                            setEvalSubject(commonSubjects[0] || teacher.specialties[0]);
                            setEvalScore(15.0);
                            setEvalQualitative('Bom');
                            setEvalComment('');
                            setEvalAction('');
                          }}
                          className="px-3.5 py-2 bg-emerald-850 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-300" />
                          <span>Lançar Avaliação</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setChatStudent(student);
                            setChatMessageText('');
                          }}
                          className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition border border-stone-300 flex items-center space-x-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Contacto / Mensagens</span>
                          {studentMessages.length > 0 && (
                            <span className="bg-emerald-800 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                              {studentMessages.length}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Stats & Diagnostic in Teacher's Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                        <span className="text-stone-500 text-[11px] block">Simulados na sua Disciplina</span>
                        <div className="font-serif font-bold text-lg text-stone-900">
                          {studentAttemptsInSubject.length} <span className="text-xs font-sans font-normal text-stone-500">realizados</span>
                        </div>
                        <span className="text-[10px] text-stone-400 block">Exames e provas oficiais de {commonSubjects.join(', ')}</span>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                        <span className="text-stone-500 text-[11px] block">Média Obtida em {commonSubjects.join(', ')}</span>
                        <div className="font-serif font-bold text-lg text-emerald-800">
                          {avgScore ? `${avgScore} / 20` : 'Sem simulados'}
                        </div>
                        <span className="text-[10px] text-stone-400 block">Calculada com base nas resoluções da sua matéria</span>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                        <span className="text-stone-500 text-[11px] block">Contacto Directo do Aluno</span>
                        <div className="text-xs font-medium text-stone-800 truncate">
                          {student.email}
                        </div>
                        <span className="text-[11px] text-stone-500 font-mono">{student.phone || '+258 84 ...'}</span>
                      </div>
                    </div>

                    {/* History of Teacher Evaluations for this Student */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Suas Avaliações Registadas para {student.name} ({studentEvaluations.length})</span>
                        </h4>
                        <span className="text-[11px] text-stone-400">Visível no boletim pessoal do aluno</span>
                      </div>

                      {studentEvaluations.length === 0 ? (
                        <div className="p-4 bg-stone-50/70 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-500 space-y-1">
                          <p>Você ainda não emitiu uma avaliação formal para este estudante.</p>
                          <p className="text-[11px] text-stone-400">
                            Clique em <strong>"Lançar Avaliação"</strong> acima para atribuir uma nota de 0 a 20 e fornecer parecer fundamentado.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {studentEvaluations.map(ev => (
                            <div
                              key={ev.id}
                              className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="font-serif font-bold text-emerald-950 text-sm">
                                    Nota: {ev.scoreValores} / 20
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    ev.qualitativeAssessment === 'Excelente' || ev.qualitativeAssessment === 'Bom'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : ev.qualitativeAssessment === 'Suficiente'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {ev.qualitativeAssessment}
                                  </span>
                                  <span className="text-[11px] text-stone-400">· Disciplina: {ev.subject}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <span className="text-[11px] text-stone-400">{ev.date}</span>
                                  {onDeleteEvaluation && (
                                    <button
                                      type="button"
                                      onClick={() => onDeleteEvaluation(ev.id)}
                                      className="text-stone-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50"
                                      title="Remover avaliação"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              <p className="text-stone-700 leading-relaxed">
                                <strong className="text-stone-900 font-semibold">Parecer Docente:</strong> {ev.feedbackComment}
                              </p>

                              {ev.suggestedAction && (
                                <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg text-emerald-950 text-[11px] flex items-center space-x-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                                  <span><strong>Recomendação de Estudo:</strong> {ev.suggestedAction}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. UPLOAD HUB: CARREGAMENTO RÁPIDO (SEM FORMULÁRIOS LONGOS) */}
      {/* ============================================================ */}
      {activeTab === 'upload_hub' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Publicação Direta</div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Carregar Arquivo de Conteúdo
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Sem formulários extensos: anexe o arquivo (PDF, vídeo ou documento), informe o <strong>tema</strong> e a <strong>disciplina</strong>.
              </p>
            </div>

            {/* Category Selector Buttons */}
            <div className="inline-flex p-1 bg-stone-100 rounded-xl space-x-1 text-xs shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setUploadCategory('exam')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${
                  uploadCategory === 'exam'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Exame Oficial</span>
              </button>

              <button
                type="button"
                onClick={() => setUploadCategory('manual')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${
                  uploadCategory === 'manual'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Manual Teórico</span>
              </button>

              <button
                type="button"
                onClick={() => setUploadCategory('video')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${
                  uploadCategory === 'video'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Vídeo Aula</span>
              </button>
            </div>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            
            {/* STEP 1: DRAG & DROP FILE ZONE */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                <span>1. Carregar Arquivo {uploadCategory === 'exam' ? 'do Exame (PDF ou Documento)' : uploadCategory === 'manual' ? 'do Manual (PDF ou Documento)' : 'da Vídeo Aula (Vídeo MP4 ou link)'} *</span>
                <span className="text-[11px] font-normal text-stone-500">
                  {uploadCategory === 'video' ? 'Formatos: MP4, WebM, MKV' : 'Formatos: PDF, DOCX, TXT, Imagens'}
                </span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept={uploadCategory === 'video' ? 'video/*' : '.pdf,.docx,.doc,.txt,image/*'}
                onChange={handleFileInputChange}
                className="hidden"
              />

              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                    isDragging
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-stone-300 hover:border-emerald-700 bg-stone-50/60 hover:bg-stone-50'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-2xs">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                    Clique para selecionar ou arraste o arquivo aqui
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    {uploadCategory === 'exam' && 'Anexe a prova oficial digitalizada da universidade.'}
                    {uploadCategory === 'manual' && 'Anexe a apostila, resumo ou guia teórico em PDF.'}
                    {uploadCategory === 'video' && 'Anexe a gravação em vídeo da resolução comentada.'}
                  </p>
                  <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-stone-200 text-stone-700 rounded-lg text-xs font-semibold shadow-2xs">
                    <span>Selecionar arquivo do computador</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      {uploadCategory === 'video' ? <Film className="w-5 h-5" /> : <File className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-stone-900 truncate max-w-xs sm:max-w-md">
                        {selectedFile.name}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center space-x-2">
                        <span>{formatFileSize(selectedFile.size)}</span>
                        <span>·</span>
                        <span className="text-emerald-800 font-semibold flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>Arquivo carregado com sucesso</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={clearSelectedFile}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-white transition"
                    title="Remover arquivo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* STEP 2 & 3: TEMA E DISCIPLINA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Tema */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">
                  2. Tema {uploadCategory === 'exam' ? 'do Exame' : uploadCategory === 'manual' ? 'do Manual' : 'da Vídeo Aula'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    uploadCategory === 'exam' 
                      ? 'Ex: Exame de Admissão de Matemática UEM 2026'
                      : uploadCategory === 'manual'
                      ? 'Ex: Manual de Ondas, Óptica e Eletricidade'
                      : 'Ex: Resolução Comentada de Geometria Espacial'
                  }
                  value={contentTheme}
                  onChange={(e) => setContentTheme(e.target.value)}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-hidden focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 bg-white"
                />
                <span className="text-[10px] text-stone-400">
                  Título ou descrição temático que identifica o material para os alunos.
                </span>
              </div>

              {/* Disciplina */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">
                  3. Disciplina *
                </label>
                <select
                  value={contentSubject}
                  onChange={(e) => setContentSubject(e.target.value)}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 font-medium"
                >
                  {SUBJECTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span className="text-[10px] text-stone-400">
                  Área do conhecimento à qual o arquivo pertence.
                </span>
              </div>

            </div>

            {/* Optional Fast University for Exams */}
            {uploadCategory === 'exam' && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-stone-700 font-medium">Universidade de Destino:</span>
                <select
                  value={examUniCode}
                  onChange={(e) => setExamUniCode(e.target.value as any)}
                  className="text-xs p-2 border border-stone-300 rounded-lg bg-white"
                >
                  {UNIVERSITIES.map(u => (
                    <option key={u.code} value={u.code}>{u.code} - {u.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
              <span className="text-[11px] text-stone-500">
                O arquivo ficará imediatamente disponível para todos os alunos na respetiva secção.
              </span>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-850 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>
                  {uploadCategory === 'exam' ? 'Publicar Exame Imediatamente' : uploadCategory === 'manual' ? 'Publicar Manual Imediatamente' : 'Publicar Vídeo Aula Imediatamente'}
                </span>
              </button>
            </div>

          </form>

        </div>
      )}

      {/* ============================================================ */}
      {/* 2. SUB-VIEW: EXAMS MANAGEMENT */}
      {/* ============================================================ */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Repositório de Avaliações Próprias</div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Meus Exames Cadastrados ({myExams.length})</h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Apenas os exames introduzidos por si ({teacher.name}) são exibidos aqui.
              </p>
            </div>

            <button
              onClick={() => {
                setUploadCategory('exam');
                setActiveTab('upload_hub');
              }}
              className="px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-2 shrink-0 self-start sm:self-auto"
            >
              <UploadCloud className="w-4 h-4" />
              <span>+ Carregar Novo Exame</span>
            </button>
          </div>

          {myExams.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Nenhum exame cadastrado por si ainda
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Para garantir total confidencialidade, os exames cadastrados por outros professores não são exibidos na sua conta. Clique no botão abaixo para carregar seu arquivo com tema e disciplina.
              </p>
              <button
                onClick={() => {
                  setUploadCategory('exam');
                  setActiveTab('upload_hub');
                }}
                className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Carregar Meu Primeiro Exame</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-200">
              {myExams.map((exam) => (
                <div key={exam.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/60 transition">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[11px]">
                        {exam.universityCode}
                      </span>
                      <span className="bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded text-[11px]">
                        {exam.subject}
                      </span>
                      <span className="text-xs font-serif font-semibold text-stone-500">
                        Ano: {exam.year}
                      </span>
                      {exam.fileMeta && (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                          <File className="w-3 h-3" />
                          <span>Arquivo: {exam.fileMeta.name} ({exam.fileMeta.size})</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                      {exam.title}
                    </h4>

                    <p className="text-xs text-stone-500 line-clamp-1">
                      {exam.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {exam.fileMeta?.url && (
                      <a
                        href={exam.fileMeta.url}
                        download={exam.fileMeta.name}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg border border-stone-200 transition flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setDeleteModal({ type: 'exam', id: exam.id, title: exam.title })}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition flex items-center space-x-1"
                      title="Eliminar exame"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. SUB-VIEW: MANUALS MANAGEMENT */}
      {/* ============================================================ */}
      {activeTab === 'manuals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Biblioteca Teórica Própria</div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Meus Manuais Publicados ({myManuals.length})</h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Apostilas e sínteses de estudo publicadas pelo seu perfil docente.
              </p>
            </div>

            <button
              onClick={() => {
                setUploadCategory('manual');
                setActiveTab('upload_hub');
              }}
              className="px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-2 shrink-0 self-start sm:self-auto"
            >
              <UploadCloud className="w-4 h-4" />
              <span>+ Carregar Novo Manual</span>
            </button>
          </div>

          {myManuals.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Nenhum manual publicado por si ainda
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Manuais elaborados por outros professores não são partilhados no seu painel privado. Carregue um documento PDF ou guia de estudo para disponibilizar aos alunos.
              </p>
              <button
                onClick={() => {
                  setUploadCategory('manual');
                  setActiveTab('upload_hub');
                }}
                className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Carregar Meu Primeiro Manual</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-200">
              {myManuals.map((manual) => (
                <div key={manual.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/60 transition">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px]">
                        {manual.subject}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        Foco: {manual.universityFocus}
                      </span>
                      {manual.fileMeta && (
                        <span className="bg-stone-100 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                          <File className="w-3 h-3" />
                          <span>Arquivo: {manual.fileMeta.name} ({manual.fileMeta.size})</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                      {manual.title}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {manual.fileMeta?.url && (
                      <a
                        href={manual.fileMeta.url}
                        download={manual.fileMeta.name}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg border border-stone-200 transition flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setDeleteModal({ type: 'manual', id: manual.id, title: manual.title })}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition flex items-center space-x-1"
                      title="Eliminar manual"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. SUB-VIEW: VIDEO LESSONS MANAGEMENT */}
      {/* ============================================================ */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Videoteca Acadêmica Própria</div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Minhas Vídeo Aulas ({myVideos.length})</h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Aulas e resoluções multimídia ministradas pelo seu perfil ({teacher.name}).
              </p>
            </div>

            <button
              onClick={() => {
                setUploadCategory('video');
                setActiveTab('upload_hub');
              }}
              className="px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-2 shrink-0 self-start sm:self-auto"
            >
              <UploadCloud className="w-4 h-4" />
              <span>+ Carregar Nova Vídeo Aula</span>
            </button>
          </div>

          {myVideos.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Nenhuma vídeo aula cadastrada por si ainda
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Vídeo aulas enviadas por outros docentes não aparecem no seu painel privado. Anexe um arquivo de vídeo com tema e disciplina para começar.
              </p>
              <button
                onClick={() => {
                  setUploadCategory('video');
                  setActiveTab('upload_hub');
                }}
                className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Carregar Minha Primeira Vídeo Aula</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-200">
              {myVideos.map((video) => (
                <div key={video.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/60 transition">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-900 font-bold px-2 py-0.5 rounded text-[11px]">
                        {video.subject}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        {video.instructor} · {video.institution}
                      </span>
                      {video.fileMeta && (
                        <span className="bg-stone-100 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                          <Film className="w-3 h-3" />
                          <span>Arquivo: {video.fileMeta.name} ({video.fileMeta.size})</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                      {video.title}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setDeleteModal({ type: 'video', id: video.id, title: video.title })}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition flex items-center space-x-1"
                      title="Eliminar vídeo aula"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* CONFIRMATION MODAL FOR DELETION */}
      {/* ============================================================ */}
      {deleteModal && (
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
                Tem a certeza que deseja eliminar {deleteModal.type === 'exam' ? 'o exame' : deleteModal.type === 'manual' ? 'o manual' : 'a vídeo aula'}:
              </p>
              <div className="p-3 bg-stone-100 rounded-lg font-serif font-semibold text-xs text-stone-900">
                "{deleteModal.title}"
              </div>
              <p className="text-[11px] text-rose-600 font-medium">
                Esta ação removerá o conteúdo permanentemente da plataforma.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Eliminar Permanentemente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: LANÇAR AVALIAÇÃO OFICIAL DO PROFESSOR */}
      {/* ============================================================ */}
      {evaluatingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Avaliação Docente Oficial</span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Avaliar Desempenho de {evaluatingStudent.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEvaluatingStudent(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Disciplina da Avaliação *</label>
                  <select
                    value={evalSubject}
                    onChange={(e) => setEvalSubject(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white"
                  >
                    {teacher.specialties.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Nota Atribuída (0 a 20) *</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="20"
                    required
                    value={evalScore}
                    onChange={(e) => setEvalScore(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg font-serif font-bold text-emerald-950"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Conceito Qualitativo</label>
                <select
                  value={evalQualitative}
                  onChange={(e) => setEvalQualitative(e.target.value as any)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white"
                >
                  <option value="Excelente">Excelente (17.0 - 20.0)</option>
                  <option value="Bom">Bom (14.0 - 16.5)</option>
                  <option value="Suficiente">Suficiente (10.0 - 13.5)</option>
                  <option value="Necessita Apoio">Necessita Apoio (7.0 - 9.5)</option>
                  <option value="Insuficiente">Insuficiente (0.0 - 6.5)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Parecer Pedagógico e Diagnóstico *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ex: Demonstrou bom raciocínio analítico nas questões resolvidas, mas precisa de reforço no estudo do domínio de definições..."
                  value={evalComment}
                  onChange={(e) => setEvalComment(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Orientação / Recomendação Prática de Estudo</label>
                <input
                  type="text"
                  placeholder="Ex: Rever capítulo 2 do Manual de Funções e refazer questões 5 e 6 da prova 2024"
                  value={evalAction}
                  onChange={(e) => setEvalAction(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setEvaluatingStudent(null)}
                  className="flex-1 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-850 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Gravar Avaliação</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL / DRAWER: CANAL DE CONTACTO DIRETO PEDAGÓGICO */}
      {/* ============================================================ */}
      {chatStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Canal Direto Docente-Aluno</span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Contacto Pedagógico: {chatStudent.name}
                </h3>
                <span className="text-xs text-emerald-800 font-medium">
                  Disciplina: {teacher.specialties.join(', ')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setChatStudent(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-[220px]">
              {academicMessages.filter(
                m => m.studentId === chatStudent.id && m.teacherId === teacher.id
              ).length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400 space-y-1">
                  <MessageSquare className="w-8 h-8 mx-auto text-stone-300" />
                  <p>Nenhuma mensagem trocada ainda com {chatStudent.name}.</p>
                  <p className="text-[11px]">Envie uma mensagem pedagógica ou responda a dúvidas do estudante abaixo.</p>
                </div>
              ) : (
                academicMessages
                  .filter(m => m.studentId === chatStudent.id && m.teacherId === teacher.id)
                  .map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.senderRole === 'teacher' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-stone-400 mb-0.5 px-1">
                        {msg.senderRole === 'teacher' ? `Você (${teacher.name})` : chatStudent.name} · {msg.timestamp}
                      </div>
                      <div
                        className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                          msg.senderRole === 'teacher'
                            ? 'bg-emerald-850 text-white rounded-tr-xs'
                            : 'bg-stone-100 text-stone-900 rounded-tl-xs border border-stone-200'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendChatMessage} className="pt-3 border-t border-stone-100 flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Mensagem para ${chatStudent.name.split(' ')[0]} sobre ${teacher.specialties[0]}...`}
                value={chatMessageText}
                onChange={(e) => setChatMessageText(e.target.value)}
                className="flex-1 text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-hidden focus:border-emerald-800"
              />
              <button
                type="submit"
                disabled={!chatMessageText.trim()}
                className="px-4 py-2.5 bg-emerald-850 hover:bg-emerald-950 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
