package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.Exam;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.models.Question;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.services.PerformanceTracker;
import mz.co.examemaster.utils.Constants;

/**
 * Tela de Resolução Interactiva de Questões de Exame.
 * Implementa feedback imediato pedagógico:
 * "✓ Resposta correcta" ou "✗ Resposta incorrecta" com explicação em texto e vídeo.
 */
public class QuizActivity extends AppCompatActivity {

    private DemoDataRepository dataRepo;
    private PerformanceTracker tracker;

    private List<Question> questions;
    private int currentIndex = 0;
    private String selectedOption = null;
    private boolean isSubmitted = false;
    private long examStartTimeMs;
    private Exam currentExam;

    // Views
    private MaterialToolbar toolbar;
    private TextView tvQuestionIndicator;
    private TextView tvQuestionTopicBadge;
    private ProgressBar pbQuizProgress;

    private TextView tvQuestionMeta;
    private TextView tvQuestionStatement;

    private LinearLayout optionA, optionB, optionC, optionD;
    private TextView tvOptionTextA, tvOptionTextB, tvOptionTextC, tvOptionTextD;
    private TextView tvOptionBadgeA, tvOptionBadgeB, tvOptionBadgeC, tvOptionBadgeD;

    private LinearLayout layoutFeedbackContainer;
    private LinearLayout layoutFeedbackCorrect;
    private LinearLayout layoutFeedbackIncorrect;
    private TextView tvCorrectAnswerReveal;
    private Button btnViewTextExplanation;
    private Button btnViewVideoExplanation;

    private Button btnConfirmOrNext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz);

        dataRepo = DemoDataRepository.getInstance(this);
        tracker = new PerformanceTracker(this);
        examStartTimeMs = System.currentTimeMillis();

        String examId = getIntent().getStringExtra(Constants.EXTRA_EXAM_ID);
        currentExam = dataRepo.getExamById(examId);

        if (currentExam != null) {
            questions = dataRepo.getQuestionsByExam(currentExam.getId());
        } else {
            questions = dataRepo.getQuestions();
        }

        if (questions == null || questions.isEmpty()) {
            Toast.makeText(this, "Nenhuma questão disponível para este exame.", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        initViews();
        setupListeners();
        displayCurrentQuestion();
    }

    private void initViews() {
        toolbar = findViewById(R.id.toolbarQuiz);
        if (currentExam != null) {
            toolbar.setTitle(currentExam.getTitle());
        }
        toolbar.setNavigationOnClickListener(v -> confirmExit());

        tvQuestionIndicator = findViewById(R.id.tvQuestionIndicator);
        tvQuestionTopicBadge = findViewById(R.id.tvQuestionTopicBadge);
        pbQuizProgress = findViewById(R.id.pbQuizProgress);

        tvQuestionMeta = findViewById(R.id.tvQuestionMeta);
        tvQuestionStatement = findViewById(R.id.tvQuestionStatement);

        optionA = findViewById(R.id.optionA);
        optionB = findViewById(R.id.optionB);
        optionC = findViewById(R.id.optionC);
        optionD = findViewById(R.id.optionD);

        tvOptionTextA = findViewById(R.id.tvOptionTextA);
        tvOptionTextB = findViewById(R.id.tvOptionTextB);
        tvOptionTextC = findViewById(R.id.tvOptionTextC);
        tvOptionTextD = findViewById(R.id.tvOptionTextD);

        tvOptionBadgeA = findViewById(R.id.tvOptionBadgeA);
        tvOptionBadgeB = findViewById(R.id.tvOptionBadgeB);
        tvOptionBadgeC = findViewById(R.id.tvOptionBadgeC);
        tvOptionBadgeD = findViewById(R.id.tvOptionBadgeD);

        layoutFeedbackContainer = findViewById(R.id.layoutFeedbackContainer);
        layoutFeedbackCorrect = findViewById(R.id.layoutFeedbackCorrect);
        layoutFeedbackIncorrect = findViewById(R.id.layoutFeedbackIncorrect);
        tvCorrectAnswerReveal = findViewById(R.id.tvCorrectAnswerReveal);
        btnViewTextExplanation = findViewById(R.id.btnViewTextExplanation);
        btnViewVideoExplanation = findViewById(R.id.btnViewVideoExplanation);

        btnConfirmOrNext = findViewById(R.id.btnConfirmOrNext);

        pbQuizProgress.setMax(questions.size());
    }

    private void setupListeners() {
        optionA.setOnClickListener(v -> selectOption("A"));
        optionB.setOnClickListener(v -> selectOption("B"));
        optionC.setOnClickListener(v -> selectOption("C"));
        optionD.setOnClickListener(v -> selectOption("D"));

        btnConfirmOrNext.setOnClickListener(v -> {
            if (!isSubmitted) {
                submitAnswer();
            } else {
                goToNextQuestion();
            }
        });

        btnViewTextExplanation.setOnClickListener(v -> showTextExplanationDialog());
        btnViewVideoExplanation.setOnClickListener(v -> openVideoExplanation());
    }

    private void displayCurrentQuestion() {
        if (currentIndex >= questions.size()) {
            finishExam();
            return;
        }

        Question q = questions.get(currentIndex);
        selectedOption = null;
        isSubmitted = false;

        // Reset UI
        tvQuestionIndicator.setText("Questão " + (currentIndex + 1) + " de " + questions.size());
        tvQuestionTopicBadge.setText(q.getTopic());
        pbQuizProgress.setProgress(currentIndex + 1);

        tvQuestionMeta.setText(q.getUniversity() + " • " + q.getSubject() + " • " + q.getYear() + " (Demo)");
        tvQuestionStatement.setText(q.getStatement());

        tvOptionTextA.setText(q.getOptionA());
        tvOptionTextB.setText(q.getOptionB());
        tvOptionTextC.setText(q.getOptionC());
        tvOptionTextD.setText(q.getOptionD());

        resetOptionBackgrounds();

        layoutFeedbackContainer.setVisibility(View.GONE);
        layoutFeedbackCorrect.setVisibility(View.GONE);
        layoutFeedbackIncorrect.setVisibility(View.GONE);

        btnConfirmOrNext.setText("Confirmar resposta");
        btnConfirmOrNext.setEnabled(false);
    }

    private void selectOption(String option) {
        if (isSubmitted) return;

        selectedOption = option;
        resetOptionBackgrounds();

        if ("A".equals(option)) optionA.setBackgroundResource(R.drawable.bg_option_selected);
        if ("B".equals(option)) optionB.setBackgroundResource(R.drawable.bg_option_selected);
        if ("C".equals(option)) optionC.setBackgroundResource(R.drawable.bg_option_selected);
        if ("D".equals(option)) optionD.setBackgroundResource(R.drawable.bg_option_selected);

        btnConfirmOrNext.setEnabled(true);
    }

    private void resetOptionBackgrounds() {
        optionA.setBackgroundResource(R.drawable.bg_option_default);
        optionB.setBackgroundResource(R.drawable.bg_option_default);
        optionC.setBackgroundResource(R.drawable.bg_option_default);
        optionD.setBackgroundResource(R.drawable.bg_option_default);
    }

    private void submitAnswer() {
        if (selectedOption == null) return;

        isSubmitted = true;
        Question q = questions.get(currentIndex);
        boolean isCorrect = selectedOption.equalsIgnoreCase(q.getCorrectOption());

        tracker.recordAnswer(q, selectedOption);

        layoutFeedbackContainer.setVisibility(View.VISIBLE);

        if (isCorrect) {
            // "✓ Resposta correcta"
            layoutFeedbackCorrect.setVisibility(View.VISIBLE);
            layoutFeedbackIncorrect.setVisibility(View.GONE);
            highlightOption(selectedOption, true);
        } else {
            // "✗ Resposta incorrecta"
            layoutFeedbackCorrect.setVisibility(View.GONE);
            layoutFeedbackIncorrect.setVisibility(View.VISIBLE);
            highlightOption(selectedOption, false);
            highlightOption(q.getCorrectOption(), true);

            tvCorrectAnswerReveal.setText("Resposta correcta: Alternativa " + q.getCorrectOption().toUpperCase());
        }

        if (currentIndex == questions.size() - 1) {
            btnConfirmOrNext.setText("Finalizar e Ver Resultados");
        } else {
            btnConfirmOrNext.setText("Próxima questão");
        }
        btnConfirmOrNext.setEnabled(true);
    }

    private void highlightOption(String option, boolean correct) {
        int bg = correct ? R.drawable.bg_option_correct : R.drawable.bg_option_incorrect;
        if ("A".equalsIgnoreCase(option)) optionA.setBackgroundResource(bg);
        if ("B".equalsIgnoreCase(option)) optionB.setBackgroundResource(bg);
        if ("C".equalsIgnoreCase(option)) optionC.setBackgroundResource(bg);
        if ("D".equalsIgnoreCase(option)) optionD.setBackgroundResource(bg);
    }

    private void goToNextQuestion() {
        currentIndex++;
        displayCurrentQuestion();
    }

    private void showTextExplanationDialog() {
        Question q = questions.get(currentIndex);
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_explanation, null);

        TextView tvTopic = dialogView.findViewById(R.id.tvDialogTopic);
        TextView tvContent = dialogView.findViewById(R.id.tvDialogExplanationContent);
        Button btnClose = dialogView.findViewById(R.id.btnDialogClose);

        tvTopic.setText("Tópico: " + q.getTopic());
        tvContent.setText(q.getTextExplanation());

        AlertDialog dialog = new AlertDialog.Builder(this)
                .setView(dialogView)
                .create();

        btnClose.setOnClickListener(v -> dialog.dismiss());
        dialog.show();
    }

    private void openVideoExplanation() {
        Question q = questions.get(currentIndex);
        new AlertDialog.Builder(this)
                .setTitle("Videoaula Explicativa (Demo)")
                .setMessage("Tópico: " + q.getTopic() + "\n\n" +
                        "Vídeo preparado para Android Media3 / ExoPlayer:\n" +
                        q.getVideoExplanationUrl() + "\n\n" +
                        "No modo offline, o vídeo de demonstração exibe resolução passo a passo em alta definição.")
                .setPositiveButton("Assistir Aula Completa", (dialog, which) -> {
                    dialog.dismiss();
                    Intent intent = new Intent(QuizActivity.this, VideoLessonsActivity.class);
                    startActivity(intent);
                })
                .setNegativeButton("Fechar", null)
                .show();
    }

    private void finishExam() {
        int durationSeconds = (int) ((System.currentTimeMillis() - examStartTimeMs) / 1000);
        String examId = currentExam != null ? currentExam.getId() : "demo_general";
        String examTitle = currentExam != null ? currentExam.getTitle() : "Simulado Geral de Admissão";
        String uniName = currentExam != null ? currentExam.getUniversityName() : "UEM";
        String subName = currentExam != null ? currentExam.getSubjectName() : "Matemática";

        ExamResult result = tracker.generateResult(examId, examTitle, uniName, subName, durationSeconds);
        tracker.saveExamResult(result);

        Intent intent = new Intent(QuizActivity.this, ExamResultActivity.class);
        intent.putExtra(Constants.EXTRA_RESULT_ID, result.getId());
        startActivity(intent);
        finish();
    }

    private void confirmExit() {
        new AlertDialog.Builder(this)
                .setTitle("Sair do Simulado?")
                .setMessage("O seu progresso actual será perdido se sair agora.")
                .setPositiveButton("Sim, Sair", (dialog, which) -> finish())
                .setNegativeButton("Continuar a Responder", null)
                .show();
    }

    @Override
    public void onBackPressed() {
        confirmExit();
    }
}
