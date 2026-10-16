import React, { useState } from 'react';
import { UserRole, StudentProfile, TeacherProfile, UserAccount } from '../types';
import { UNIVERSITIES, SUBJECTS, MOZ_PROVINCES, INITIAL_REGISTERED_ACCOUNTS } from '../data/mockData';
import { 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  X,
  Users,
  UserPlus,
  Lock,
  Award
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLogin: (account: UserAccount) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  initialRole = 'student'
}) => {
  const [mode, setMode] = useState<'register' | 'switch'>('register');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

  // List of all registered accounts (synced with localStorage)
  const [allAccounts, setAllAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('em_all_registered_accounts');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_ACCOUNTS;
    } catch {
      return INITIAL_REGISTERED_ACCOUNTS;
    }
  });

  const saveAccountToList = (acc: UserAccount) => {
    setAllAccounts(prev => {
      const updated = [acc, ...prev.filter(a => a.id !== acc.id && a.email !== acc.email)];
      try {
        localStorage.setItem('em_all_registered_accounts', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Student Form Fields
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('+258 ');
  const [studentUniversity, setStudentUniversity] = useState(UNIVERSITIES[0].name);
  const [studentCourse, setStudentCourse] = useState('Engenharia Informática');
  const [studentYear, setStudentYear] = useState<number>(2025);
  const [studentCutoffScore, setStudentCutoffScore] = useState<number>(14.5);
  const [studentSchool, setStudentSchool] = useState('Escola Secundária Josina Machel');
  const [studentProvince, setStudentProvince] = useState(MOZ_PROVINCES[0]);
  const [studentSubjects, setStudentSubjects] = useState<string[]>(['Matemática']);

  const toggleStudentSubject = (sub: string) => {
    if (studentSubjects.includes(sub)) {
      if (studentSubjects.length > 1) {
        setStudentSubjects(studentSubjects.filter(s => s !== sub));
      }
    } else {
      setStudentSubjects([...studentSubjects, sub]);
    }
  };

  // Teacher Form Fields
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('+258 ');
  const [teacherInstitution, setTeacherInstitution] = useState('Universidade Eduardo Mondlane (UEM)');
  const [teacherRank, setTeacherRank] = useState('Docente Universitário / Preparador de Exames');
  const [teacherSpecialties, setTeacherSpecialties] = useState<string[]>(['Matemática']);
  const [teacherBio, setTeacherBio] = useState('Docente experiente na elaboração de matrizes e resolução comentada de exames nacionais.');
  const [teacherStaffId, setTeacherStaffId] = useState('');

  // Form error
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSpecialty = (sub: string) => {
    if (teacherSpecialties.includes(sub)) {
      if (teacherSpecialties.length > 1) {
        setTeacherSpecialties(teacherSpecialties.filter(s => s !== sub));
      }
    } else {
      setTeacherSpecialties([...teacherSpecialties, sub]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (selectedRole === 'student') {
      if (!studentName.trim() || !studentEmail.trim() || !studentCourse.trim()) {
        setErrorMsg('Por favor preencha o Nome, E-mail e Curso Pretendido.');
        return;
      }

      const newStudent: StudentProfile = {
        role: 'student',
        id: `std-${Date.now()}`,
        name: studentName.trim(),
        email: studentEmail.trim(),
        phone: studentPhone.trim(),
        targetUniversity: studentUniversity,
        targetCourse: studentCourse.trim(),
        targetYear: Number(studentYear) || 2025,
        targetCutoffScore: Number(studentCutoffScore) || 14.0,
        secondarySchool: studentSchool.trim(),
        province: studentProvince,
        enrolledSubjects: studentSubjects.length > 0 ? studentSubjects : ['Matemática']
      };

      saveAccountToList(newStudent);
      onLogin(newStudent);
      onClose();
    } else {
      if (!teacherName.trim() || !teacherEmail.trim() || !teacherInstitution.trim()) {
        setErrorMsg('Por favor preencha o Nome, E-mail Institucional e Instituição de Ensino.');
        return;
      }

      const newTeacher: TeacherProfile = {
        role: 'teacher',
        id: `tch-${Date.now()}`,
        name: teacherName.trim(),
        email: teacherEmail.trim(),
        phone: teacherPhone.trim(),
        institution: teacherInstitution.trim(),
        titleOrRank: teacherRank.trim(),
        specialties: teacherSpecialties,
        academicBio: teacherBio.trim(),
        nuitOrStaffId: teacherStaffId.trim()
      };

      saveAccountToList(newTeacher);
      onLogin(newTeacher);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl my-8 overflow-hidden animate-fade-in">
        
        {/* Top Header */}
        <div className="bg-emerald-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-mono tracking-wider uppercase mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Portal Oficial Exame Master · Registo Académico</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Selecione o Tipo de Cadastro
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
            Plataforma adaptada com módulos distintos para estudantes preparandos e professores elaboradores.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`pb-3 px-4 flex items-center space-x-2 border-b-2 transition ${
              mode === 'register'
                ? 'border-emerald-800 text-emerald-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Novo Cadastro (Aluno / Professor)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('switch')}
            className={`pb-3 px-4 flex items-center space-x-2 border-b-2 transition ${
              mode === 'switch'
                ? 'border-emerald-800 text-emerald-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Alternar Conta / Sessão ({allAccounts.length})</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: SWITCH REGISTERED ACCOUNTS */}
        {/* ======================================================== */}
        {mode === 'switch' && (
          <div className="p-6 space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-amber-950">
              <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Privacidade e Isolamento Rigoroso de Dados</span>
                <span className="text-amber-900/90">
                  Os professores cadastrados <strong>não têm acesso aos materiais uns dos outros</strong>. Da mesma forma, os alunos <strong>não podem ver as notas nem o desempenho uns dos outros</strong>. Ao alternar de conta, o ambiente é 100% individual.
                </span>
              </div>
            </div>

            {/* Teacher Accounts Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-emerald-800" />
                <span>Professores Cadastrados</span>
              </div>

              <div className="space-y-2">
                {allAccounts.filter(a => a.role === 'teacher').map((acc) => {
                  const tch = acc as TeacherProfile;
                  const isCurrent = currentUser.id === tch.id;
                  return (
                    <div
                      key={tch.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-50/50 ring-1 ring-amber-400/50'
                          : 'border-stone-200 hover:border-emerald-700 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 border border-amber-200 text-sm">
                          {tch.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif font-bold text-stone-900 text-sm">{tch.name}</span>
                            <span className="bg-amber-200/80 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              Professor
                            </span>
                            {isCurrent && (
                              <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Conta Ativa</span>
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-600 mt-0.5">
                            {tch.institution} · <span className="font-mono text-[11px] text-stone-500">{tch.email}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-stone-500">
                            <span>Disciplinas:</span>
                            {tch.specialties.map(s => (
                              <span key={s} className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700 font-medium">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 self-end sm:self-auto">
                        {isCurrent ? (
                          <span className="text-xs text-stone-400 italic font-medium px-3 py-1.5">
                            Sessão Atual
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onLogin(tch);
                              onClose();
                            }}
                            className="px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                          >
                            <span>Entrar como Professor</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Accounts Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-emerald-800" />
                <span>Alunos Cadastrados</span>
              </div>

              <div className="space-y-2">
                {allAccounts.filter(a => a.role === 'student').map((acc) => {
                  const std = acc as StudentProfile;
                  const isCurrent = currentUser.id === std.id;
                  return (
                    <div
                      key={std.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                        isCurrent
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600/50'
                          : 'border-stone-200 hover:border-emerald-700 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center shrink-0 border border-emerald-200 text-sm">
                          {std.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif font-bold text-stone-900 text-sm">{std.name}</span>
                            <span className="bg-emerald-100 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              Aluno
                            </span>
                            {isCurrent && (
                              <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Conta Ativa</span>
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-600 mt-0.5">
                            Foco: <strong>{std.targetCourse}</strong> ({std.targetUniversity}) · Corte Meta: <strong>{std.targetCutoffScore} valores</strong>
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                            {std.email}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 self-end sm:self-auto">
                        {isCurrent ? (
                          <span className="text-xs text-stone-400 italic font-medium px-3 py-1.5">
                            Sessão Atual
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onLogin(std);
                              onClose();
                            }}
                            className="px-4 py-2 bg-emerald-850 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                          >
                            <span>Entrar como Aluno</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions in Switch Mode */}
            <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setMode('register')}
                className="px-4 py-2 border border-emerald-800 text-emerald-900 hover:bg-emerald-50 rounded-lg text-xs font-bold transition flex items-center space-x-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Cadastrar Outra Conta</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: REGISTER NEW ACCOUNT */}
        {/* ======================================================== */}
        {mode === 'register' && (
          <>
            {/* Role Selector Tabs */}
            <div className="p-6 pb-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    selectedRole === 'student'
                      ? 'border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-700/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedRole === 'student' ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    {selectedRole === 'student' && (
                      <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Selecionado
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="font-serif font-bold text-base text-stone-900">Cadastro de Aluno</div>
                    <div className="text-xs text-stone-600 mt-0.5">
                      Acesso a simulados cronometrados, diagnósticos individuais, notas privadas e metas de admissão.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    selectedRole === 'teacher'
                      ? 'border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-700/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedRole === 'teacher' ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {selectedRole === 'teacher' && (
                      <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Selecionado
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="font-serif font-bold text-base text-stone-900">Cadastro de Professor</div>
                    <div className="text-xs text-stone-600 mt-0.5">
                      Área docente exclusiva para upload de exames, manuais teóricos e vídeo aulas próprias com tema e disciplina.
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-4">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-lg flex items-center space-x-2">
              <span className="font-bold">Atenção:</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* STUDENT FIELDS */}
          {/* ======================================================== */}
          {selectedRole === 'student' && (
            <div className="space-y-4">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>
                  O perfil de aluno configura o acompanhamento personalizado das suas notas de corte e exames de treino.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Nome Completo do Aluno *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Armando Cossa"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">E-mail Académico ou Pessoal *</label>
                  <input
                    type="email"
                    required
                    placeholder="aluno@exemplo.ac.mz"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Telefone / Contacto M-Pesa / e-Mola</label>
                  <input
                    type="text"
                    placeholder="+258 84 000 0000"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Província de Residência</label>
                  <select
                    value={studentProvince}
                    onChange={(e) => setStudentProvince(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:border-emerald-800"
                  >
                    {MOZ_PROVINCES.map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Universidade Alvo *</label>
                  <select
                    value={studentUniversity}
                    onChange={(e) => setStudentUniversity(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:border-emerald-800"
                  >
                    {UNIVERSITIES.map(u => (
                      <option key={u.code} value={u.name}>{u.name} ({u.code})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Curso Pretendido *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Engenharia Informática, Medicina Geral, Direito..."
                    value={studentCourse}
                    onChange={(e) => setStudentCourse(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Escola Secundária de Origem</label>
                  <input
                    type="text"
                    placeholder="Ex: ESG Josina Machel, Francisco Manyanga"
                    value={studentSchool}
                    onChange={(e) => setStudentSchool(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Ano do Exame</label>
                  <input
                    type="number"
                    min="2024"
                    max="2030"
                    value={studentYear}
                    onChange={(e) => setStudentYear(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Meta de Corte (0 a 20)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="10"
                    max="20"
                    value={studentCutoffScore}
                    onChange={(e) => setStudentCutoffScore(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>
              </div>

              {/* Disciplinas em que se inscreve */}
              <div className="space-y-1.5 pt-1 border-t border-stone-100">
                <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                  <span>Disciplinas em que se Inscreve para Acompanhamento e Avaliação *</span>
                  <span className="text-[11px] font-normal text-emerald-800 font-semibold">
                    {studentSubjects.length} selecionada(s)
                  </span>
                </label>
                <p className="text-[11px] text-stone-500">
                  Importante: <strong>O professor só avalia e tem contacto com os alunos inscritos na sua disciplina</strong>. Selecione as matérias do seu exame de admissão:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUBJECTS.map(sub => {
                    const isSelected = studentSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleStudentSubject(sub)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-emerald-850 text-white border-emerald-950 shadow-2xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                        <span>{sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TEACHER FIELDS */}
          {/* ======================================================== */}
          {selectedRole === 'teacher' && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  O perfil de professor desbloqueia o <strong>Painel Docente</strong> com ferramentas para criar novas questões comentadas, elaborar manuais didácticos e gerir turmas de preparação.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Nome do Docente / Professor *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Prof. Dr. Alberto Mabjaia"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">E-mail Institucional ou Profissional *</label>
                  <input
                    type="email"
                    required
                    placeholder="docente@universidade.ac.mz"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Instituição de Ensino / Faculdade *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Faculdade de Ciências - UEM / ESG Polana"
                    value={teacherInstitution}
                    onChange={(e) => setTeacherInstitution(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Cargo / Titulação Académica</label>
                  <input
                    type="text"
                    placeholder="Ex: Mestre em Ensino de Física, Professor Assistente"
                    value={teacherRank}
                    onChange={(e) => setTeacherRank(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Disciplinas de Especialidade (selecione as que leciona):</label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUBJECTS.map(sub => {
                    const isChecked = teacherSpecialties.includes(sub);
                    return (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => toggleSpecialty(sub)}
                        className={`px-3 py-1 text-xs rounded-full border transition ${
                          isChecked
                            ? 'bg-emerald-800 text-white border-emerald-900 font-semibold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {isChecked && '✓ '}
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Contacto Directo (WhatsApp / Chamada)</label>
                  <input
                    type="text"
                    placeholder="+258 82 000 0000"
                    value={teacherPhone}
                    onChange={(e) => setTeacherPhone(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">NUIT ou Nº Mecanográfico / Registro</label>
                  <input
                    type="text"
                    placeholder="Ex: 104882910"
                    value={teacherStaffId}
                    onChange={(e) => setTeacherStaffId(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Biografia Académica & Experiência com Admissões</label>
                <textarea
                  rows={2}
                  placeholder="Descreva a sua experiência docente e preparação para exames de admissão..."
                  value={teacherBio}
                  onChange={(e) => setTeacherBio(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-800 resize-none"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-stone-500 text-center sm:text-left">
              Os dados de cadastro são preservados em armazenamento local seguro.
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-medium"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2 bg-emerald-850 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5 transition"
              >
                <span>Concluir Cadastro ({selectedRole === 'student' ? 'Aluno' : 'Professor'})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
        </>
      )}

      </div>
    </div>
  );
};
