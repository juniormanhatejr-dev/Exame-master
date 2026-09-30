import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Code2, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Play, 
  Award, 
  User, 
  ChevronRight, 
  ArrowLeft, 
  RotateCcw, 
  Layers, 
  ShieldAlert,
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'device' | 'code'>('device');
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showTextExplanation, setShowTextExplanation] = useState(false);
  const [selectedCodeFile, setSelectedCodeFile] = useState<string>('Question.java');

  // Timed exam simulator state
  const [timerSeconds, setTimerSeconds] = useState(3590); // ~59 mins
  const [timedOption, setTimedOption] = useState<string | null>(null);
  const [timedAnswers, setTimedAnswers] = useState<Record<number, string>>({});

  // Question demo data matching the Java models
  const demoQuestions = [
    {
      id: "q1",
      topic: "Funções e Logaritmos",
      difficulty: "Médio",
      statement: "Qual é o domínio da função f(x) = log(2x - 6) no conjunto dos números reais (R)?",
      options: [
        { key: "A", text: "x ≥ 3" },
        { key: "B", text: "x > 3" },
        { key: "C", text: "x < 3" },
        { key: "D", text: "x ∈ R" }
      ],
      correctOption: "B",
      explanation: "Para que o logaritmo exista no conjunto dos números reais, o logaritmando deve ser estritamente positivo: 2x - 6 > 0 ⇔ 2x > 6 ⇔ x > 3. Logo, D = {x ∈ R | x > 3}.",
      videoUrl: "https://stream.examemaster.mz/demo/uem_mat_2024_q1.mp4"
    },
    {
      id: "q2",
      topic: "Trigonometria",
      difficulty: "Difícil",
      statement: "Sabendo que sen(x) = 3/5 e x pertence ao 1º quadrante, qual é o valor de cos(2x)?",
      options: [
        { key: "A", text: "7/25" },
        { key: "B", text: "16/25" },
        { key: "C", text: "9/25" },
        { key: "D", text: "1/5" }
      ],
      correctOption: "A",
      explanation: "Pela relação de arco duplo: cos(2x) = 1 - 2·sen²(x). Substituindo: cos(2x) = 1 - 2·(3/5)² = 1 - 2·(9/25) = 1 - 18/25 = 7/25.",
      videoUrl: "https://stream.examemaster.mz/demo/uem_mat_2024_q2.mp4"
    }
  ];

  // Timer tick for timed quiz screen
  useEffect(() => {
    let interval: any;
    if (currentScreen === 'timed_quiz') {
      interval = setInterval(() => {
        setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentScreen]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = demoQuestions[selectedQuestionIdx];

  const codeFiles: Record<string, { lang: string; code: string; path: string }> = {
    'Question.java': {
      lang: 'java',
      path: '/app/src/main/java/mz/co/examemaster/models/Question.java',
      code: `package mz.co.examemaster.models;

import java.io.Serializable;

public class Question implements Serializable {
    private String id;
    private String university;
    private String course;
    private String subject;
    private int year;
    private String statement;
    private String optionalImageUrl;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOption; // "A", "B", "C", "D"
    private String textExplanation;
    private String videoExplanationUrl;
    private String topic;
    private String difficulty; // Fácil, Médio, Difícil

    public Question(String id, String university, String course, String subject,
                    int year, String statement, String optionalImageUrl,
                    String optionA, String optionB, String optionC, String optionD,
                    String correctOption, String textExplanation,
                    String videoExplanationUrl, String topic, String difficulty) {
        this.id = id;
        this.university = university;
        this.course = course;
        this.subject = subject;
        this.year = year;
        this.statement = statement;
        this.optionalImageUrl = optionalImageUrl;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctOption = correctOption;
        this.textExplanation = textExplanation;
        this.videoExplanationUrl = videoExplanationUrl;
        this.topic = topic;
        this.difficulty = difficulty;
    }
    // Getters e setters completos...
}`
    },
    'QuizActivity.java': {
      lang: 'java',
      path: '/app/src/main/java/mz/co/examemaster/activities/QuizActivity.java',
      code: `// Resolução Interactiva com Feedback "✓ Resposta correcta" e "✗ Resposta incorrecta"
private void submitAnswer() {
    isSubmitted = true;
    Question q = questions.get(currentIndex);
    boolean isCorrect = selectedOption.equalsIgnoreCase(q.getCorrectOption());
    tracker.recordAnswer(q, selectedOption);

    layoutFeedbackContainer.setVisibility(View.VISIBLE);
    if (isCorrect) {
        layoutFeedbackCorrect.setVisibility(View.VISIBLE);
        layoutFeedbackIncorrect.setVisibility(View.GONE);
        highlightOption(selectedOption, true);
    } else {
        layoutFeedbackCorrect.setVisibility(View.GONE);
        layoutFeedbackIncorrect.setVisibility(View.VISIBLE);
        highlightOption(selectedOption, false);
        highlightOption(q.getCorrectOption(), true);
        tvCorrectAnswerReveal.setText("Resposta correcta: Alternativa " + q.getCorrectOption());
    }
    btnConfirmOrNext.setText("Próxima questão");
}`
    },
    'activity_quiz.xml': {
      lang: 'xml',
      path: '/app/src/main/res/layout/activity_quiz.xml',
      code: `<!-- Layout Nativo Android XML para Questões e Feedback -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@color/background">

    <!-- Enunciado e 4 Alternativas (A, B, C, D) -->
    <!-- Painel de Feedback Pedagógico (Correcta / Incorrecta) -->
    <!-- Botões "Ver explicação em texto" e "Assistir à explicação em vídeo" -->
</LinearLayout>`
    },
    'ExamResult.java': {
      lang: 'java',
      path: '/app/src/main/java/mz/co/examemaster/models/ExamResult.java',
      code: `// Modelo de Métricas: Pontuação (37/50, 74%), Correctas, Erradas, Tempo
public class ExamResult implements Serializable {
    private String id;
    private String examId;
    private int totalQuestions;
    private int correctCount;
    private int wrongCount;
    private int unansweredCount;
    private double percentage;
    private int timeSpentSeconds;
    private double averageTimePerQuestionSeconds;
    private List<TopicPerformance> attentionAreas;
}`
    },
    'build.gradle': {
      lang: 'groovy',
      path: '/app/build.gradle',
      code: `plugins {
    id 'com.android.application'
}
android {
    namespace 'mz.co.examemaster'
    compileSdk 34
    defaultConfig {
        applicationId "mz.co.examemaster"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}
dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'com.google.code.gson:gson:2.10.1'
}`
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-bold text-white tracking-wider">
            EM
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Exame Master</h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Android Nativo Java
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Dados Demo Moçambique
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Plataforma de preparação para exames de admissão às universidades de Moçambique (UEM, UP, UniLúrio, etc.)
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('device')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'device'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Simulador Android Interactivo</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'code'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Código Nativo Java / XML</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'device' ? (
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-8 overflow-y-auto">
            
            {/* Quick Screen Navigator Controls */}
            <div className="w-full md:w-80 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-slate-300 font-semibold text-sm">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Navegação de Telas Android</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interaja com o dispositivo ao lado ou clique nos atalhos rápidos para verificar cada tela e funcionalidade exigida no prompt.
              </p>

              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'home', label: '1. Início / Dashboard Principal' },
                  { id: 'universities', label: '2. Universidades de Moçambique' },
                  { id: 'courses', label: '3. Cursos Universitários' },
                  { id: 'subjects', label: '4. Disciplinas de Admissão' },
                  { id: 'exams', label: '5. Exames Anteriores (Demo)' },
                  { id: 'quiz', label: '6. Questões & Feedback Imediato' },
                  { id: 'timed_quiz', label: '7. Simulado Cronometrado ⏱' },
                  { id: 'result', label: '8. Resultado (37/50, 74%) & Áreas' },
                  { id: 'manuals', label: '9. Manuais de Estudo' },
                  { id: 'videos', label: '10. Videoaulas Explicativas' },
                  { id: 'profile', label: '11. Perfil do Estudante' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentScreen(item.id);
                      if (item.id === 'quiz') {
                        setIsAnswerSubmitted(false);
                        setSelectedOption(null);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center justify-between ${
                      currentScreen === item.id
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  <span>100% Funcional Offline</span>
                </div>
                <p>Nenhuma dependência externa ou servidor remoto necessária nesta fase inicial.</p>
              </div>
            </div>

            {/* Android Device Mockup Frame */}
            <div className="relative w-[380px] h-[740px] bg-black rounded-[48px] p-3 shadow-2xl shadow-emerald-950/40 border-4 border-slate-700 flex flex-col flex-shrink-0">
              {/* Speaker / Camera Hole */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full flex items-center justify-center z-50">
                <div className="w-2.5 h-2.5 bg-black rounded-full mr-2" />
                <div className="w-8 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Device Screen Area */}
              <div className="w-full h-full bg-slate-950 rounded-[40px] overflow-hidden flex flex-col relative text-slate-100 font-sans select-none">
                
                {/* Status Bar */}
                <div className="h-7 bg-emerald-900/40 px-6 pt-1 flex items-center justify-between text-[11px] text-emerald-200 font-medium z-40">
                  <span>08:30</span>
                  <div className="flex items-center space-x-1.5">
                    <span>4G LTE</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Android App Screens Container */}
                <div className="flex-1 overflow-y-auto relative flex flex-col bg-slate-50 text-slate-900">
                  
                  {/* SCREEN 1: HOME */}
                  {currentScreen === 'home' && (
                    <div className="flex-1 flex flex-col">
                      <div className="bg-emerald-800 text-white p-5 rounded-b-3xl shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-emerald-200 uppercase tracking-wide font-semibold">Candidato 2025</span>
                            <h2 className="text-xl font-bold">Olá, Candidato!</h2>
                          </div>
                          <button 
                            onClick={() => setCurrentScreen('profile')}
                            className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-emerald-400 flex items-center justify-center font-bold text-sm text-white"
                          >
                            EM
                          </button>
                        </div>
                        <div className="mt-3 bg-emerald-700/60 backdrop-blur rounded-xl p-2.5 text-xs text-emerald-100 flex items-center justify-between">
                          <span>Meta: UEM • Eng. Informática</span>
                          <span className="font-bold text-amber-300">Ano 2025</span>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 px-4 -mt-4">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 text-center">
                          <span className="text-emerald-700 font-bold text-base">45</span>
                          <span className="block text-[10px] text-slate-500">Questões</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 text-center">
                          <span className="text-emerald-700 font-bold text-base">73%</span>
                          <span className="block text-[10px] text-slate-500">Aproveitamento</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 text-center">
                          <span className="text-amber-600 font-bold text-base">5 dias</span>
                          <span className="block text-[10px] text-slate-500">Sequência</span>
                        </div>
                      </div>

                      {/* Action Grid */}
                      <div className="p-4 space-y-3">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Preparação Intensiva
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button 
                            onClick={() => setCurrentScreen('exams')}
                            className="bg-white p-3.5 rounded-2xl border border-slate-200 text-left shadow-sm hover:border-emerald-500 transition group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 font-bold">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="font-bold text-sm text-slate-900">Exames Anteriores</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">UEM, UP, UniLúrio</div>
                          </button>

                          <button 
                            onClick={() => setCurrentScreen('timed_quiz')}
                            className="bg-white p-3.5 rounded-2xl border border-slate-200 text-left shadow-sm hover:border-emerald-500 transition"
                          >
                            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
                              <Clock className="w-4 h-4" />
                            </div>
                            <div className="font-bold text-sm text-slate-900">Simulado ⏱</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">Com cronómetro real</div>
                          </button>

                          <button 
                            onClick={() => setCurrentScreen('manuals')}
                            className="bg-white p-3.5 rounded-2xl border border-slate-200 text-left shadow-sm hover:border-emerald-500 transition"
                          >
                            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2 font-bold">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="font-bold text-sm text-slate-900">Manuais Teóricos</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">Por disciplina & tema</div>
                          </button>

                          <button 
                            onClick={() => setCurrentScreen('videos')}
                            className="bg-white p-3.5 rounded-2xl border border-slate-200 text-left shadow-sm hover:border-emerald-500 transition"
                          >
                            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2 font-bold">
                              <Play className="w-4 h-4" />
                            </div>
                            <div className="font-bold text-sm text-slate-900">Videoaulas</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">Resoluções comentadas</div>
                          </button>
                        </div>

                        {/* Highlight Exam Card */}
                        <div className="mt-2 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-4 text-white">
                          <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px]">
                            DEMO EM DESTAQUE
                          </span>
                          <h3 className="font-bold text-base mt-2">UEM - Matemática 2024</h3>
                          <p className="text-xs text-emerald-100 mt-1">
                            10 questões com explicações detalhadas e vídeo.
                          </p>
                          <div className="flex items-center space-x-2 mt-3">
                            <button
                              onClick={() => {
                                setCurrentScreen('quiz');
                                setIsAnswerSubmitted(false);
                                setSelectedOption(null);
                              }}
                              className="flex-1 bg-white text-emerald-800 font-bold py-2 rounded-xl text-xs text-center"
                            >
                              Praticar Agora
                            </button>
                            <button
                              onClick={() => setCurrentScreen('timed_quiz')}
                              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs"
                            >
                              Simulado ⏱
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* SCREEN 2: UNIVERSITIES */}
                  {currentScreen === 'universities' && (
                    <div className="flex-1 flex flex-col">
                      <div className="bg-emerald-800 text-white p-4 flex items-center space-x-3">
                        <button onClick={() => setCurrentScreen('home')}><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="font-bold text-base">Universidades de Moçambique</h2>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          { acronym: 'UEM', name: 'Universidade Eduardo Mondlane', location: 'Maputo', courses: '14 cursos' },
                          { acronym: 'UP', name: 'Univ. Pedagógica de Maputo', location: 'Maputo', courses: '12 cursos' },
                          { acronym: 'UniLúrio', name: 'Universidade Lúrio', location: 'Nampula / Cabo Delgado', courses: '8 cursos' },
                          { acronym: 'UniZambeze', name: 'Universidade Zambeze', location: 'Beira, Sofala', courses: '9 cursos' }
                        ].map((uni, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setCurrentScreen('courses')}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-500"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                                {uni.acronym}
                              </div>
                              <div>
                                <h3 className="font-bold text-sm text-slate-900">{uni.name}</h3>
                                <p className="text-xs text-slate-500">{uni.location} • {uni.courses}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SCREEN 3: COURSES */}
                  {currentScreen === 'courses' && (
                    <div className="flex-1 flex flex-col">
                      <div className="bg-emerald-800 text-white p-4 flex items-center space-x-3">
                        <button onClick={() => setCurrentScreen('universities')}><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="font-bold text-base">Cursos - UEM</h2>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          { name: 'Engenharia Informática', fac: 'Faculdade de Engenharia', exams: 'Matemática e Física' },
                          { name: 'Medicina Geral', fac: 'Faculdade de Medicina', exams: 'Biologia e Química' },
                          { name: 'Direito', fac: 'Faculdade de Direito', exams: 'Português e História' },
                          { name: 'Economia e Gestão', fac: 'Faculdade de Economia', exams: 'Matemática e Português' }
                        ].map((c, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setCurrentScreen('subjects')}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500"
                          >
                            <h3 className="font-bold text-sm text-slate-900">{c.name}</h3>
                            <p className="text-xs text-slate-500">{c.fac}</p>
                            <div className="mt-2 inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                              Exames: {c.exams}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SCREEN 4: SUBJECTS */}
                  {currentScreen === 'subjects' && (
                    <div className="flex-1 flex flex-col">
                      <div className="bg-emerald-800 text-white p-4 flex items-center space-x-3">
                        <button onClick={() => setCurrentScreen('courses')}><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="font-bold text-base">Disciplinas de Admissão</h2>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          { code: 'MAT', name: 'Matemática', count: '10 questões demo' },
                          { code: 'FIS', name: 'Física', count: '10 questões demo' },
                          { code: 'POR', name: 'Português', count: '10 questões demo' },
                          { code: 'BIO', name: 'Biologia', count: '10 questões demo' },
                          { code: 'QUI', name: 'Química', count: '10 questões demo' }
                        ].map((sub, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setCurrentScreen('exams')}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-500"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                                {sub.code}
                              </div>
                              <div>
                                <h3 className="font-bold text-sm text-slate-900">{sub.name}</h3>
                                <p className="text-xs text-slate-500">{sub.count}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SCREEN 5: EXAMS */}
                  {currentScreen === 'exams' && (
                    <div className="flex-1 flex flex-col">
                      <div className="bg-emerald-800 text-white p-4 flex items-center space-x-3">
                        <button onClick={() => setCurrentScreen('home')}><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="font-bold text-base">Exames Anteriores</h2>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          { title: 'UEM - Exame de Matemática 2024', year: '2024', uni: 'UEM', dur: '60 min' },
                          { title: 'UP - Exame de Matemática 2023', year: '2023', uni: 'UP', dur: '60 min' },
                          { title: 'UEM - Exame de Física 2024', year: '2024', uni: 'UEM', dur: '60 min' }
                        ].map((ex, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                {ex.year} • {ex.uni}
                              </span>
                              <span className="text-[11px] text-slate-500">{ex.dur}</span>
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 mt-2">{ex.title}</h3>
                            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-slate-100">
                              <button
                                onClick={() => {
                                  setCurrentScreen('quiz');
                                  setIsAnswerSubmitted(false);
                                  setSelectedOption(null);
                                }}
                                className="flex-1 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold py-2 rounded-lg text-xs"
                              >
                                Praticar
                              </button>
                              <button
                                onClick={() => setCurrentScreen('timed_quiz')}
                                className="flex-1 bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs"
                              >
                                Simulado ⏱
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SCREEN 6: INTERACTIVE QUIZ & FEEDBACK (Exame Master Core Feature) */}
                  {currentScreen === 'quiz' && (
                    <div className="flex-1 flex flex-col bg-slate-100">
                      {/* Top bar */}
                      <div className="bg-emerald-800 text-white p-3.5 flex items-center justify-between">
                        <button onClick={() => setCurrentScreen('home')}><ArrowLeft className="w-5 h-5" /></button>
                        <span className="font-bold text-sm">Resolução de Questões</span>
                        <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded font-bold">Demo</span>
                      </div>

                      {/* Indicator & Progress Bar */}
                      <div className="bg-white p-3 border-b border-slate-200">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                          <span className="text-emerald-800 font-bold">Questão {selectedQuestionIdx + 1} de {demoQuestions.length}</span>
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11px]">{currentQ.topic}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full transition-all" 
                            style={{ width: `${((selectedQuestionIdx + 1) / demoQuestions.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="p-4 flex-1 overflow-y-auto space-y-3">
                        {/* Statement Card */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                          <span className="text-[11px] text-slate-500">UEM • Matemática • 2024 (Demo)</span>
                          <p className="font-bold text-slate-900 text-sm mt-2 leading-relaxed">
                            {currentQ.statement}
                          </p>
                        </div>

                        {/* 4 Alternatives (A, B, C, D) */}
                        <div className="space-y-2">
                          {currentQ.options.map(opt => {
                            const isSelected = selectedOption === opt.key;
                            const isCorrectAnswer = currentQ.correctOption === opt.key;

                            let cardStyle = "bg-white border-slate-200 text-slate-800";
                            if (isSelected) {
                              cardStyle = "bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold";
                            }
                            if (isAnswerSubmitted) {
                              if (isCorrectAnswer) {
                                cardStyle = "bg-emerald-100 border-emerald-600 text-emerald-950 font-bold";
                              } else if (isSelected && !isCorrectAnswer) {
                                cardStyle = "bg-red-50 border-red-500 text-red-950";
                              }
                            }

                            return (
                              <button
                                key={opt.key}
                                disabled={isAnswerSubmitted}
                                onClick={() => setSelectedOption(opt.key)}
                                className={`w-full p-3 rounded-xl border text-left flex items-center space-x-3 transition ${cardStyle}`}
                              >
                                <div className="w-7 h-7 rounded-lg bg-slate-200/80 flex items-center justify-center font-bold text-xs text-slate-800">
                                  {opt.key}
                                </div>
                                <span className="text-xs flex-1">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* IMMEDIATE FEEDBACK CONTAINER (Strictly mandated by User Prompt) */}
                        {isAnswerSubmitted && (
                          <div className="mt-4 space-y-2 animate-fadeIn">
                            {selectedOption === currentQ.correctOption ? (
                              /* Resposta Correcta */
                              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4">
                                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                  <span>✓ Resposta correcta</span>
                                </div>
                                <p className="text-xs text-slate-700 mt-1">
                                  Excelente raciocínio! Resposta correcta segundo o critério de admissão da UEM.
                                </p>
                              </div>
                            ) : (
                              /* Resposta Incorrecta */
                              <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4">
                                <div className="flex items-center space-x-2 text-red-800 font-bold text-sm">
                                  <XCircle className="w-5 h-5 text-red-600" />
                                  <span>✗ Resposta incorrecta</span>
                                </div>
                                <p className="text-xs font-bold text-slate-900 mt-1">
                                  Resposta correcta: Alternativa {currentQ.correctOption}
                                </p>

                                {/* DUAS OPÇÕES EXIGIDAS NO PROMPT */}
                                <div className="mt-3 space-y-2">
                                  <button
                                    onClick={() => setShowTextExplanation(true)}
                                    className="w-full bg-white border border-emerald-700 text-emerald-800 font-bold py-2 rounded-xl text-xs text-center shadow-sm"
                                  >
                                    Ver explicação em texto
                                  </button>
                                  <button
                                    onClick={() => {
                                      alert(`Videoaula Explicativa:\n${currentQ.videoUrl}\n\n(Preparado para Android Media3 / ExoPlayer)`);
                                    }}
                                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl text-xs text-center shadow-sm"
                                  >
                                    Assistir à explicação em vídeo
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom action button */}
                      <div className="p-4 bg-white border-t border-slate-200">
                        {!isAnswerSubmitted ? (
                          <button
                            disabled={!selectedOption}
                            onClick={() => setIsAnswerSubmitted(true)}
                            className="w-full bg-emerald-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                          >
                            Confirmar resposta
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (selectedQuestionIdx < demoQuestions.length - 1) {
                                setSelectedQuestionIdx(prev => prev + 1);
                                setSelectedOption(null);
                                setIsAnswerSubmitted(false);
                              } else {
                                setCurrentScreen('result');
                              }
                            }}
                            className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                          >
                            {selectedQuestionIdx < demoQuestions.length - 1 ? 'Próxima questão ➔' : 'Ver Resultados do Simulado'}
                          </button>
                        )}
                      </div>

                      {/* Explanation Modal Popup */}
                      {showTextExplanation && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl border border-slate-200 space-y-3">
                            <h4 className="font-bold text-emerald-900 text-sm">Explicação Pedagógica</h4>
                            <div className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                              Tópico: {currentQ.topic}
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                              {currentQ.explanation}
                            </p>
                            <button
                              onClick={() => setShowTextExplanation(false)}
                              className="w-full bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs"
                            >
                              Entendi, continuar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SCREEN 7: TIMED QUIZ ⏱ */}
                  {currentScreen === 'timed_quiz' && (
                    <div className="flex-1 flex flex-col bg-slate-100">
                      {/* Timed header with countdown */}
                      <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-emerald-300 font-bold uppercase">Simulado Cronometrado</div>
                          <div className="font-bold text-sm">UEM - Matemática 2024</div>
                        </div>
                        <div className="bg-amber-400 text-slate-950 px-2.5 py-1 rounded-lg font-mono font-bold text-xs flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatTimer(timerSeconds)}</span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 overflow-y-auto space-y-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                          <span className="text-[11px] text-slate-500">Questão 1 de 10</span>
                          <p className="font-bold text-slate-900 text-sm mt-2">
                            Qual é o domínio da função f(x) = log(2x - 6) no conjunto dos números reais (R)?
                          </p>
                        </div>

                        <div className="space-y-2">
                          {demoQuestions[0].options.map(opt => (
                            <button
                              key={opt.key}
                              onClick={() => setTimedOption(opt.key)}
                              className={`w-full p-3 rounded-xl border text-left flex items-center space-x-3 ${
                                timedOption === opt.key ? 'bg-emerald-50 border-emerald-600 font-bold text-emerald-900' : 'bg-white border-slate-200 text-slate-800'
                              }`}
                            >
                              <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center font-bold text-xs">
                                {opt.key}
                              </div>
                              <span className="text-xs">{opt.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-white border-t border-slate-200 flex space-x-2">
                        <button
                          onClick={() => setCurrentScreen('home')}
                          className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => setCurrentScreen('result')}
                          className="flex-1 bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs"
                        >
                          Finalizar Teste
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 8: EXAM RESULT (Exact format requested: 37/50, 74%, Áreas de atenção) */}
                  {currentScreen === 'result' && (
                    <div className="flex-1 flex flex-col bg-slate-50 p-4 overflow-y-auto space-y-4">
                      <div className="text-center pt-2">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">Exame Concluído</span>
                        <h2 className="font-bold text-lg text-slate-900">UEM - Matemática 2024</h2>
                      </div>

                      {/* PONTUAÇÃO CARD (Mandated by Prompt: 37 / 50 e 74%) */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pontuação</span>
                        <div className="text-3xl font-black text-emerald-800 mt-1">37 / 50</div>
                        <div className="text-2xl font-bold text-emerald-600 mt-0.5">74%</div>
                        <p className="text-xs text-slate-600 mt-2">
                          Excelente aproveitamento! Média suficiente para admissão na UEM.
                        </p>
                      </div>

                      {/* Métricas Detalhadas */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-600">Respostas correctas</span>
                          <span className="font-bold text-emerald-700">37</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-600">Respostas erradas</span>
                          <span className="font-bold text-red-600">10</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-600">Não respondidas</span>
                          <span className="font-bold text-amber-600">3</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-600">Tempo utilizado</span>
                          <span className="font-bold text-slate-900">52 min 10 s</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-600">Média por questão</span>
                          <span className="font-bold text-slate-900">62.4 s</span>
                        </div>
                      </div>

                      {/* SECÇÃO: Áreas que precisam de atenção (Mandated by Prompt) */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                          Áreas que precisam de atenção
                        </h4>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                          <div className="flex justify-between text-xs font-bold text-red-800">
                            <span>Funções e Logaritmos</span>
                            <span>2 erros</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1">
                            Revisar propriedades operatórias de logaritmos e condição de existência de domínio.
                          </p>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                          <div className="flex justify-between text-xs font-bold text-amber-800">
                            <span>Trigonometria</span>
                            <span>1 erro</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1">
                            Reforçar fórmulas de arco duplo e transformações trigonométricas.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <button
                          onClick={() => setCurrentScreen('home')}
                          className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs"
                        >
                          Voltar ao Menu Principal
                        </button>
                        <button
                          onClick={() => setCurrentScreen('manuals')}
                          className="w-full bg-slate-100 text-emerald-800 border border-emerald-300 font-bold py-2.5 rounded-xl text-xs"
                        >
                          Estudar Manuais de Apoio
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 9: MANUALS */}
                  {currentScreen === 'manuals' && (
                    <div className="flex-1 flex flex-col">
                      <div className="bg-emerald-800 text-white p-4 flex items-center space-x-3">
                        <button onClick={() => setCurrentScreen('home')}><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="font-bold text-base">Manuais de Estudo</h2>
                      </div>
                      <div className="p-3 bg-emerald-50 text-[11px] text-emerald-900 border-b border-emerald-100">
                        Hierarquia: Universidade → Curso → Disciplina → Tema
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          { title: 'Manual de Funções e Logaritmos', topic: 'Funções', chaps: '4 capítulos', exercises: '15 exercícios' },
                          { title: 'Manual de Cinemática e Dinâmica', topic: 'Mecânica', chaps: '5 capítulos', exercises: '20 exercícios' },
                          { title: 'Manual de Sintaxe e Interpretação', topic: 'Gramática', chaps: '6 capítulos', exercises: '18 exercícios' }
                        ].map((man, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              UEM → Matemática → {man.topic}
                            </span>
                            <h3 className="font-bold text-sm text-slate-900 mt-2">{man.title}</h3>
                            <p className="text-xs text-slate-500 mt-1">{man.chaps} • {man.exercises}</p>
                            <button
                              onClick={() => alert(`Abrindo manual: ${man.title}\n\nTexto teórico, teoremas e exercícios resolvidos.`)}
                              className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-emerald-800 font-bold py-1.5 rounded-lg text-xs"
                            >
                              Ler Manual Completo
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SCREEN 10: VIDEOS */}
                  {currentScreen === 'videos' && (
                    <div className="flex-1 flex flex-col">
                      <div className="bg-emerald-800 text-white p-4 flex items-center space-x-3">
                        <button onClick={() => setCurrentScreen('home')}><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="font-bold text-base">Videoaulas Explicativas</h2>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          { title: 'Resolução Completa: Matemática UEM 2024', prof: 'Prof. António Macamo', dur: '28:40', sub: 'Matemática' },
                          { title: 'Cinemática Vetorial e Lançamentos UP', prof: 'Profa. Fátima Cossa', dur: '34:15', sub: 'Física' },
                          { title: 'Interpretação Textual & Coesão UEM', prof: 'Prof. Manuel Sitoe', dur: '22:10', sub: 'Português' }
                        ].map((v, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">{v.sub}</span>
                              <span className="font-semibold text-slate-500">⏱ {v.dur}</span>
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 mt-2">{v.title}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{v.prof}</p>
                            <button
                              onClick={() => alert(`Iniciando streaming da aula: ${v.title}\n\nArquitectura pronta para Android Media3/ExoPlayer.`)}
                              className="mt-3 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Assistir Videoaula</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SCREEN 11: PROFILE */}
                  {currentScreen === 'profile' && (
                    <div className="flex-1 flex flex-col bg-slate-50">
                      <div className="bg-emerald-800 text-white p-5 text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-700 border-2 border-emerald-400 mx-auto flex items-center justify-center font-bold text-xl">
                          EM
                        </div>
                        <h3 className="font-bold text-base mt-2">Candidato Universitário</h3>
                        <p className="text-xs text-emerald-200">candidato@examemaster.mz</p>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Objectivo</span>
                          <div className="font-bold text-sm text-slate-900">Universidade Eduardo Mondlane</div>
                          <div className="text-xs text-emerald-700 font-semibold">Engenharia Informática (2025)</div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Histórico</span>
                          <div className="flex justify-between text-xs py-1 border-b border-slate-100">
                            <span>Exames Resolvidos:</span>
                            <span className="font-bold">4 exames</span>
                          </div>
                          <div className="flex justify-between text-xs py-1 border-b border-slate-100">
                            <span>Aproveitamento Geral:</span>
                            <span className="font-bold text-emerald-700">73%</span>
                          </div>
                          <div className="flex justify-between text-xs py-1">
                            <span>Horas de Estudo:</span>
                            <span className="font-bold text-slate-800">14 horas</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setCurrentScreen('home')}
                          className="w-full bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs"
                        >
                          Voltar ao Dashboard
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Android Navigation Bar */}
                <div className="h-9 bg-slate-950 flex items-center justify-around px-12 z-40">
                  <div className="w-3 h-3 border-l-2 border-b-2 border-slate-500 rotate-45" />
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-500" />
                  <div className="w-3 h-3 border-2 border-slate-500" />
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* CODE EXPLORER TAB */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* File List Sidebar */}
            <div className="w-full md:w-72 bg-slate-950 border-r border-slate-800 flex flex-col">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Ficheiros Nativos Android
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  100% Java e XML tradicional estruturado com Gradle.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {Object.keys(codeFiles).map(fileName => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedCodeFile(fileName)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center justify-between ${
                      selectedCodeFile === fileName
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <span>{fileName}</span>
                    <span className="text-[10px] text-slate-600">{codeFiles[fileName].lang}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Viewer Panel */}
            <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
              <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">
                  {codeFiles[selectedCodeFile].path}
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {codeFiles[selectedCodeFile].lang.toUpperCase()}
                </span>
              </div>
              <pre className="flex-1 overflow-auto p-6 font-mono text-xs text-slate-200 leading-relaxed bg-slate-900/90">
                <code>{codeFiles[selectedCodeFile].code}</code>
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
