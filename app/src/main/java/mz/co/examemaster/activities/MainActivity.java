package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import mz.co.examemaster.R;
import mz.co.examemaster.models.Exam;
import mz.co.examemaster.models.UserProfile;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.repositories.LocalAuthRepository;
import mz.co.examemaster.utils.Constants;

/**
 * 4. Dashboard Principal (MainActivity)
 * Central de preparação para exames de admissão com navegação intuitiva.
 */
public class MainActivity extends AppCompatActivity {

    private LocalAuthRepository authRepo;
    private DemoDataRepository dataRepo;

    private TextView tvGreetingUser;
    private TextView tvUserGoalSubtitle;
    private TextView tvStatQuestions;
    private TextView tvStatAccuracy;
    private TextView tvStatStreak;

    private CardView cardActionExams;
    private CardView cardActionTimed;
    private CardView cardActionManuals;
    private CardView cardActionVideos;
    private CardView cardActionUniversities;
    private CardView cardActionPlan;
    private View cardProfileWidget;

    private Button btnQuickStartExam;
    private Button btnQuickStartTimed;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        authRepo = LocalAuthRepository.getInstance(this);
        dataRepo = DemoDataRepository.getInstance(this);

        initViews();
        setupListeners();
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadUserData();
    }

    private void initViews() {
        tvGreetingUser = findViewById(R.id.tvGreetingUser);
        tvUserGoalSubtitle = findViewById(R.id.tvUserGoalSubtitle);
        tvStatQuestions = findViewById(R.id.tvStatQuestions);
        tvStatAccuracy = findViewById(R.id.tvStatAccuracy);
        tvStatStreak = findViewById(R.id.tvStatStreak);

        cardActionExams = findViewById(R.id.cardActionExams);
        cardActionTimed = findViewById(R.id.cardActionTimed);
        cardActionManuals = findViewById(R.id.cardActionManuals);
        cardActionVideos = findViewById(R.id.cardActionVideos);
        cardActionUniversities = findViewById(R.id.cardActionUniversities);
        cardActionPlan = findViewById(R.id.cardActionPlan);
        cardProfileWidget = findViewById(R.id.cardProfileWidget);

        btnQuickStartExam = findViewById(R.id.btnQuickStartExam);
        btnQuickStartTimed = findViewById(R.id.btnQuickStartTimed);
    }

    private void loadUserData() {
        UserProfile user = authRepo.getCurrentUser();
        if (user != null) {
            tvGreetingUser.setText("Olá, " + user.getName().split(" ")[0] + "!");
            tvUserGoalSubtitle.setText("Meta: " + user.getTargetUniversity() + " • " + user.getTargetCourse());
            tvStatQuestions.setText(String.valueOf(user.getTotalQuestionsAnswered()));
            tvStatAccuracy.setText(Math.round(user.getOverallAccuracy()) + "%");
            tvStatStreak.setText(user.getStudyStreakDays() + " dias");
        }
    }

    private void setupListeners() {
        // Navegação para Exames
        cardActionExams.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, ExamsActivity.class));
        });

        // Modo Simulado Cronometrado
        cardActionTimed.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, ExamsActivity.class));
        });

        // Manuais de Estudo
        cardActionManuals.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, ManualsActivity.class));
        });

        // Videoaulas
        cardActionVideos.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, VideoLessonsActivity.class));
        });

        // Universidades de Moçambique
        cardActionUniversities.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, UniversitiesActivity.class));
        });

        // Plano de Estudos
        cardActionPlan.setOnClickListener(v -> showStudyPlanDialog());

        // Perfil
        cardProfileWidget.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, ProfileActivity.class));
        });

        // Acesso Rápido - Exame em Destaque
        btnQuickStartExam.setOnClickListener(v -> {
            Exam demoExam = dataRepo.getExams().get(0);
            Intent intent = new Intent(MainActivity.this, QuizActivity.class);
            intent.putExtra(Constants.EXTRA_EXAM_ID, demoExam.getId());
            startActivity(intent);
        });

        btnQuickStartTimed.setOnClickListener(v -> {
            Exam demoExam = dataRepo.getExams().get(0);
            Intent intent = new Intent(MainActivity.this, TimedQuizActivity.class);
            intent.putExtra(Constants.EXTRA_EXAM_ID, demoExam.getId());
            startActivity(intent);
        });
    }

    private void showStudyPlanDialog() {
        UserProfile user = authRepo.getCurrentUser();
        String targetUni = user != null ? user.getTargetUniversity() : "Universidade Eduardo Mondlane";
        String targetCourse = user != null ? user.getTargetCourse() : "Engenharia Informática";

        new AlertDialog.Builder(this)
                .setTitle("Plano de Estudo Personalizado")
                .setMessage("Meta: " + targetUni + "\nCurso: " + targetCourse + "\n\n" +
                        "Cronograma Semanal Recomendado:\n" +
                        "• Segunda: Matemática - Funções e Logaritmos (1h30)\n" +
                        "• Quarta: Física - Mecânica e Cinemática (1h30)\n" +
                        "• Sexta: Português - Interpretação e Gramática (1h)\n" +
                        "• Sábado: Simulado Geral Cronometrado (2h)\n" +
                        "• Domingo: Revisão das Áreas de Atenção")
                .setPositiveButton("Seguir Plano", (dialog, which) -> dialog.dismiss())
                .setNeutralButton("Ver Histórico", (dialog, which) -> {
                    startActivity(new Intent(MainActivity.this, PerformanceHistoryActivity.class));
                })
                .show();
    }
}
