package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import mz.co.examemaster.R;
import mz.co.examemaster.models.Exam;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.models.Question;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.services.ExamTimerService;
import mz.co.examemaster.services.PerformanceTracker;
import mz.co.examemaster.utils.Constants;
import mz.co.examemaster.utils.FormatUtils;

/**
 * Tela do Simulado Cronometrado.
 * Gestão de contagem regressiva com finalização automática e cálculo métrico integral.
 */
public class TimedQuizActivity extends AppCompatActivity implements ExamTimerService.TimerListener {

    private DemoDataRepository dataRepo;
    private PerformanceTracker tracker;
    private ExamTimerService timerService;

    private List<Question> questions;
    private int currentIndex = 0;
    private Exam currentExam;
    private final Map<Integer, String> userAnswers = new HashMap<>();

    private TextView tvTimedExamTitle;
    private TextView tvTimedQuestionCounter;
    private TextView tvTimerCountdown;
    private ProgressBar pbTimedProgress;

    private TextView tvTimedQuestionTopic;
    private TextView tvTimedStatement;

    private LinearLayout timedOptionA, timedOptionB, timedOptionC, timedOptionD;
    private TextView tvTimedOptionTextA, tvTimedOptionTextB, tvTimedOptionTextC, tvTimedOptionTextD;

    private Button btnTimedPrevious;
    private Button btnTimedNext;
    private Button btnTimedFinish;

    private boolean isFinished = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_timed_quiz);

        dataRepo = DemoDataRepository.getInstance(this);
        tracker = new PerformanceTracker(this);

        String examId = getIntent().getStringExtra(Constants.EXTRA_EXAM_ID);
        currentExam = dataRepo.getExamById(examId);

        if (currentExam != null) {
            questions = dataRepo.getQuestionsByExam(currentExam.getId());
        } else {
            questions = dataRepo.getQuestions();
        }

        if (questions == null || questions.isEmpty()) {
            Toast.makeText(this, "Nenhuma questão disponível.", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        initViews();
        setupListeners();
        displayQuestion(0);

        int durationSeconds = (currentExam != null ? currentExam.getDurationMinutes() : 60) * 60;
        timerService = new ExamTimerService(durationSeconds, this);
        timerService.start();
    }

    private void initViews() {
        tvTimedExamTitle = findViewById(R.id.tvTimedExamTitle);
        tvTimedQuestionCounter = findViewById(R.id.tvTimedQuestionCounter);
        tvTimerCountdown = findViewById(R.id.tvTimerCountdown);
        pbTimedProgress = findViewById(R.id.pbTimedProgress);

        if (currentExam != null) {
            tvTimedExamTitle.setText(currentExam.getTitle());
        }

        tvTimedQuestionTopic = findViewById(R.id.tvTimedQuestionTopic);
        tvTimedStatement = findViewById(R.id.tvTimedStatement);

        timedOptionA = findViewById(R.id.timedOptionA);
        timedOptionB = findViewById(R.id.timedOptionB);
        timedOptionC = findViewById(R.id.timedOptionC);
        timedOptionD = findViewById(R.id.timedOptionD);

        tvTimedOptionTextA = findViewById(R.id.tvTimedOptionTextA);
        tvTimedOptionTextB = findViewById(R.id.tvTimedOptionTextB);
        tvTimedOptionTextC = findViewById(R.id.tvTimedOptionTextC);
        tvTimedOptionTextD = findViewById(R.id.tvTimedOptionTextD);

        btnTimedPrevious = findViewById(R.id.btnTimedPrevious);
        btnTimedNext = findViewById(R.id.btnTimedNext);
        btnTimedFinish = findViewById(R.id.btnTimedFinish);

        pbTimedProgress.setMax(questions.size());
    }

    private void setupListeners() {
        timedOptionA.setOnClickListener(v -> selectOption("A"));
        timedOptionB.setOnClickListener(v -> selectOption("B"));
        timedOptionC.setOnClickListener(v -> selectOption("C"));
        timedOptionD.setOnClickListener(v -> selectOption("D"));

        btnTimedPrevious.setOnClickListener(v -> {
            if (currentIndex > 0) {
                displayQuestion(currentIndex - 1);
            }
        });

        btnTimedNext.setOnClickListener(v -> {
            if (currentIndex < questions.size() - 1) {
                displayQuestion(currentIndex + 1);
            }
        });

        btnTimedFinish.setOnClickListener(v -> confirmFinishExam());
    }

    private void displayQuestion(int index) {
        currentIndex = index;
        Question q = questions.get(currentIndex);

        tvTimedQuestionCounter.setText("Questão " + (currentIndex + 1) + " de " + questions.size());
        tvTimedQuestionTopic.setText("Tópico: " + q.getTopic());
        pbTimedProgress.setProgress(currentIndex + 1);

        tvTimedStatement.setText(q.getStatement());
        tvTimedOptionTextA.setText(q.getOptionA());
        tvTimedOptionTextB.setText(q.getOptionB());
        tvTimedOptionTextC.setText(q.getOptionC());
        tvTimedOptionTextD.setText(q.getOptionD());

        resetOptionsUI();

        String selected = userAnswers.get(currentIndex);
        if (selected != null) {
            highlightSelected(selected);
        }

        btnTimedPrevious.setEnabled(currentIndex > 0);

        if (currentIndex == questions.size() - 1) {
            btnTimedNext.setVisibility(View.GONE);
            btnTimedFinish.setVisibility(View.VISIBLE);
        } else {
            btnTimedNext.setVisibility(View.VISIBLE);
            btnTimedFinish.setVisibility(View.GONE);
        }
    }

    private void selectOption(String option) {
        userAnswers.put(currentIndex, option);
        resetOptionsUI();
        highlightSelected(option);
    }

    private void resetOptionsUI() {
        timedOptionA.setBackgroundResource(R.drawable.bg_option_default);
        timedOptionB.setBackgroundResource(R.drawable.bg_option_default);
        timedOptionC.setBackgroundResource(R.drawable.bg_option_default);
        timedOptionD.setBackgroundResource(R.drawable.bg_option_default);
    }

    private void highlightSelected(String option) {
        if ("A".equals(option)) timedOptionA.setBackgroundResource(R.drawable.bg_option_selected);
        if ("B".equals(option)) timedOptionB.setBackgroundResource(R.drawable.bg_option_selected);
        if ("C".equals(option)) timedOptionC.setBackgroundResource(R.drawable.bg_option_selected);
        if ("D".equals(option)) timedOptionD.setBackgroundResource(R.drawable.bg_option_selected);
    }

    @Override
    public void onTick(long millisUntilFinished, int elapsedSeconds) {
        int remainingSeconds = (int) (millisUntilFinished / 1000);
        tvTimerCountdown.setText(FormatUtils.formatSecondsToTimer(remainingSeconds));
    }

    @Override
    public void onFinish() {
        if (!isFinished) {
            Toast.makeText(this, "Tempo esgotado! A calcular resultados...", Toast.LENGTH_LONG).show();
            calculateAndSubmitResults();
        }
    }

    private void confirmFinishExam() {
        int answeredCount = userAnswers.size();
        int total = questions.size();
        int unanswered = total - answeredCount;

        String msg = "Respondeu a " + answeredCount + " de " + total + " questões.";
        if (unanswered > 0) {
            msg += "\nAinda tem " + unanswered + " questões em branco!";
        }

        new AlertDialog.Builder(this)
                .setTitle("Terminar Simulado?")
                .setMessage(msg)
                .setPositiveButton("Finalizar Agora", (dialog, which) -> calculateAndSubmitResults())
                .setNegativeButton("Continuar a Responder", null)
                .show();
    }

    private void calculateAndSubmitResults() {
        if (isFinished) return;
        isFinished = true;

        if (timerService != null) {
            timerService.stop();
        }

        int elapsedSeconds = timerService != null ? timerService.getElapsedSeconds() : 60;

        for (int i = 0; i < questions.size(); i++) {
            Question q = questions.get(i);
            String selected = userAnswers.get(i);
            tracker.recordAnswer(q, selected);
        }

        String examId = currentExam != null ? currentExam.getId() : "demo_timed";
        String examTitle = currentExam != null ? currentExam.getTitle() : "Simulado Cronometrado";
        String uniName = currentExam != null ? currentExam.getUniversityName() : "UEM";
        String subName = currentExam != null ? currentExam.getSubjectName() : "Matemática";

        ExamResult result = tracker.generateResult(examId, examTitle, uniName, subName, elapsedSeconds);
        tracker.saveExamResult(result);

        Intent intent = new Intent(TimedQuizActivity.this, ExamResultActivity.class);
        intent.putExtra(Constants.EXTRA_RESULT_ID, result.getId());
        startActivity(intent);
        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (timerService != null) {
            timerService.stop();
        }
    }

    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this)
                .setTitle("Abandonar Simulado Cronometrado?")
                .setMessage("Se sair agora, o teste será cancelado.")
                .setPositiveButton("Sair", (dialog, which) -> {
                    if (timerService != null) timerService.stop();
                    finish();
                })
                .setNegativeButton("Continuar", null)
                .show();
    }
}
