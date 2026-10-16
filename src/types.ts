export interface Option {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  examId: string;
  university: string;
  subject: string;
  year: number;
  statement: string;
  options: Option[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: {
    summary: string;
    steps: string[];
    keyFormulaOrConcept?: string;
  };
  topic: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  videoLessonId?: string;
}

export interface UploadedFileMeta {
  name: string;
  size: string;
  type: string;
  url?: string;
  uploadedAt: string;
}

export interface Exam {
  id: string;
  title: string;
  university: string;
  universityCode: 'UEM' | 'UP' | 'UniZambeze' | 'UJC' | 'UniLúrio' | 'ISRI';
  subject: string;
  year: number;
  durationMinutes: number;
  totalQuestions: number;
  passingScoreSuggestion: number; // e.g. 13.5 out of 20
  description: string;
  questions: Question[];
  fileMeta?: UploadedFileMeta;
  fileUrl?: string;
  authorId?: string;
  authorName?: string;
  authorInstitution?: string;
  authorEmail?: string;
}

export interface StudyManual {
  id: string;
  subject: string;
  title: string;
  universityFocus: string;
  readTimeMinutes: number;
  chapters: {
    title: string;
    content: string[];
    keyFormulas?: string[];
    tips?: string;
  }[];
  fileMeta?: UploadedFileMeta;
  fileUrl?: string;
  authorId?: string;
  authorName?: string;
  authorInstitution?: string;
  authorEmail?: string;
}

export interface VideoLesson {
  id: string;
  title: string;
  subject: string;
  instructor: string;
  institution: string;
  duration: string;
  description: string;
  videoUrl: string;
  topicsCovered: string[];
  chapters: { time: string; label: string }[];
  fileMeta?: UploadedFileMeta;
  authorId?: string;
  authorName?: string;
  authorInstitution?: string;
  authorEmail?: string;
}

export type UserRole = 'student' | 'teacher';

export interface StudentProfile {
  role: 'student';
  id: string;
  name: string;
  email: string;
  phone?: string;
  targetUniversity: string;
  targetCourse: string;
  targetYear: number;
  targetCutoffScore: number; // e.g. 14.5
  secondarySchool?: string; // e.g. Escola Secundária Josina Machel
  province?: string; // e.g. Maputo Cidade, Sofala, Nampula
  enrolledSubjects?: string[]; // Disciplinas em que o aluno está oficialmente inscrito para avaliação
}

export interface TeacherProfile {
  role: 'teacher';
  id: string;
  name: string;
  email: string;
  phone?: string;
  institution: string; // e.g. Universidade Eduardo Mondlane (UEM), Escola Secundária da Polana
  titleOrRank?: string; // e.g. Docente Universitário, Professor Assistente, Mestre em Educação
  specialties: string[]; // e.g. ['Matemática', 'Física']
  academicBio?: string;
  nuitOrStaffId?: string;
}

export type UserAccount = StudentProfile | TeacherProfile;

export interface UserTarget {
  name: string;
  email: string;
  targetUniversity: string;
  targetCourse: string;
  targetYear: number;
  targetCutoffScore: number; // e.g. 14.5
}

export interface ExamAttemptRecord {
  id: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  examId: string;
  examTitle: string;
  university: string;
  subject: string;
  date: string;
  score: number; // out of 20
  percentage: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
}

export interface TeacherEvaluation {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherInstitution: string;
  studentId: string;
  studentName: string;
  subject: string;
  date: string;
  scoreValores: number; // 0 to 20 valores
  qualitativeAssessment: 'Excelente' | 'Bom' | 'Suficiente' | 'Necessita Apoio' | 'Insuficiente';
  feedbackComment: string;
  suggestedAction: string;
}

export interface AcademicContactMessage {
  id: string;
  subject: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  senderId: string;
  senderRole: 'student' | 'teacher';
  message: string;
  timestamp: string;
}
