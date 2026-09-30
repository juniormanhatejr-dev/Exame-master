package mz.co.examemaster.repositories;

import android.content.Context;
import android.content.SharedPreferences;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import mz.co.examemaster.models.Course;
import mz.co.examemaster.models.Exam;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.models.Question;
import mz.co.examemaster.models.StudyManual;
import mz.co.examemaster.models.Subject;
import mz.co.examemaster.models.TopicPerformance;
import mz.co.examemaster.models.University;
import mz.co.examemaster.models.UserProfile;
import mz.co.examemaster.models.VideoLesson;

/**
 * Repositório com dados locais de demonstração para funcionamento offline imediato.
 * Todos os dados de exames e conteúdos são claramente marcados como "Demo".
 */
public class DemoDataRepository implements IDataRepository {

    private static DemoDataRepository instance;
    private final SharedPreferences preferences;
    private final Gson gson;

    private static final String PREF_NAME = "ExameMasterPrefs";
    private static final String KEY_RESULTS_HISTORY = "results_history";
    private static final String KEY_USER_PROFILE = "user_profile";

    private final List<University> universities = new ArrayList<>();
    private final List<Course> courses = new ArrayList<>();
    private final List<Subject> subjects = new ArrayList<>();
    private final List<Exam> exams = new ArrayList<>();
    private final List<Question> questions = new ArrayList<>();
    private final List<StudyManual> manuals = new ArrayList<>();
    private final List<VideoLesson> videoLessons = new ArrayList<>();

    public static synchronized DemoDataRepository getInstance(Context context) {
        if (instance == null) {
            instance = new DemoDataRepository(context.getApplicationContext());
        }
        return instance;
    }

    private DemoDataRepository(Context context) {
        this.preferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        this.gson = new Gson();
        initDemoData();
    }

    private void initDemoData() {
        initUniversities();
        initCourses();
        initSubjects();
        initExams();
        initQuestions();
        initManuals();
        initVideoLessons();
    }

    private void initUniversities() {
        universities.add(new University(
                "uem", "Universidade Eduardo Mondlane", "UEM",
                "Maputo (Campus Principal)", "A mais antiga e prestigiada instituição de ensino superior de Moçambique, fundada em 1962.",
                "uem_logo", 14, true));

        universities.add(new University(
                "up_maputo", "Universidade Pedagógica de Maputo", "UP-Maputo",
                "Maputo", "Instituição de referência na formação de professores e quadros em educação e humanidades.",
                "up_logo", 10, true));

        universities.add(new University(
                "ujc", "Universidade Joaquim Chissano", "UJC",
                "Maputo", "Especializada em Relações Internacionais, Diplomacia, Governação e Ciências Políticas.",
                "ujc_logo", 6, true));

        universities.add(new University(
                "unipungue", "Universidade Púnguè", "UniPúnguè",
                "Manica e Sofala (Chimoio/Beira)", "Universidade pública cobrindo a região centro de Moçambique com foco em desenvolvimento regional.",
                "pungue_logo", 8, true));

        universities.add(new University(
                "unilicungo", "Universidade Licungo", "UniLicungo",
                "Quelimane e Mocuba (Zambézia)", "Instituição superior dedicada à inovação, formação docente e ciências agrárias e técnicas.",
                "licungo_logo", 7, true));

        universities.add(new University(
                "unirovuma", "Universidade Rovuma", "UniRovuma",
                "Nampula, Cabo Delgado e Niassa", "Pólo universitário do norte do país dedicado a ciências exactas, letras e desenvolvimento social.",
                "rovuma_logo", 9, true));

        universities.add(new University(
                "unizambeze", "Universidade Zambeze", "UniZambeze",
                "Beira, Chimoio e Tete", "Foco em engenharias, ciências da saúde, ciências agrícolas e tecnologias aplicadas.",
                "zambeze_logo", 11, true));

        universities.add(new University(
                "ucm", "Universidade Católica de Moçambique", "UCM",
                "Beira e várias províncias", "Instituição de ensino de alta qualidade com forte tradição em medicina, direito e economia.",
                "ucm_logo", 12, true));
    }

    private void initCourses() {
        // UEM
        courses.add(new Course("c_med_uem", "uem", "Medicina Geral", "Faculdade de Medicina", 6, Arrays.asList("subj_biologia", "subj_quimica"), "Formação de médicos clínicos com ênfase no Sistema Nacional de Saúde de Moçambique."));
        courses.add(new Course("c_inf_uem", "uem", "Engenharia Informática", "Faculdade de Engenharia", 5, Arrays.asList("subj_matematica", "subj_fisica"), "Desenvolvimento de software, infraestruturas de redes e computação avançada."));
        courses.add(new Course("c_dir_uem", "uem", "Direito", "Faculdade de Direito", 4, Arrays.asList("subj_portugues", "subj_historia"), "Ciências jurídicas com foco na legislação moçambicana e internacional."));
        courses.add(new Course("c_eco_uem", "uem", "Economia", "Faculdade de Economia", 4, Arrays.asList("subj_matematica", "subj_portugues"), "Análise macroeconómica, finanças públicas e mercados em Moçambique."));

        // UP-Maputo
        courses.add(new Course("c_mat_up", "up_maputo", "Ensino de Matemática", "Faculdade de Ciências Naturais e Exactas", 4, Arrays.asList("subj_matematica", "subj_fisica"), "Formação pedagógica e científica de docentes para o ensino secundário e técnico."));
        courses.add(new Course("c_port_up", "up_maputo", "Ensino de Português", "Faculdade de Ciências da Linguagem", 4, Arrays.asList("subj_portugues", "subj_historia"), "Linguística aplicada, literatura moçambicana e didáctica da língua portuguesa."));

        // UJC
        courses.add(new Course("c_ri_ujc", "ujc", "Relações Internacionais e Diplomacia", "Faculdade de Ciências Sociais e Políticas", 4, Arrays.asList("subj_portugues", "subj_historia", "subj_geografia"), "Diplomacia, geopolítica e cooperação regional na África Austral."));

        // UniZambeze
        courses.add(new Course("c_civ_zambeze", "unizambeze", "Engenharia Civil", "Faculdade de Ciências e Tecnologia", 5, Arrays.asList("subj_matematica", "subj_fisica"), "Infraestruturas, cálculo estrutural e planeamento urbano."));
    }

    private void initSubjects() {
        subjects.add(new Subject("subj_matematica", "Matemática", "MAT", "Funções, Trigonometria, Análise Combinatória, Limites e Geometria", 60, "ic_math"));
        subjects.add(new Subject("subj_portugues", "Português", "PORT", "Compreensão textual, Sintaxe, Morfologia, Literatura e Comunicação", 50, "ic_book"));
        subjects.add(new Subject("subj_fisica", "Física", "FIS", "Mecânica, Cinemática, Electricidade, Óptica e Termodinâmica", 45, "ic_physics"));
        subjects.add(new Subject("subj_biologia", "Biologia", "BIO", "Citologia, Genética, Fisiologia Humana, Ecologia e Botânica", 55, "ic_bio"));
        subjects.add(new Subject("subj_quimica", "Química", "QUI", "Estrutura Atómica, Estequiometria, Química Orgânica e Soluções", 40, "ic_chem"));
        subjects.add(new Subject("subj_historia", "História", "HIST", "História de Moçambique, Luta de Libertação e História Geral", 35, "ic_history"));
        subjects.add(new Subject("subj_geografia", "Geografia", "GEO", "Geografia de Moçambique, Climatologia, Recursos Minerais e População", 35, "ic_globe"));
    }

    private void initExams() {
        exams.add(new Exam("ex_uem_mat_2024", "uem", "UEM", "subj_matematica", "Matemática", 2024, "UEM - Exame de Matemática 2024 (Demo)", 10, 60, true));
        exams.add(new Exam("ex_uem_bio_2024", "uem", "UEM", "subj_biologia", "Biologia", 2024, "UEM - Exame de Biologia 2024 (Demo)", 10, 60, true));
        exams.add(new Exam("ex_up_port_2023", "up_maputo", "UP-Maputo", "subj_portugues", "Português", 2023, "UP-Maputo - Exame de Português 2023 (Demo)", 10, 60, true));
        exams.add(new Exam("ex_ujc_hist_2023", "ujc", "UJC", "subj_historia", "História", 2023, "UJC - Exame de História 2023 (Demo)", 10, 60, true));
        exams.add(new Exam("ex_zambeze_fis_2024", "unizambeze", "UniZambeze", "subj_fisica", "Física", 2024, "UniZambeze - Exame de Física 2024 (Demo)", 10, 60, true));
    }

    private void initQuestions() {
        // Questão 1 - Matemática UEM
        questions.add(new Question(
                "q_mat_01", "Universidade Eduardo Mondlane", "Engenharia Informática", "Matemática", 2024,
                "Qual é o domínio da função f(x) = log(2x - 6) no conjunto dos números reais?",
                null,
                "x >= 3",
                "x > 3",
                "x < 3",
                "x pertença a R",
                "B",
                "Para que a função logarítmica exista nos números reais, o logaritmando deve ser estritamente positivo. Logo: 2x - 6 > 0 => 2x > 6 => x > 3. Portanto a alternativa correcta é B.",
                "https://examemaster.mz/video/mat_logaritmos_01.mp4",
                "Funções e Logaritmos", "Fácil"));

        // Questão 2 - Matemática UEM
        questions.add(new Question(
                "q_mat_02", "Universidade Eduardo Mondlane", "Engenharia Informática", "Matemática", 2024,
                "Considere a progressão aritmética (PA) onde o primeiro termo a1 = 5 e a razão r = 4. Qual é o 15º termo desta sucessão?",
                null,
                "59",
                "61",
                "65",
                "60",
                "B",
                "A fórmula do termo geral de uma progressão aritmética é an = a1 + (n - 1) * r. Substituindo os valores: a15 = 5 + (15 - 1) * 4 = 5 + 14 * 4 = 5 + 56 = 61. Logo, a opção correcta é B.",
                "https://examemaster.mz/video/mat_pa_pg.mp4",
                "Sucessões e Progressões", "Média"));

        // Questão 3 - Matemática UEM
        questions.add(new Question(
                "q_mat_03", "Universidade Eduardo Mondlane", "Engenharia Informática", "Matemática", 2024,
                "Calcule o valor do limite quando x tende a 2 de (x² - 4) / (x - 2):",
                null,
                "0",
                "2",
                "4",
                "Infinito",
                "C",
                "Ao substituir x = 2 directamente, obtemos uma indeterminação 0/0. Factorizando o numerador por diferença de quadrados: (x² - 4) = (x - 2)(x + 2). Cancelando (x - 2), resta (x + 2). Quando x -> 2, temos 2 + 2 = 4. Resposta correcta C.",
                "https://examemaster.mz/video/mat_limites.mp4",
                "Cálculo e Limites", "Média"));

        // Questão 4 - Biologia UEM
        questions.add(new Question(
                "q_bio_01", "Universidade Eduardo Mondlane", "Medicina Geral", "Biologia", 2024,
                "Qual organelo celular é responsável directo pela respiração celular aeróbia e produção da maior parte do ATP?",
                null,
                "Complexo de Golgi",
                "Mitocôndria",
                "Ribossoma",
                "Lisossoma",
                "B",
                "A mitocôndria é a 'central energética' da célula eucariótica, onde ocorrem o Ciclo de Krebs e a Fosforilação Oxidativa, gerando a maior parte do ATP através da respiração celular. Resposta B.",
                "https://examemaster.mz/video/bio_citologia.mp4",
                "Citologia", "Fácil"));

        // Questão 5 - Biologia UEM
        questions.add(new Question(
                "q_bio_02", "Universidade Eduardo Mondlane", "Medicina Geral", "Biologia", 2024,
                "No cruzamento entre indivíduos heterozigotos para uma característica com dominância completa (Aa x Aa), qual é a proporção fenotípica esperada na descendência segundo Mendel?",
                null,
                "1:2:1",
                "3:1",
                "9:3:3:1",
                "1:1",
                "B",
                "O cruzamento Aa x Aa gera genótipos: 1 AA, 2 Aa, 1 aa (proporção genotípica 1:2:1). Como o alelo 'A' domina 'a', os fenótipos serão 3 com o fenótipo dominante e 1 com o recessivo (proporção fenotípica 3:1). Resposta B.",
                "https://examemaster.mz/video/bio_genetica.mp4",
                "Genética Mendeliana", "Média"));

        // Questão 6 - Português UP
        questions.add(new Question(
                "q_port_01", "Universidade Pedagógica de Maputo", "Ensino de Português", "Português", 2023,
                "Na frase: 'Os candidatos que estudaram com afinco superaram o exame.', a oração introduzida por 'que' classifica-se como:",
                null,
                "Subordinada adjectiva explicativa",
                "Subordinada adjectiva restritiva",
                "Subordinada substantiva subjectiva",
                "Subordinada adverbial causal",
                "B",
                "A oração 'que estudaram com afinco' restringe o sentido de 'candidatos' (não foram todos, apenas os que estudaram com afinco) e não está isolada por vírgulas. Trata-se portanto de uma subordinada adjectiva restritiva. Resposta B.",
                "https://examemaster.mz/video/port_sintaxe.mp4",
                "Sintaxe da Oração Composta", "Média"));

        // Questão 7 - Português UP
        questions.add(new Question(
                "q_port_02", "Universidade Pedagógica de Maputo", "Ensino de Português", "Português", 2023,
                "Identifique a figura de estilo presente na passagem: 'Maputo acordou triste sob o manto de cinzas das lembranças.'",
                null,
                "Metáfora e Personificação",
                "Hipérbole e Antítese",
                "Eufemismo e Pleonasmo",
                "Ironia e Paradoxo",
                "A",
                "Atribuir o acto de 'acordar triste' a uma cidade é personificação (prosopopeia), enquanto 'manto de cinzas das lembranças' é uma comparação implícita (metáfora). Resposta A.",
                "https://examemaster.mz/video/port_figuras.mp4",
                "Figuras de Estilo", "Fácil"));

        // Questão 8 - Física UniZambeze
        questions.add(new Question(
                "q_fis_01", "Universidade Zambeze", "Engenharia Civil", "Física", 2024,
                "Um móvel desloca-se em linha recta com aceleração constante de 2 m/s². Partindo do repouso, que distância percorrerá em 5 segundos?",
                null,
                "10 metros",
                "25 metros",
                "50 metros",
                "100 metros",
                "B",
                "A equação horária da posição no MRUV partindo do repouso (s0 = 0, v0 = 0) é: s = (a * t²) / 2. Substituindo: s = (2 * 5²) / 2 = (2 * 25) / 2 = 25 metros. Resposta B.",
                "https://examemaster.mz/video/fis_cinematica.mp4",
                "Cinemática e MRUV", "Fácil"));

        // Questão 9 - História UJC
        questions.add(new Question(
                "q_hist_01", "Universidade Joaquim Chissano", "Relações Internacionais", "História", 2023,
                "A Frente de Libertação de Moçambique (FRELIMO) foi fundada no dia 25 de Junho de 1962 na cidade de:",
                null,
                "Lourenço Marques (Maputo)",
                "Dar-es-Salaam (Tanzânia)",
                "Lusaka (Zâmbia)",
                "Cairo (Egipto)",
                "B",
                "A FRELIMO foi fundada em Dar-es-Salaam, na Tanzânia, em 25 de Junho de 1962, a partir da fusão de três movimentos nacionalistas: UDENAMO, MANU e UNAMI, sob a liderança do Dr. Eduardo Chivambo Mondlane. Resposta B.",
                "https://examemaster.mz/video/hist_libertacao.mp4",
                "Luta de Libertação Nacional", "Fácil"));

        // Questão 10 - Química UEM
        questions.add(new Question(
                "q_qui_01", "Universidade Eduardo Mondlane", "Medicina Geral", "Química", 2024,
                "Uma solução aquosa que apresenta pH = 3 classifica-se quimicamente como:",
                null,
                "Neutra",
                "Ácida",
                "Básica ou alcalina",
                "Salina pura",
                "B",
                "Na escala de pH a 25°C, valores menores que 7 indicam soluções ácidas, 7 indica meio neutro e superiores a 7 indicam soluções básicas. Portanto, pH = 3 é uma solução marcadamente ácida. Resposta B.",
                "https://examemaster.mz/video/qui_acido_base.mp4",
                "Equilíbrio Iónico e pH", "Fácil"));
    }

    private void initManuals() {
        manuals.add(new StudyManual(
                "man_01", "uem", "Universidade Eduardo Mondlane",
                "c_inf_uem", "Engenharia Informática",
                "subj_matematica", "Matemática",
                "Funções e Logaritmos",
                "Manual Completo de Funções e Logaritmos para Admissão à UEM",
                "Guia intensivo com definições, propriedades fundamentais, equações e inequações exponenciais e logarítmicas.",
                "CAPÍTULO 1: DEFINIÇÃO DE LOGARITMO\n\nO logaritmo de um número b na base a é o expoente x ao qual a base deve ser elevada para produzir b. Ou seja: log_a(b) = x se e só se a^x = b, com b > 0, a > 0 e a != 1.\n\nPROPRIEDADES OPERATÓRIAS:\n1. log_a(b * c) = log_a(b) + log_a(c)\n2. log_a(b / c) = log_a(b) - log_a(c)\n3. log_a(b^k) = k * log_a(b)\n4. Mudança de Base: log_a(b) = log_c(b) / log_c(a)\n\nESTRATÉGIA PARA O EXAME DA UEM:\nA UEM costuma cobrar questões com condições de existência de raízes e logaritmandos compostos. Verifique sempre o domínio antes de simplificar!",
                "https://examemaster.mz/manuals/uem_mat_logaritmos.pdf",
                Arrays.asList("1. Definições e Condição de Existência", "2. Propriedades Operatórias", "3. Equações e Inequações Logarítmicas", "4. Resolução de Exames 2018-2024"),
                15, true));

        manuals.add(new StudyManual(
                "man_02", "uem", "Universidade Eduardo Mondlane",
                "c_med_uem", "Medicina Geral",
                "subj_biologia", "Biologia",
                "Citologia e Organelos Celulares",
                "Resumo Estruturado de Citologia Celular e Bioenergética",
                "Conteúdo esquematizado com tabelas comparativas entre células procarióticas e eucarióticas, membrana celular e metabolismo.",
                "CAPÍTULO 1: MEMBRANA PLASMÁTICA E TRANSPORTE\n\nA membrana celular segue o modelo do mosaico fluido (Singer e Nicolson, 1972). É composta por uma bicamada fosfolipídica com proteínas integrais e periféricas.\n\nTIPOS DE TRANSPORTE:\n- Passivo (sem gasto de ATP): Difusão simples, difusão facilitada e osmose.\n- Activo (com consumo de ATP): Bomba de Sódio e Potássio (Na+/K+), endocitose e exocitose.\n\nORGANELOS DE DESTAQUE:\n- Mitocôndria: Síntese de ATP via respiração aeróbia.\n- Retículo Endoplasmático Rugoso: Síntese de proteínas destinadas ao exterior celular.\n- Complexo de Golgi: Secreção, maturação e empacotamento celular.",
                "https://examemaster.mz/manuals/uem_bio_citologia.pdf",
                Arrays.asList("1. Modelo Estrutural da Célula", "2. Transportes através da Membrana", "3. Organelos e Suas Funções", "4. Exercícios Típicos de Admissão"),
                18, true));

        manuals.add(new StudyManual(
                "man_03", "up_maputo", "Universidade Pedagógica de Maputo",
                "c_port_up", "Ensino de Português",
                "subj_portugues", "Português",
                "Sintaxe da Língua Portuguesa",
                "Manual de Análise Sintáctica e Coordenação/Subordinação de Orações",
                "Ideal para exames da UP e UEM, abordando regência verbal, concordância e orações subordinadas.",
                "CAPÍTULO 1: ORAÇÕES SUBORDINADAS\n\nAs orações subordinadas dependem sintacticamente da oração principal e dividem-se em:\n1. Substantivas: Funcionam como sujeito, objecto directo, objecto indirecto, etc.\n2. Adjectivas: Restritivas (sem vírgula) e Explicativas (entre vírgulas).\n3. Adverbiais: Causais, temporais, condicionais, finais, concessivas, etc.",
                "https://examemaster.mz/manuals/up_port_sintaxe.pdf",
                Arrays.asList("1. Frase, Oração e Período", "2. Orações Coordenadas", "3. Orações Subordinadas", "4. Casos Especiais de Concordância"),
                20, true));
    }

    private void initVideoLessons() {
        videoLessons.add(new VideoLesson(
                "vid_01", "Resolução Passo a Passo: Exame UEM Matemática 2024",
                "Matemática", "Funções e Logaritmos",
                "Resolução comentada das primeiras 10 questões do exame de admissão da UEM, com dicas de gestão de tempo.",
                "https://examemaster.mz/videos/uem_mat_2024_p1.mp4", "28:40",
                "Prof. António Macamo", "Universidade Eduardo Mondlane"));

        videoLessons.add(new VideoLesson(
                "vid_02", "Mitocôndria, Respiração e Metabolismo Energético",
                "Biologia", "Citologia",
                "Aula visual focada nas questões mais frequentes de Biologia para os cursos de Medicina e Enfermagem.",
                "https://examemaster.mz/videos/bio_respiracao.mp4", "22:15",
                "Dra. Fátima Tembe", "UEM e UCM"));

        videoLessons.add(new VideoLesson(
                "vid_03", "Como Dominar Orações Subordinadas nos Exames da UP",
                "Português", "Sintaxe",
                "Análise detalhada de pegadinhas de gramática nos exames da Universidade Pedagógica de Maputo.",
                "https://examemaster.mz/videos/up_port_sintaxe.mp4", "19:50",
                "Prof. Carlos Manhique", "Universidade Pedagógica de Maputo"));

        videoLessons.add(new VideoLesson(
                "vid_04", "Cinemática e Movimento Uniformemente Variado",
                "Física", "Mecânica",
                "Fórmulas essenciais, análise de gráficos de velocidade-tempo e exercícios resolvidos das engenharias.",
                "https://examemaster.mz/videos/fis_cinematica.mp4", "25:30",
                "Eng. Hilário Sitoe", "UniZambeze e UEM"));
    }

    // --- IDataRepository Implementations ---

    @Override
    public List<University> getUniversities() {
        return new ArrayList<>(universities);
    }

    @Override
    public University getUniversityById(String id) {
        for (University u : universities) {
            if (u.getId().equalsIgnoreCase(id)) return u;
        }
        return null;
    }

    @Override
    public List<Course> getCourses() {
        return new ArrayList<>(courses);
    }

    @Override
    public List<Course> getCoursesByUniversity(String universityId) {
        List<Course> result = new ArrayList<>();
        for (Course c : courses) {
            if (c.getUniversityId().equalsIgnoreCase(universityId)) {
                result.add(c);
            }
        }
        return result;
    }

    @Override
    public Course getCourseById(String courseId) {
        for (Course c : courses) {
            if (c.getId().equalsIgnoreCase(courseId)) return c;
        }
        return null;
    }

    @Override
    public List<Subject> getSubjects() {
        return new ArrayList<>(subjects);
    }

    @Override
    public Subject getSubjectById(String subjectId) {
        for (Subject s : subjects) {
            if (s.getId().equalsIgnoreCase(subjectId)) return s;
        }
        return null;
    }

    @Override
    public List<Exam> getExams() {
        return new ArrayList<>(exams);
    }

    @Override
    public List<Exam> getExamsBySubject(String subjectId) {
        List<Exam> filtered = new ArrayList<>();
        for (Exam e : exams) {
            if (subjectId == null || subjectId.isEmpty() || e.getSubjectId().equalsIgnoreCase(subjectId)) {
                filtered.add(e);
            }
        }
        return filtered.isEmpty() ? new ArrayList<>(exams) : filtered;
    }

    @Override
    public List<Exam> getExams(String universityId, String subjectId) {
        List<Exam> filtered = new ArrayList<>();
        for (Exam e : exams) {
            boolean matchesUni = (universityId == null || universityId.isEmpty() || e.getUniversityId().equalsIgnoreCase(universityId));
            boolean matchesSubj = (subjectId == null || subjectId.isEmpty() || e.getSubjectId().equalsIgnoreCase(subjectId));
            if (matchesUni && matchesSubj) {
                filtered.add(e);
            }
        }
        return filtered.isEmpty() ? new ArrayList<>(exams) : filtered;
    }

    @Override
    public Exam getExamById(String examId) {
        for (Exam e : exams) {
            if (e.getId().equalsIgnoreCase(examId)) return e;
        }
        return null;
    }

    @Override
    public List<Question> getQuestions() {
        return new ArrayList<>(questions);
    }

    @Override
    public List<Question> getQuestionsByExam(String examId) {
        return getQuestionsForExam(examId);
    }

    @Override
    public List<Question> getQuestionsForExam(String examId) {
        // Se houver filtro específico de exame, devolve todas as questões do demo
        return new ArrayList<>(questions);
    }

    @Override
    public List<Question> getQuestionsForSubject(String subjectId, int limit) {
        List<Question> res = new ArrayList<>();
        for (Question q : questions) {
            if (subjectId == null || subjectId.isEmpty() || q.getDisciplina().toLowerCase().contains(subjectId.replace("subj_", "").toLowerCase())) {
                res.add(q);
                if (limit > 0 && res.size() >= limit) break;
            }
        }
        return res.isEmpty() ? new ArrayList<>(questions) : res;
    }

    @Override
    public void saveExamResult(ExamResult result) {
        List<ExamResult> history = getExamResultsHistory();
        history.add(0, result);
        String json = gson.toJson(history);
        preferences.edit().putString(KEY_RESULTS_HISTORY, json).apply();

        // Actualizar o perfil do utilizador com o novo resultado
        UserProfile profile = getUserProfile();
        profile.setExamsCompleted(profile.getExamsCompleted() + 1);
        profile.setQuestionsAnswered(profile.getQuestionsAnswered() + result.getTotalQuestions());
        profile.setCorrectAnswers(profile.getCorrectAnswers() + result.getCorrectCount());
        profile.setLastExamResultFormatted(Math.round(result.getPercentage()) + "% (" + result.getUniversityName() + " " + result.getSubjectName() + ")");
        updateUserProfile(profile);
    }

    @Override
    public List<ExamResult> getExamResultsHistory() {
        String json = preferences.getString(KEY_RESULTS_HISTORY, null);
        if (json == null) {
            // Histórico demo inicial caso ainda não haja dados gravados
            List<ExamResult> initialDemo = new ArrayList<>();
            List<TopicPerformance> topics = new ArrayList<>();
            topics.add(new TopicPerformance("Funções e Logaritmos", "Matemática", 2, 3, "Reveja as propriedades operatórias de logaritmos."));
            topics.add(new TopicPerformance("Sintaxe da Oração Composta", "Português", 1, 2, "Atenção às orações subordinadas adjectivas restritivas."));

            initialDemo.add(new ExamResult(
                    "res_demo_1", "ex_uem_mat_2024", "UEM - Exame de Matemática 2024 (Demo)",
                    "UEM", "Matemática", 37, 50, 74.0, 37, 10, 3, 3120, 62.4,
                    System.currentTimeMillis() - 86400000L, topics));
            return initialDemo;
        }
        Type type = new TypeToken<ArrayList<ExamResult>>() {}.getType();
        return gson.fromJson(json, type);
    }

    @Override
    public ExamResult getLastExamResult() {
        List<ExamResult> list = getExamResultsHistory();
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public List<StudyManual> getStudyManuals() {
        return new ArrayList<>(manuals);
    }

    @Override
    public List<StudyManual> getManuals(String universityId, String courseId, String subjectId) {
        List<StudyManual> res = new ArrayList<>();
        for (StudyManual m : manuals) {
            boolean matchUni = (universityId == null || universityId.isEmpty() || m.getUniversityId().equalsIgnoreCase(universityId));
            boolean matchSubj = (subjectId == null || subjectId.isEmpty() || m.getSubjectId().equalsIgnoreCase(subjectId));
            if (matchUni && matchSubj) {
                res.add(m);
            }
        }
        return res.isEmpty() ? new ArrayList<>(manuals) : res;
    }

    @Override
    public StudyManual getManualById(String manualId) {
        for (StudyManual m : manuals) {
            if (m.getId().equalsIgnoreCase(manualId)) return m;
        }
        return null;
    }

    @Override
    public List<VideoLesson> getVideoLessons() {
        return new ArrayList<>(videoLessons);
    }

    @Override
    public List<VideoLesson> getVideoLessons(String subjectId) {
        List<VideoLesson> res = new ArrayList<>();
        for (VideoLesson v : videoLessons) {
            if (subjectId == null || subjectId.isEmpty() || v.getSubject().equalsIgnoreCase(subjectId)) {
                res.add(v);
            }
        }
        return res.isEmpty() ? new ArrayList<>(videoLessons) : res;
    }

    @Override
    public VideoLesson getVideoLessonById(String videoId) {
        for (VideoLesson v : videoLessons) {
            if (v.getId().equalsIgnoreCase(videoId)) return v;
        }
        return null;
    }

    @Override
    public UserProfile getUserProfile() {
        String json = preferences.getString(KEY_USER_PROFILE, null);
        if (json == null) {
            // Perfil inicial padrão pré-configurado
            UserProfile defaultProfile = new UserProfile(
                    "usr_default", "Estudante Moçambicano", "estudante@examemaster.mz",
                    "uem", "Universidade Eduardo Mondlane",
                    "c_inf_uem", "Engenharia Informática",
                    2025, 45, 33, 4, "74% (UEM Matemática)", 5);
            return defaultProfile;
        }
        return gson.fromJson(json, UserProfile.class);
    }

    @Override
    public void updateUserProfile(UserProfile profile) {
        String json = gson.toJson(profile);
        preferences.edit().putString(KEY_USER_PROFILE, json).apply();
    }
}
