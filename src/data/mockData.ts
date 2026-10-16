import { Exam, StudyManual, VideoLesson, UserTarget, StudentProfile, TeacherProfile, ExamAttemptRecord, TeacherEvaluation, AcademicContactMessage } from '../types';

export const initialStudentProfile: StudentProfile = {
  role: 'student',
  id: 'std-armando-cossa',
  name: 'Armando Cossa',
  email: 'armando.cossa@aluno.ac.mz',
  phone: '+258 84 123 4567',
  targetUniversity: 'Universidade Eduardo Mondlane (UEM)',
  targetCourse: 'Engenharia Informática',
  targetYear: 2025,
  targetCutoffScore: 14.5,
  secondarySchool: 'Escola Secundária Josina Machel',
  province: 'Maputo Cidade',
  enrolledSubjects: ['Matemática']
};

export const secondStudentProfile: StudentProfile = {
  role: 'student',
  id: 'std-elsa-tembe',
  name: 'Elsa Tembe',
  email: 'elsa.tembe@aluno.ac.mz',
  phone: '+258 84 999 8888',
  targetUniversity: 'Universidade Pedagógica de Moçambique (UP)',
  targetCourse: 'Medicina Geral & Cirurgia',
  targetYear: 2025,
  targetCutoffScore: 16.0,
  secondarySchool: 'Escola Secundária Francisco Manyanga',
  province: 'Maputo Cidade',
  enrolledSubjects: ['Química', 'Biologia']
};

export const thirdStudentProfile: StudentProfile = {
  role: 'student',
  id: 'std-inacio-macuacua',
  name: 'Inácio Macuácua',
  email: 'inacio.macuacua@aluno.ac.mz',
  phone: '+258 87 333 2211',
  targetUniversity: 'Universidade Eduardo Mondlane (UEM)',
  targetCourse: 'Direito & Relações Internacionais',
  targetYear: 2025,
  targetCutoffScore: 15.0,
  secondarySchool: 'Escola Secundária da Polana',
  province: 'Maputo Cidade',
  enrolledSubjects: ['Português', 'História']
};

export const initialTeacherProfile: TeacherProfile = {
  role: 'teacher',
  id: 'tch-prof-alberto-mabjaia',
  name: 'Prof. Dr. Alberto Mabjaia',
  email: 'a.mabjaia@uem.mz',
  phone: '+258 82 987 6543',
  institution: 'Faculdade de Ciências - UEM',
  titleOrRank: 'Docente Universitário e Membro do Júri de Admissão',
  specialties: ['Matemática'],
  academicBio: 'Doutorado em Ensino de Ciências Exatas, com mais de 16 anos na elaboração, revisão e resolução das matrizes de exames de admissão da UEM e UP.',
  nuitOrStaffId: '104882910'
};

export const secondTeacherProfile: TeacherProfile = {
  role: 'teacher',
  id: 'tch-prof-amina-daude',
  name: 'Prof.ª Dra. Amina Daúde',
  email: 'a.daude@up.ac.mz',
  phone: '+258 84 555 4321',
  institution: 'Faculdade de Ciências Naturais - UP',
  titleOrRank: 'Professora Associada e Coordenadora de Exames',
  specialties: ['Química'],
  academicBio: 'Especialista em Química Orgânica e Termodinâmica pela UP com 12 anos de assessoria a provas nacionais.',
  nuitOrStaffId: '209384812'
};

export const thirdTeacherProfile: TeacherProfile = {
  role: 'teacher',
  id: 'tch-prof-zacarias-langa',
  name: 'Prof. Zacarias Langa',
  email: 'z.langa@up.ac.mz',
  phone: '+258 84 777 9900',
  institution: 'Faculdade de Ciências da Linguagem - UP',
  titleOrRank: 'Docente de Língua Portuguesa e Redação Argumentativa',
  specialties: ['Português'],
  academicBio: 'Especialista em Sintaxe e Interpretação Textual para provas de ingresso universitário em Moçambique.',
  nuitOrStaffId: '304918274'
};

export const INITIAL_REGISTERED_ACCOUNTS: (StudentProfile | TeacherProfile)[] = [
  initialTeacherProfile,
  secondTeacherProfile,
  thirdTeacherProfile,
  initialStudentProfile,
  secondStudentProfile,
  thirdStudentProfile
];

export const INITIAL_EVALUATIONS: TeacherEvaluation[] = [
  {
    id: 'eval-mat-armando-1',
    teacherId: 'tch-prof-alberto-mabjaia',
    teacherName: 'Prof. Dr. Alberto Mabjaia',
    teacherInstitution: 'Faculdade de Ciências - UEM',
    studentId: 'std-armando-cossa',
    studentName: 'Armando Cossa',
    subject: 'Matemática',
    date: '06 Out 2026',
    scoreValores: 16.5,
    qualitativeAssessment: 'Bom',
    feedbackComment: 'Bom raciocínio analítico na resolução da prova da UEM 2024. Atenção ao estudo do domínio em equações logarítmicas fracionárias para evitar anulações no exame final.',
    suggestedAction: 'Rever o capítulo de Logaritmos e Funções Reais no Manual Teórico.'
  },
  {
    id: 'eval-qui-elsa-1',
    teacherId: 'tch-prof-amina-daude',
    teacherName: 'Prof.ª Dra. Amina Daúde',
    teacherInstitution: 'Faculdade de Ciências Naturais - UP',
    studentId: 'std-elsa-tembe',
    studentName: 'Elsa Tembe',
    subject: 'Química',
    date: '09 Out 2026',
    scoreValores: 18.0,
    qualitativeAssessment: 'Excelente',
    feedbackComment: 'Excelente domínio de estequiometria e equilíbrio de pH. Pronta para disputar vaga no curso de Medicina Geral.',
    suggestedAction: 'Praticar questões de cinética química dos anos 2021-2023.'
  }
];

export const INITIAL_ACADEMIC_MESSAGES: AcademicContactMessage[] = [
  {
    id: 'msg-1',
    subject: 'Matemática',
    studentId: 'std-armando-cossa',
    studentName: 'Armando Cossa',
    teacherId: 'tch-prof-alberto-mabjaia',
    teacherName: 'Prof. Dr. Alberto Mabjaia',
    senderId: 'std-armando-cossa',
    senderRole: 'student',
    message: 'Professor Alberto, tive dúvida na questão 4 sobre assíntotas verticais da prova UEM 2024. O limite lateral precisa sempre tender a infinito?',
    timestamp: 'Ontem às 14:20'
  },
  {
    id: 'msg-2',
    subject: 'Matemática',
    studentId: 'std-armando-cossa',
    studentName: 'Armando Cossa',
    teacherId: 'tch-prof-alberto-mabjaia',
    teacherName: 'Prof. Dr. Alberto Mabjaia',
    senderId: 'tch-prof-alberto-mabjaia',
    senderRole: 'teacher',
    message: 'Olá Armando! Sim, para que x = c seja uma assíntota vertical, basta que um dos limites laterais quando x se aproxima de c seja +∞ ou -∞. Consulte o Teorema 2 no Manual.',
    timestamp: 'Ontem às 15:05'
  }
];

export const INITIAL_ATTEMPTS: ExamAttemptRecord[] = [
  {
    id: 'demo-attempt-armando-1',
    studentId: 'std-armando-cossa',
    studentName: 'Armando Cossa',
    studentEmail: 'armando.cossa@aluno.ac.mz',
    examId: 'uem-mat-2024',
    examTitle: 'Exame de Admissão de Matemática I & II',
    university: 'Universidade Eduardo Mondlane',
    subject: 'Matemática',
    date: '05 Out 2026',
    score: 15.0,
    percentage: 75.0,
    correctCount: 6,
    wrongCount: 2,
    unansweredCount: 0,
    totalQuestions: 8,
    timeSpentSeconds: 4320,
    answers: {}
  },
  {
    id: 'demo-attempt-elsa-1',
    studentId: 'std-elsa-tembe',
    studentName: 'Elsa Tembe',
    studentEmail: 'elsa.tembe@aluno.ac.mz',
    examId: 'uem-fis-2024',
    examTitle: 'Exame de Admissão de Física Geral',
    university: 'Universidade Eduardo Mondlane',
    subject: 'Física',
    date: '08 Out 2026',
    score: 17.0,
    percentage: 85.0,
    correctCount: 5,
    wrongCount: 1,
    unansweredCount: 0,
    totalQuestions: 6,
    timeSpentSeconds: 3800,
    answers: {}
  }
];

export const MOZ_PROVINCES = [
  'Maputo Cidade',
  'Maputo Província',
  'Gaza',
  'Inhambane',
  'Sofala',
  'Manica',
  'Tete',
  'Zambézia',
  'Nampula',
  'Cabo Delgado',
  'Niassa'
];

export const initialUserTarget: UserTarget = {
  name: 'Armando Cossa',
  email: 'armando.cossa@aluno.ac.mz',
  targetUniversity: 'Universidade Eduardo Mondlane (UEM)',
  targetCourse: 'Engenharia Informática',
  targetYear: 2025,
  targetCutoffScore: 14.5,
};

export const UNIVERSITIES = [
  { code: 'UEM', name: 'Universidade Eduardo Mondlane', location: 'Maputo', logoCode: 'UEM' },
  { code: 'UP', name: 'Universidade Pedagógica de Moçambique', location: 'Maputo / Províncias', logoCode: 'UP' },
  { code: 'UniZambeze', name: 'Universidade Zambeze', location: 'Beira', logoCode: 'UZ' },
  { code: 'UJC', name: 'Universidade Joaquim Chissano', location: 'Maputo', logoCode: 'UJC' },
  { code: 'UniLúrio', name: 'Universidade Lúrio', location: 'Nampula / Pemba', logoCode: 'UL' },
  { code: 'ISRI', name: 'Instituto Superior de Relações Internacionais', location: 'Maputo', logoCode: 'ISRI' },
];

export const SUBJECTS = [
  'Matemática',
  'Física',
  'Português',
  'Química',
  'Biologia',
  'História',
  'Geografia',
  'Filosofia'
];

export const EXAMS_LIST: Exam[] = [
  {
    id: 'uem-mat-2024',
    title: 'Exame de Admissão de Matemática I & II',
    university: 'Universidade Eduardo Mondlane',
    universityCode: 'UEM',
    subject: 'Matemática',
    year: 2024,
    durationMinutes: 120,
    totalQuestions: 8,
    passingScoreSuggestion: 14.0,
    authorId: 'tch-prof-alberto-mabjaia',
    authorName: 'Prof. Dr. Alberto Mabjaia',
    authorInstitution: 'Faculdade de Ciências - UEM',
    authorEmail: 'a.mabjaia@uem.mz',
    description: 'Prova oficial para as faculdades de Engenharia, Ciências Naturais e Economia. Aborda funções, logaritmos, trigonometria, sucessões e cálculo diferencial.',
    questions: [
      {
        id: 'uem-mat-2024-q1',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'Qual é o domínio de existência da função real de variável real f(x) = log₂(3x - 12) + √(10 - 2x) no conjunto ℝ?',
        options: [
          { key: 'A', text: ']4, +∞[' },
          { key: 'B', text: ']4, 5]' },
          { key: 'C', text: '[4, 5]' },
          { key: 'D', text: ']-∞, 5]' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'O domínio requer simultaneamente a existência do logaritmando (estritamente positivo) e da raiz quadrada com índice par (radicando não negativo).',
          steps: [
            '1. Condição do logaritmo: 3x - 12 > 0  ⇒  3x > 12  ⇒  x > 4.',
            '2. Condição do radical: 10 - 2x ≥ 0  ⇒  -2x ≥ -10  ⇒  x ≤ 5 (inverte o sentido ao dividir por número negativo).',
            '3. Interseção das duas condições: (x > 4) ∩ (x ≤ 5)  ⇒  4 < x ≤ 5.',
            '4. Notação de intervalo: x ∈ ]4, 5]. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'D(log_b(g(x))): g(x) > 0  e  D(√(h(x))): h(x) ≥ 0'
        },
        topic: 'Funções e Domínios',
        difficulty: 'Médio',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uem-mat-2024-q2',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'Sendo sen(x) = 3/5 com x pertencente ao 1º quadrante (0 < x < π/2), determine o valor exacto de cos(2x).',
        options: [
          { key: 'A', text: '7/25' },
          { key: 'B', text: '16/25' },
          { key: 'C', text: '24/25' },
          { key: 'D', text: '-7/25' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'Aplicamos a fórmula trigonométrica do cosseno do arco duplo: cos(2x) = 1 - 2·sen²(x).',
          steps: [
            '1. Sabendo que sen(x) = 3/5, calculamos sen²(x) = (3/5)² = 9/25.',
            '2. Aplicamos a identidade do arco duplo: cos(2x) = 1 - 2·(9/25).',
            '3. cos(2x) = 1 - 18/25 = 25/25 - 18/25 = 7/25.',
            '4. Logo, cos(2x) = 7/25. Alternativa A correcta.'
          ],
          keyFormulaOrConcept: 'cos(2x) = cos²(x) - sen²(x) = 1 - 2·sen²(x) = 2·cos²(x) - 1'
        },
        topic: 'Trigonometria',
        difficulty: 'Médio',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uem-mat-2024-q3',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'Considere a progressão aritmética (P.A.) onde o primeiro termo é a₁ = 3 e o décimo termo é a₁₀ = 39. Qual é a soma dos 20 primeiros termos desta sucessão?',
        options: [
          { key: 'A', text: '780' },
          { key: 'B', text: '820' },
          { key: 'C', text: '860' },
          { key: 'D', text: '900' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Primeiro encontramos a razão r da P.A. através da fórmula do termo geral e depois aplicamos a fórmula da soma dos n primeiros termos.',
          steps: [
            '1. Termo geral: a_n = a₁ + (n - 1)·r. Para n = 10: 39 = 3 + 9·r  ⇒  9r = 36  ⇒  r = 4.',
            '2. Vigésimo termo a₂₀ = a₁ + 19·r = 3 + 19·(4) = 3 + 76 = 79.',
            '3. Soma dos primeiros 20 termos: S₂₀ = (n · (a₁ + a₂₀)) / 2 = (20 · (3 + 79)) / 2 = 10 · 82 = 820.',
            '4. A soma é exactamente 820. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'S_n = [n · (a₁ + a_n)] / 2  |  a_n = a₁ + (n - 1)·r'
        },
        topic: 'Sucessões e Progressões',
        difficulty: 'Fácil',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uem-mat-2024-q4',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'Calcule o limite da função quando x tende a 3:  lim_{x → 3} (x² - 9) / (√(x + 1) - 2).',
        options: [
          { key: 'A', text: '12' },
          { key: 'B', text: '18' },
          { key: 'C', text: '24' },
          { key: 'D', text: '6' }
        ],
        correctOption: 'C',
        explanation: {
          summary: 'Ao substituir diretamente x = 3, obtém-se a indeterminação 0/0. Multiplica-se o numerador e denominador pelo conjugado do radical.',
          steps: [
            '1. Conjugado do denominador: (√(x + 1) + 2).',
            '2. Denominador: (√(x + 1) - 2)(√(x + 1) + 2) = (x + 1) - 4 = x - 3.',
            '3. Fatoração do numerador: x² - 9 = (x - 3)(x + 3).',
            '4. Expressão simplificada: [(x - 3)(x + 3)(√(x + 1) + 2)] / (x - 3) = (x + 3)(√(x + 1) + 2).',
            '5. Substituindo x = 3: (3 + 3) · (√(3 + 1) + 2) = 6 · (2 + 2) = 6 · 4 = 24.'
          ],
          keyFormulaOrConcept: 'Racionalização por conjugado: (√A - B)(√A + B) = A - B²'
        },
        topic: 'Cálculo Diferencial e Limites',
        difficulty: 'Difícil',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uem-mat-2024-q5',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'Qual é a derivada de primeira ordem da função f(x) = (3x² - 5)⁴ em relação a x?',
        options: [
          { key: 'A', text: '4(3x² - 5)³' },
          { key: 'B', text: '24x(3x² - 5)³' },
          { key: 'C', text: '12x(3x² - 5)³' },
          { key: 'D', text: '24x²(3x² - 5)³' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Aplica-se a Regra da Cadeia: se f(x) = [u(x)]ⁿ, então f\'(x) = n·[u(x)]ⁿ⁻¹ · u\'(x).',
          steps: [
            '1. Identificamos u(x) = 3x² - 5 e expoente n = 4.',
            '2. Derivada interna u\'(x) = d/dx (3x² - 5) = 6x.',
            '3. Aplicando a regra da cadeia: f\'(x) = 4·(3x² - 5)³ · (6x).',
            '4. Multiplicando coeficientes: 4 · 6x = 24x. Portanto f\'(x) = 24x(3x² - 5)³.'
          ],
          keyFormulaOrConcept: 'd/dx [uⁿ] = n · uⁿ⁻¹ · u\''
        },
        topic: 'Cálculo Diferencial e Derivadas',
        difficulty: 'Médio',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uem-mat-2024-q6',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'Em uma urna existem 4 bolas vermelhas e 6 bolas azuis. Se retirarmos 2 bolas sucessivamente e sem reposição, qual é a probabilidade de ambas serem vermelhas?',
        options: [
          { key: 'A', text: '2/15' },
          { key: 'B', text: '4/25' },
          { key: 'C', text: '1/3' },
          { key: 'D', text: '3/10' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'Probabilidade de eventos sucessivos dependentes (sem reposição).',
          steps: [
            '1. Total inicial de bolas: 4 vermelhas + 6 azuis = 10 bolas.',
            '2. Probabilidade da 1ª ser vermelha: P(V₁) = 4/10 = 2/5.',
            '3. Restam agora 3 bolas vermelhas em um total de 9 bolas.',
            '4. Probabilidade da 2ª ser vermelha dado que a 1ª foi vermelha: P(V₂ | V₁) = 3/9 = 1/3.',
            '5. Probabilidade conjunta: P = (4/10) · (3/9) = 12/90 = 2/15. Alternativa A correcta.'
          ],
          keyFormulaOrConcept: 'P(A ∩ B) = P(A) · P(B | A)'
        },
        topic: 'Análise Combinatória e Probabilidades',
        difficulty: 'Fácil',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uem-mat-2024-q7',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'A equação modular |2x - 7| = 5 possui como conjunto solução S:',
        options: [
          { key: 'A', text: 'S = {1, 6}' },
          { key: 'B', text: 'S = {-1, 6}' },
          { key: 'C', text: 'S = {1, -6}' },
          { key: 'D', text: 'S = {6}' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'Pela definição de módulo: |u| = k (k > 0) equivale a u = k ou u = -k.',
          steps: [
            '1. Caso 1: 2x - 7 = 5  ⇒  2x = 12  ⇒  x = 6.',
            '2. Caso 2: 2x - 7 = -5  ⇒  2x = 2  ⇒  x = 1.',
            '3. Conjunto solução: S = {1, 6}. Ambas as soluções verificam a equação original.'
          ],
          keyFormulaOrConcept: '|u| = a  ⇔  u = a  ou  u = -a'
        },
        topic: 'Equações Modulares',
        difficulty: 'Fácil',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uem-mat-2024-q8',
        examId: 'uem-mat-2024',
        university: 'UEM',
        subject: 'Matemática',
        year: 2024,
        statement: 'As assíntotas vertical (AV) e horizontal (AH) do gráfico da função racional f(x) = (4x + 1) / (2x - 6) são dadas pelas retas:',
        options: [
          { key: 'A', text: 'AV: x = 3  e  AH: y = 2' },
          { key: 'B', text: 'AV: x = -3  e  AH: y = 4' },
          { key: 'C', text: 'AV: x = 3  e  AH: y = 4' },
          { key: 'D', text: 'AV: x = 6  e  AH: y = 2' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'Assíntota vertical ocorre onde o denominador se anula (com numerador ≠ 0) e a horizontal pelo limite no infinito dos polinômios de mesmo grau.',
          steps: [
            '1. AV: 2x - 6 = 0  ⇒  2x = 6  ⇒  x = 3.',
            '2. AH: lim_{x → ∞} (4x + 1)/(2x - 6) = 4/2 = 2  ⇒  y = 2.',
            '3. Portanto, AV: x = 3 e AH: y = 2. Alternativa A correcta.'
          ],
          keyFormulaOrConcept: 'Para f(x) = (ax + b)/(cx + d), AH: y = a/c  e  AV: x = -d/c'
        },
        topic: 'Estudo Geral de Funções',
        difficulty: 'Médio',
        videoLessonId: 'video-mat-01'
      }
    ]
  },
  {
    id: 'uem-fis-2024',
    title: 'Exame de Admissão de Física',
    university: 'Universidade Eduardo Mondlane',
    universityCode: 'UEM',
    subject: 'Física',
    year: 2024,
    durationMinutes: 120,
    totalQuestions: 6,
    passingScoreSuggestion: 13.5,
    authorId: 'tch-prof-amina-daude',
    authorName: 'Prof.ª Dra. Amina Daúde',
    authorInstitution: 'Faculdade de Ciências Naturais - UP',
    authorEmail: 'a.daude@up.ac.mz',
    description: 'Prova orientada para cursos de Engenharia e Ciências Físicas. Abrange Mecânica Newtoniana, Eletricidade, Eletromagnetismo e Termodinâmica.',
    questions: [
      {
        id: 'uem-fis-2024-q1',
        examId: 'uem-fis-2024',
        university: 'UEM',
        subject: 'Física',
        year: 2024,
        statement: 'Um veículo parte do repouso e move-se em linha reta com aceleração constante de a = 2,5 m/s². Qual é a distância percorrida pelo veículo durante os primeiros 8 segundos de movimento?',
        options: [
          { key: 'A', text: '60 m' },
          { key: 'B', text: '80 m' },
          { key: 'C', text: '100 m' },
          { key: 'D', text: '120 m' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Movimento Retilíneo Uniformemente Variado (MRUV) partindo do repouso (v₀ = 0).',
          steps: [
            '1. Equação horária dos espaços: s = s₀ + v₀·t + (1/2)·a·t².',
            '2. Como v₀ = 0 e s₀ = 0: s = (1/2) · (2,5 m/s²) · (8 s)².',
            '3. s = 1,25 · 64 = 80 metros.',
            '4. Resposta correcta: 80 m (Alternativa B).'
          ],
          keyFormulaOrConcept: 'Δs = v₀·t + (1/2)·a·t²'
        },
        topic: 'Cinemática Escalar',
        difficulty: 'Fácil',
        videoLessonId: 'video-fis-01'
      },
      {
        id: 'uem-fis-2024-q2',
        examId: 'uem-fis-2024',
        university: 'UEM',
        subject: 'Física',
        year: 2024,
        statement: 'Dois resistores de resistências R₁ = 6 Ω e R₂ = 12 Ω estão ligados em paralelo sob uma diferença de potencial (d.d.p.) de U = 24 V. Qual é a corrente elétrica total fornecida pelo circuito?',
        options: [
          { key: 'A', text: '2 A' },
          { key: 'B', text: '4 A' },
          { key: 'C', text: '6 A' },
          { key: 'D', text: '8 A' }
        ],
        correctOption: 'C',
        explanation: {
          summary: 'Associação de resistores em paralelo e 1ª Lei de Ohm.',
          steps: [
            '1. Resistência equivalente: R_eq = (R₁ · R₂) / (R₁ + R₂) = (6 · 12) / (6 + 12) = 72 / 18 = 4 Ω.',
            '2. Pela 1ª Lei de Ohm: U = R_eq · I  ⇒  I = U / R_eq = 24 V / 4 Ω = 6 A.',
            '3. Alternativamente: I₁ = 24/6 = 4 A e I₂ = 24/12 = 2 A. Corrente total I = 4 + 2 = 6 A.',
            '4. Alternativa C correcta.'
          ],
          keyFormulaOrConcept: '1/R_eq = 1/R₁ + 1/R₂  |  I = U / R_eq'
        },
        topic: 'Eletrodinâmica e Circuitos',
        difficulty: 'Médio',
        videoLessonId: 'video-fis-01'
      },
      {
        id: 'uem-fis-2024-q3',
        examId: 'uem-fis-2024',
        university: 'UEM',
        subject: 'Física',
        year: 2024,
        statement: 'Um bloco de massa m = 4 kg repousa sobre uma superfície horizontal perfeitamente lisa. Aplica-se uma força constante F = 20 N horizontalmente durante um deslocamento de d = 5 m. Qual é a velocidade final do bloco?',
        options: [
          { key: 'A', text: '5 m/s' },
          { key: 'B', text: '7,07 m/s' },
          { key: 'C', text: '10 m/s' },
          { key: 'D', text: '25 m/s' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Teorema da Energia Cinética: O trabalho da força resultante é igual à variação da energia cinética.',
          steps: [
            '1. Trabalho da força: W = F · d = 20 N · 5 m = 100 J.',
            '2. Teorema: W = ΔE_cin = (1/2)·m·v² - (1/2)·m·v₀².',
            '3. Como partiu do repouso: 100 = (1/2) · 4 · v²  ⇒  100 = 2·v²  ⇒  v² = 50.',
            '4. v = √50 = 5√2 ≈ 7,07 m/s. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'W = ΔE_c = (1/2)·m·(v_f² - v_i²)'
        },
        topic: 'Trabalho e Energia Mecânica',
        difficulty: 'Médio',
        videoLessonId: 'video-fis-01'
      },
      {
        id: 'uem-fis-2024-q4',
        examId: 'uem-fis-2024',
        university: 'UEM',
        subject: 'Física',
        year: 2024,
        statement: 'Uma máquina térmica ideal de Carnot opera entre uma fonte quente à temperatura de T₁ = 600 K e uma fonte fria a T₂ = 300 K. Qual é o rendimento máximo teórico desta máquina?',
        options: [
          { key: 'A', text: '25%' },
          { key: 'B', text: '50%' },
          { key: 'C', text: '75%' },
          { key: 'D', text: '100%' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Ciclo de Carnot para o rendimento térmico de uma máquina reversível.',
          steps: [
            '1. Fórmula do rendimento de Carnot: η = 1 - (T₂ / T₁).',
            '2. As temperaturas já se encontram na escala absoluta Kelvin: T₁ = 600 K, T₂ = 300 K.',
            '3. η = 1 - (300 / 600) = 1 - 0,5 = 0,5 = 50%.',
            '4. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'η = 1 - (T_fria / T_quente)'
        },
        topic: 'Termodinâmica',
        difficulty: 'Fácil',
        videoLessonId: 'video-fis-01'
      },
      {
        id: 'uem-fis-2024-q5',
        examId: 'uem-fis-2024',
        university: 'UEM',
        subject: 'Física',
        year: 2024,
        statement: 'Uma onda eletromagnética propaga-se no vácuo com frequência f = 6,0 × 10¹⁴ Hz. Sabendo que a velocidade da luz no vácuo é c = 3,0 × 10⁸ m/s, qual é o comprimento de onda λ desta radiação?',
        options: [
          { key: 'A', text: '500 nm (5,0 × 10⁻⁷ m)' },
          { key: 'B', text: '200 nm (2,0 × 10⁻⁷ m)' },
          { key: 'C', text: '600 nm (6,0 × 10⁻⁷ m)' },
          { key: 'D', text: '400 nm (4,0 × 10⁻⁷ m)' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'Equação fundamental da ondulatória: c = λ · f.',
          steps: [
            '1. Isolando o comprimento de onda: λ = c / f.',
            '2. Substituindo valores: λ = (3,0 × 10⁸ m/s) / (6,0 × 10¹⁴ Hz) = 0,5 × 10⁻⁶ m = 5,0 × 10⁻⁷ m.',
            '3. Convertendo para nanómetros: 5,0 × 10⁻⁷ m = 500 nm (espectro visível - luz verde/azulada).',
            '4. Alternativa A correcta.'
          ],
          keyFormulaOrConcept: 'v = λ · f'
        },
        topic: 'Óptica e Ondulatória',
        difficulty: 'Fácil',
        videoLessonId: 'video-fis-01'
      },
      {
        id: 'uem-fis-2024-q6',
        examId: 'uem-fis-2024',
        university: 'UEM',
        subject: 'Física',
        year: 2024,
        statement: 'Um projétil é lançado obliquamente com velocidade inicial de 40 m/s sob um ângulo de 30° com a horizontal. Considerando g = 10 m/s², qual é a altura máxima atingida?',
        options: [
          { key: 'A', text: '15 m' },
          { key: 'B', text: '20 m' },
          { key: 'C', text: '25 m' },
          { key: 'D', text: '40 m' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Lançamento oblíquo no vácuo: no ponto mais alto, a componente vertical da velocidade é nula (v_y = 0).',
          steps: [
            '1. Componente vertical da velocidade inicial: v₀y = v₀ · sen(30°) = 40 · 0,5 = 20 m/s.',
            '2. Equação de Torricelli para o movimento vertical: v_y² = v₀y² - 2·g·H_max.',
            '3. No ápice v_y = 0: 0 = 20² - 2·(10)·H_max  ⇒  20·H_max = 400  ⇒  H_max = 20 metros.',
            '4. A altura máxima é 20 m. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'H_max = (v₀ · sen θ)² / (2g)'
        },
        topic: 'Lançamento Oblíquo',
        difficulty: 'Médio',
        videoLessonId: 'video-fis-01'
      }
    ]
  },
  {
    id: 'up-port-2024',
    title: 'Exame de Admissão de Língua Portuguesa',
    university: 'Universidade Pedagógica de Moçambique',
    universityCode: 'UP',
    subject: 'Português',
    year: 2024,
    durationMinutes: 120,
    totalQuestions: 6,
    passingScoreSuggestion: 13.0,
    authorId: 'tch-prof-alberto-mabjaia',
    authorName: 'Prof. Dr. Alberto Mabjaia',
    authorInstitution: 'Faculdade de Ciências - UEM',
    authorEmail: 'a.mabjaia@uem.mz',
    description: 'Focado em compreensão e interpretação de textos literários moçambicanos (Mia Couto, Craveirinha, Noémia de Sousa), sintaxe de orações complexas, figuras de estilo e morfologia.',
    questions: [
      {
        id: 'up-port-2024-q1',
        examId: 'up-port-2024',
        university: 'UP',
        subject: 'Português',
        year: 2024,
        statement: 'Na frase: "Embora o mar batesse com fúria contra as rochas da praia de Wimbe, os pescadores não hesitaram em lançar as redes", a oração destacada classifica-se como:',
        options: [
          { key: 'A', text: 'Oração subordinada adverbial causal' },
          { key: 'B', text: 'Oração subordinada adverbial concessiva' },
          { key: 'C', text: 'Oração subordinada adverbial consecutiva' },
          { key: 'D', text: 'Oração subordinada adverbial condicional' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'A conjunção subordinativa "embora" introduz uma ideia de concessão (um fato que se opõe à oração principal, mas não anula sua concretização).',
          steps: [
            '1. A conjunção "embora" exige o modo subjuntivo ("batesse") e exprime uma quebra de expectativa ou concessão.',
            '2. Pode ser substituída por locuções equivalentes: "Ainda que", "Mesmo que", "Conquanto".',
            '3. Logo, é uma Oração Subordinada Adverbial Concessiva. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'Conjunções Concessivas: embora, conquanto, ainda que, mesmo que, se bem que'
        },
        topic: 'Sintaxe e Orações Subordinadas',
        difficulty: 'Fácil',
        videoLessonId: 'video-port-01'
      },
      {
        id: 'up-port-2024-q2',
        examId: 'up-port-2024',
        university: 'UP',
        subject: 'Português',
        year: 2024,
        statement: 'No poema de José Craveirinha: "Quero ser tambor / Nem ritmo de festa nem batuque de guerra / Apenas tambor a ecoar a dor da minha gente...", a figura de estilo predominante nos versos iniciais é:',
        options: [
          { key: 'A', text: 'Metáfora' },
          { key: 'B', text: 'Eufemismo' },
          { key: 'C', text: 'Hipérbole' },
          { key: 'D', text: 'Paradoxo' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'O sujeito lírico estabelece uma identificação direta e simbólica entre seu próprio ser e o instrumento tradicional moçambicano ("tambor"), sem conectivo comparativo explícito.',
          steps: [
            '1. Se houvesse a palavra "como" ("Quero ser como um tambor"), seria uma comparação explícita.',
            '2. A asserção direta "Quero ser tambor" constitui uma translação semântica de sentido: uma Metáfora.',
            '3. O tambor passa a ser o instrumento de ressonância da memória e sofrimento colectivo moçambicano.',
            '4. Alternativa A correcta.'
          ],
          keyFormulaOrConcept: 'Metáfora: comparação implícita sem conjunção conectiva (como, tal qual)'
        },
        topic: 'Estilística e Figuras de Linguagem',
        difficulty: 'Médio',
        videoLessonId: 'video-port-01'
      },
      {
        id: 'up-port-2024-q3',
        examId: 'up-port-2024',
        university: 'UP',
        subject: 'Português',
        year: 2024,
        statement: 'Assinale a alternativa que apresenta a concordância verbal correcta de acordo com a norma-padrão gramatical:',
        options: [
          { key: 'A', text: 'Fazia muitos anos que as comunidades ribeirinhas não enfrentavam estiagem tão severa.' },
          { key: 'B', text: 'Faziam muitos anos que as comunidades ribeirinhas não enfrentavam estiagem tão severa.' },
          { key: 'C', text: 'Haviam muitos candidatos inscritos no pólo de Nampula.' },
          { key: 'D', text: 'Devem de haver soluções sustentáveis para o problema da erosão costeira.' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'O verbo "fazer", quando empregado no sentido de tempo decorrido, é impessoal e conjuga-se obrigatoriamente na 3ª pessoa do singular.',
          steps: [
            '1. "Fazer" indicando tempo decorrido não admite plural: "Fazia muitos anos" (e não "faziam").',
            '2. O verbo "haver" no sentido de existir também é impessoal: "Havia muitos candidatos" (C está incorrecta).',
            '3. A alternativa A é a única rigorosamente conforme a norma-padrão.'
          ],
          keyFormulaOrConcept: 'Verbos impessoais (haver = existir; fazer = tempo decorrido): mantêm-se na 3ª pessoa do singular'
        },
        topic: 'Concordância Verbal e Nominal',
        difficulty: 'Médio',
        videoLessonId: 'video-port-01'
      },
      {
        id: 'up-port-2024-q4',
        examId: 'up-port-2024',
        university: 'UP',
        subject: 'Português',
        year: 2024,
        statement: 'Na obra "Terra Sonâmbula" de Mia Couto, a intersecção entre a viagem de Tuahir e Muidinga e a leitura dos cadernos de Kindzu representa:',
        options: [
          { key: 'A', text: 'Uma narrativa unilinear sem alternância de perspectivas' },
          { key: 'B', text: 'Uma estrutura em abismo (mise en abyme) que entrelaça a história viva à memória escrita' },
          { key: 'C', text: 'Um diário estritamente documental da guerra sem elementos de realismo mágico' },
          { key: 'D', text: 'Um relato biográfico sem ficção histórica' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Mia Couto constrói uma obra polifônica onde o plano da viagem real pelo machimbombo queimado se cruza dialogicamente com os cadernos achados.',
          steps: [
            '1. A técnica da "narrativa dentro da narrativa" (mise en abyme) permite a convivência do tempo da destruição e do tempo do sonho.',
            '2. Muidinga aprende a ler ao mesmo tempo em que reconstrói a sua própria identidade.',
            '3. Alternativa B sintetiza com precisão a estrutura narrativa da obra.'
          ],
          keyFormulaOrConcept: 'Literatura Moçambicana: Polifonia, oralidade reinventada e mito'
        },
        topic: 'Literatura Moçambicana',
        difficulty: 'Difícil',
        videoLessonId: 'video-port-01'
      },
      {
        id: 'up-port-2024-q5',
        examId: 'up-port-2024',
        university: 'UP',
        subject: 'Português',
        year: 2024,
        statement: 'Identifique o processo de formação da palavra "descolonização":',
        options: [
          { key: 'A', text: 'Derivação prefixal apenas' },
          { key: 'B', text: 'Derivação sufixal apenas' },
          { key: 'C', text: 'Derivação parassintética' },
          { key: 'D', text: 'Derivação prefixal e sufixal' }
        ],
        correctOption: 'D',
        explanation: {
          summary: 'A palavra deriva de colónia/colonizar pela aposição do prefixo des- e do sufixo -ção, sem dependência parassintética.',
          steps: [
            '1. Radical: colon-. Palavra base: colonizar.',
            '2. Adiciona-se prefixo "des-" e sufixo "-ção".',
            '3. A palavra "colonização" existe de forma autónoma sem o prefixo, o que descarta a parassíntese.',
            '4. Logo, trata-se de derivação prefixal e sufixal (Alternativa D).'
          ],
          keyFormulaOrConcept: 'Na parassíntese, o prefixo e sufixo são anexados simultaneamente; sem um deles a palavra não existe'
        },
        topic: 'Morfologia e Formação de Palavras',
        difficulty: 'Fácil',
        videoLessonId: 'video-port-01'
      },
      {
        id: 'up-port-2024-q6',
        examId: 'up-port-2024',
        university: 'UP',
        subject: 'Português',
        year: 2024,
        statement: 'Qual das opções abaixo substitui adequadamente a oração reduzida "Ao terminar a redacção da prova, os alunos entregaram as folhas ao júri":',
        options: [
          { key: 'A', text: 'Quando terminaram a redacção da prova' },
          { key: 'B', text: 'Porque terminaram a redacção da prova' },
          { key: 'C', text: 'Conforme terminaram a redacção da prova' },
          { key: 'D', text: 'Se bem que terminaram a redacção da prova' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'A locução prepositiva "ao + infinitivo" possui valor semântico tipicamente temporal ("no momento em que", "quando").',
          steps: [
            '1. "Ao terminar..." denota a circunstância de tempo do ato de entrega.',
            '2. A oração desenvolvida equivalente com o mesmo sentido temporal é "Quando terminaram...".',
            '3. Alternativa A correcta.'
          ],
          keyFormulaOrConcept: 'Ao + Infinitivo = Quando / Logo que + Modo Indicativo'
        },
        topic: 'Orações Reduzidas e Desenvolvidas',
        difficulty: 'Médio',
        videoLessonId: 'video-port-01'
      }
    ]
  },
  {
    id: 'unizambeze-qui-2024',
    title: 'Exame de Admissão de Química Geral & Orgânica',
    university: 'Universidade Zambeze',
    universityCode: 'UniZambeze',
    subject: 'Química',
    year: 2024,
    durationMinutes: 120,
    totalQuestions: 5,
    passingScoreSuggestion: 13.5,
    description: 'Orientado para a Faculdade de Ciências de Saúde e Agronomia. Trata de estequiometria, equilíbrios iônicos, pH, termoquímica e funções orgânicas.',
    questions: [
      {
        id: 'uz-qui-2024-q1',
        examId: 'unizambeze-qui-2024',
        university: 'UniZambeze',
        subject: 'Química',
        year: 2024,
        statement: 'Qual é o pH de uma solução aquosa de ácido clorídrico (HCl) de concentração 0,001 mol/L a 25 °C?',
        options: [
          { key: 'A', text: '1' },
          { key: 'B', text: '2' },
          { key: 'C', text: '3' },
          { key: 'D', text: '11' }
        ],
        correctOption: 'C',
        explanation: {
          summary: 'O HCl é um ácido forte monoácido, que se ioniza a 100% em água.',
          steps: [
            '1. Como se ioniza completamente: [H⁺] = [HCl] = 0,001 mol/L = 10⁻³ mol/L.',
            '2. Definição de pH: pH = -log[H⁺] = -log(10⁻³) = 3.',
            '3. Portanto, a solução ácida tem pH = 3. Alternativa C correcta.'
          ],
          keyFormulaOrConcept: 'pH = -log₁₀[H⁺]  |  pOH + pH = 14 a 25 °C'
        },
        topic: 'Equilíbrio Iônico e pH',
        difficulty: 'Fácil',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uz-qui-2024-q2',
        examId: 'unizambeze-qui-2024',
        university: 'UniZambeze',
        subject: 'Química',
        year: 2024,
        statement: 'Quantos gramas de gás oxigênio (O₂, massa molar = 32 g/mol) são necessários para reagir completamente com 4 g de gás hidrogênio (H₂, massa molar = 2 g/mol) na formação de água (2 H₂ + O₂ → 2 H₂O)?',
        options: [
          { key: 'A', text: '16 g' },
          { key: 'B', text: '32 g' },
          { key: 'C', text: '64 g' },
          { key: 'D', text: '8 g' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'Cálculo estequiométrico baseado nas massas molares e coeficientes estequiométricos da reação balanceada.',
          steps: [
            '1. Equação: 2 H₂ + 1 O₂ → 2 H₂O.',
            '2. Relação molar: 2 moles de H₂ (2 × 2 g = 4 g) reagem com 1 mol de O₂ (1 × 32 g = 32 g).',
            '3. Portanto, exatamente 4 g de hidrogênio exigem 32 g de O₂.',
            '4. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'Lei das Proporções Definidas de Proust'
        },
        topic: 'Estequiometria',
        difficulty: 'Fácil',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uz-qui-2024-q3',
        examId: 'unizambeze-qui-2024',
        university: 'UniZambeze',
        subject: 'Química',
        year: 2024,
        statement: 'O composto orgânico de fórmula estrutural CH₃-CH₂-CO-CH₃ pertence a qual função química?',
        options: [
          { key: 'A', text: 'Aldeído' },
          { key: 'B', text: 'Cetona (butanona)' },
          { key: 'C', text: 'Éster' },
          { key: 'D', text: 'Ácido carboxílico' }
        ],
        correctOption: 'B',
        explanation: {
          summary: 'A presença do grupo carbonila (C=O) ligado a dois átomos de carbono define a função cetona.',
          steps: [
            '1. Estrutura: grupo carbonila entre carbonos secundários (CH₃-CH₂-C(=O)-CH₃).',
            '2. Cadeia com 4 carbonos: butanona.',
            '3. Alternativa B correcta.'
          ],
          keyFormulaOrConcept: 'Carbonila entre carbonos = Cetona  |  Carbonila na extremidade = Aldeído'
        },
        topic: 'Química Orgânica e Funções Oxigenadas',
        difficulty: 'Médio',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uz-qui-2024-q4',
        examId: 'unizambeze-qui-2024',
        university: 'UniZambeze',
        subject: 'Química',
        year: 2024,
        statement: 'De acordo com o Princípio de Le Chatelier, para a reação exotérmica em equilíbrio N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) (ΔH < 0), qual alteração favorece a formação de amônia (NH₃)?',
        options: [
          { key: 'A', text: 'Aumento da temperatura' },
          { key: 'B', text: 'Diminuição da pressão total' },
          { key: 'C', text: 'Aumento da pressão e diminuição da temperatura' },
          { key: 'D', text: 'Retirada constante de nitrogênio' }
        ],
        correctOption: 'C',
        explanation: {
          summary: 'Reação com diminuição do número de mols de gás (4 mols nos reagentes → 2 mols nos produtos) e exotérmica (libera calor).',
          steps: [
            '1. Aumentar a pressão desloca o equilíbrio para o lado de menor volume gasoso (para a direita, formando NH₃).',
            '2. Diminuir a temperatura favorece o sentido exotérmico (para a direita).',
            '3. Portanto, aumentar a pressão e diminuir a temperatura maximiza o rendimento de NH₃. Alternativa C correcta.'
          ],
          keyFormulaOrConcept: 'Princípio de Le Chatelier: o sistema reage em sentido contrário à perturbação imposta'
        },
        topic: 'Equilíbrio Químico',
        difficulty: 'Médio',
        videoLessonId: 'video-mat-01'
      },
      {
        id: 'uz-qui-2024-q5',
        examId: 'unizambeze-qui-2024',
        university: 'UniZambeze',
        subject: 'Química',
        year: 2024,
        statement: 'Qual é o número de oxidação (NOX) do átomo de manganês no permanganato de potássio (KMnO₄)?',
        options: [
          { key: 'A', text: '+7' },
          { key: 'B', text: '+5' },
          { key: 'C', text: '+4' },
          { key: 'D', text: '+2' }
        ],
        correctOption: 'A',
        explanation: {
          summary: 'A soma dos números de oxidação em um composto eletricamente neutro é igual a zero.',
          steps: [
            '1. NOX do Potássio (K, metal alcalino) = +1.',
            '2. NOX do Oxigênio (O) = -2. Para 4 átomos: 4 × (-2) = -8.',
            '3. Equação: (+1) + NOX(Mn) + (-8) = 0  ⇒  NOX(Mn) - 7 = 0  ⇒  NOX(Mn) = +7.',
            '4. O manganês possui NOX = +7. Alternativa A correcta.'
          ],
          keyFormulaOrConcept: 'Σ NOX = 0 para moléculas neutras'
        },
        topic: 'Oxirredução e NOX',
        difficulty: 'Fácil',
        videoLessonId: 'video-mat-01'
      }
    ]
  }
];

export const STUDY_MANUALS: StudyManual[] = [
  {
    id: 'man-mat-01',
    subject: 'Matemática',
    title: 'Guia Fundamental: Funções Reais, Logaritmos e Exponenciais',
    universityFocus: 'UEM & UP',
    readTimeMinutes: 18,
    authorId: 'tch-prof-alberto-mabjaia',
    authorName: 'Prof. Dr. Alberto Mabjaia',
    authorInstitution: 'Faculdade de Ciências - UEM',
    authorEmail: 'a.mabjaia@uem.mz',
    chapters: [
      {
        title: '1. Domínio e Restrições de Funções Reais',
        content: [
          'No exame da UEM, questões envolvendo o domínio de funções são recorrentes. Todo candidato precisa dominar as quatro restrições fundamentais do corpo dos números reais ℝ:',
          '• Radicais de índice par (√(g(x)), ∜(g(x))): a expressão sob o radical deve ser maior ou igual a zero (g(x) ≥ 0).',
          '• Denominadores de frações algébricas (f(x)/g(x)): o denominador nunca pode se anular (g(x) ≠ 0).',
          '• Logaritmando de log_b(g(x)): deve ser estritamente positivo (g(x) > 0) e a base deve ser positiva e diferente de 1 (b > 0 e b ≠ 1).'
        ],
        keyFormulas: [
          'Dom(log_b(g(x))) = { x ∈ ℝ : g(x) > 0 }',
          'Dom(√(g(x))) = { x ∈ ℝ : g(x) ≥ 0 }',
          'Dom(1/h(x)) = { x ∈ ℝ : h(x) ≠ 0 }'
        ],
        tips: 'Atenção ao sinal da desigualdade quando multiplica ou divide uma inequação por um número negativo. Inverta sempre o sentido!'
      },
      {
        title: '2. Propriedades Operatórias dos Logaritmos',
        content: [
          'As transformações operatórias reduzem expressões complexas a equações lineares ou quadráticas elementares:',
          '• log_b(M · N) = log_b(M) + log_b(N)',
          '• log_b(M / N) = log_b(M) - log_b(N)',
          '• log_b(M^k) = k · log_b(M)',
          '• Mudança de base: log_b(M) = log_c(M) / log_c(b)'
        ],
        keyFormulas: [
          'log_a(x) = y  ⇔  a^y = x (com a > 0, a ≠ 1, x > 0)',
          'a^(log_a(x)) = x'
        ],
        tips: 'Lembre-se sempre de testar as soluções encontradas na condição de existência original do problema.'
      }
    ]
  },
  {
    id: 'man-fis-01',
    subject: 'Física',
    title: 'Mecânica Clássica: Cinemática, Leis de Newton e Energia',
    universityFocus: 'UEM & UniZambeze',
    readTimeMinutes: 22,
    authorId: 'tch-prof-amina-daude',
    authorName: 'Prof.ª Dra. Amina Daúde',
    authorInstitution: 'Faculdade de Ciências Naturais - UP',
    authorEmail: 'a.daude@up.ac.mz',
    chapters: [
      {
        title: '1. Movimento Retilíneo Uniforme (MRU) e Variado (MRUV)',
        content: [
          'A cinemática constitui cerca de 25% das questões do exame de admissão de Física da UEM.',
          'Em MRUV a aceleração escalar é constante e não nula. As relações temporais e a equação de Torricelli são as ferramentas primordiais para resolver problemas com ausência de tempo explícito.'
        ],
        keyFormulas: [
          'v = v₀ + a · t',
          's = s₀ + v₀ · t + (1/2) · a · t²',
          'v² = v₀² + 2 · a · Δs (Equação de Torricelli)'
        ],
        tips: 'No ponto de altura máxima de um lançamento vertical para cima, a velocidade instantânea é rigorosamente zero (v = 0).'
      },
      {
        title: '2. Conservação da Energia Mecânica e Trabalho',
        content: [
          'Na ausência de forças dissipativas (como atrito ou resistência do ar), a energia mecânica total do sistema isolado permanece rigorosamente constante ao longo de qualquer trajetória.'
        ],
        keyFormulas: [
          'E_mec = E_cin + E_pot',
          'E_cin = (1/2) · m · v²',
          'E_pot_grav = m · g · h',
          'W = ΔE_cin = (1/2)·m·v_f² - (1/2)·m·v_i²'
        ],
        tips: 'Use sempre as unidades padrão do Sistema Internacional (SI): massa em kg, distância em m e tempo em segundos.'
      }
    ]
  },
  {
    id: 'man-port-01',
    subject: 'Português',
    title: 'Guia de Sintaxe, Concordância e Literatura Moçambicana',
    universityFocus: 'UP, UEM & UJC',
    readTimeMinutes: 20,
    authorId: 'tch-prof-alberto-mabjaia',
    authorName: 'Prof. Dr. Alberto Mabjaia',
    authorInstitution: 'Faculdade de Ciências - UEM',
    authorEmail: 'a.mabjaia@uem.mz',
    chapters: [
      {
        title: '1. Oração Subordinada Substantiva e Adverbial',
        content: [
          'Identificação precisa das relações de causa, consequência, concessão e condição nas provas da UP.',
          '• Concessivas: expressam um obstáculo superado (embora, conquanto, ainda que).',
          '• Causais: explicam a causa do evento (porque, visto que, já que, como no início da frase).'
        ],
        keyFormulas: [
          'Embora + Subjuntivo = Concessão',
          'Visto que + Indicativo = Causa',
          'A fim de que + Subjuntivo = Finalidade'
        ],
        tips: 'Não confunda oração subordinada adverbial causal com coordenada explicativa. A causal antecede ou causa diretamente o fato principal.'
      },
      {
        title: '2. Marcos da Literatura Moçambicana',
        content: [
          'A produção poética e ficcional de Moçambique é ponto central na prova da Universidade Pedagógica e da UEM.',
          '• Poesia de Combate e Identidade: José Craveirinha (Karingana ua Karingana, Cela 1), Noémia de Sousa (Sangue Negro).',
          '• Ficção e Reinvenção da Linguagem: Mia Couto (Terra Sonâmbula, Vozes Anoitecidas), Ungulani Ba Ka Khosa (Ualalapi), Paulina Chiziane (Balada de Amor ao Vento, Niketche).'
        ],
        keyFormulas: [
          'Geração da Charrua e Revista Msaho',
          'Oralidade, neologismos e memória identitária nacional'
        ],
        tips: 'Atenção aos temas de tradição versus modernidade e o impacto dos conflitos armados na reconstituição da identidade nos romances de Mia Couto.'
      }
    ]
  }
];

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'video-mat-01',
    title: 'Resolução Passo a Passo: Exame de Matemática UEM 2024',
    subject: 'Matemática',
    instructor: 'Prof. Dr. Alberto Mabjaia',
    institution: 'Faculdade de Ciências - UEM',
    authorId: 'tch-prof-alberto-mabjaia',
    authorName: 'Prof. Dr. Alberto Mabjaia',
    authorInstitution: 'Faculdade de Ciências - UEM',
    authorEmail: 'a.mabjaia@uem.mz',
    duration: '28:40',
    description: 'Análise detalhada das questões com maior índice de erros nos últimos exames: domínio de logaritmos, identidades trigonométricas de arco duplo e limites indeterminados com raízes.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    topicsCovered: ['Logaritmos', 'Trigonometria', 'Limites', 'Assíntotas'],
    chapters: [
      { time: '00:00', label: 'Introdução e Estrutura da Prova UEM' },
      { time: '04:15', label: 'Questão 1: Domínio de Funções com Logaritmo e Raiz' },
      { time: '11:30', label: 'Questão 2: Fórmulas de Arco Duplo na Trigonometria' },
      { time: '18:50', label: 'Questão 4: Limites com Indeterminação 0/0 e Racionalização' },
      { time: '24:10', label: 'Dicas de Gestão de Tempo no Dia do Exame' }
    ]
  },
  {
    id: 'video-fis-01',
    title: 'Mecânica e Circuitos Elétricos para Engenharia UEM',
    subject: 'Física',
    instructor: 'Prof.ª Dra. Amina Daúde',
    institution: 'Faculdade de Ciências Naturais - UP',
    authorId: 'tch-prof-amina-daude',
    authorName: 'Prof.ª Dra. Amina Daúde',
    authorInstitution: 'Faculdade de Ciências Naturais - UP',
    authorEmail: 'a.daude@up.ac.mz',
    duration: '32:15',
    description: 'Resolução das questões fundamentais de cinemática escalar, teorema da energia cinética e cálculo de resistência equivalente em associações mistas de resistores.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    topicsCovered: ['MRUV', 'Teorema da Energia Cinética', 'Leis de Ohm', 'Associação de Resistores'],
    chapters: [
      { time: '00:00', label: 'Visão Geral do Perfil de Prova de Física' },
      { time: '05:20', label: 'Cinemática: Aplicação Correta de Torricelli' },
      { time: '14:40', label: 'Energia Mecânica e Trabalho de Força Resultante' },
      { time: '23:10', label: 'Circuitos em Paralelo: DDP constante e Divisão de Corrente' }
    ]
  },
  {
    id: 'video-port-01',
    title: 'Sintaxe, Subordinação e Literatura Moçambicana na UP',
    subject: 'Português',
    instructor: 'Prof. Dr. Alberto Mabjaia',
    institution: 'Faculdade de Ciências - UEM',
    authorId: 'tch-prof-alberto-mabjaia',
    authorName: 'Prof. Dr. Alberto Mabjaia',
    authorInstitution: 'Faculdade de Ciências - UEM',
    authorEmail: 'a.mabjaia@uem.mz',
    duration: '26:50',
    description: 'Análise de orações subordinadas concessivas e causais, concordância verbal com verbos impessoais (haver e fazer) e interpretação estilística de José Craveirinha e Mia Couto.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    topicsCovered: ['Orações Concessivas', 'Concordância Verbal', 'Mia Couto', 'José Craveirinha'],
    chapters: [
      { time: '00:00', label: 'Critérios de Avaliação da Prova de Português' },
      { time: '06:10', label: 'Classificação de Orações Subordinadas Adverbiais' },
      { time: '13:45', label: 'Regras de Ouro na Concordância com Verbos Impessoais' },
      { time: '20:15', label: 'Figuras de Estilo em Textos Poéticos Moçambicanos' }
    ]
  }
];
