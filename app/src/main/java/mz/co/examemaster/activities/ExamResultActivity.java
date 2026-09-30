package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.AttentionAreaAdapter;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.models.TopicPerformance;
import mz.co.examemaster.services.PerformanceTracker;
import mz.co.examemaster.utils.FormatUtils;

/**
 * Tela de Resultados Detalhada com:
 * - Pontuação em Fracção (ex.: 37 / 50) e Percentual (ex.: 74%)
 * - Métricas de correctas, erradas, não respondidas, tempo utilizado e média
 * - Secção "Áreas que precisam de atenção" com tópicos onde o estudante errou.
 */
public class ExamResultActivity extends AppCompatActivity {

    private TextView tvResultExamTitle;
    private TextView tvScoreFraction;
    private TextView tvScorePercentage;
    private TextView tvScoreFeedbackSummary;

    private TextView tvCorrectCount;
    private TextView tvIncorrectCount;
    private TextView tvUnansweredCount;
    private TextView tvTimeSpent;
    private TextView tvAvgTimePerQuestion;

    private RecyclerView rvAttentionAreas;
    private View layoutAttentionSection;
    private Button btnResultBackHome;
    private Button btnResultReviewManuals;

    private PerformanceTracker tracker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exam_result);

        tracker = new PerformanceTracker(this);

        initViews();
        displayResults();
        setupListeners();
    }

    private void initViews() {
        tvResultExamTitle = findViewById(R.id.tvResultExamTitle);
        tvScoreFraction = findViewById(R.id.tvScoreFraction);
        tvScorePercentage = findViewById(R.id.tvScorePercentage);
        tvScoreFeedbackSummary = findViewById(R.id.tvScoreFeedbackSummary);

        tvCorrectCount = findViewById(R.id.tvCorrectCount);
        tvIncorrectCount = findViewById(R.id.tvIncorrectCount);
        tvUnansweredCount = findViewById(R.id.tvUnansweredCount);
        tvTimeSpent = findViewById(R.id.tvTimeSpent);
        tvAvgTimePerQuestion = findViewById(R.id.tvAvgTimePerQuestion);

        rvAttentionAreas = findViewById(R.id.rvAttentionAreas);
        layoutAttentionSection = findViewById(R.id.layoutAttentionSection);
        btnResultBackHome = findViewById(R.id.btnResultBackHome);
        btnResultReviewManuals = findViewById(R.id.btnResultReviewManuals);

        rvAttentionAreas.setLayoutManager(new LinearLayoutManager(this));
    }

    private void displayResults() {
        String resultId = getIntent().getStringExtra(mz.co.examemaster.utils.Constants.EXTRA_RESULT_ID);
        if (resultId == null) {
            resultId = getIntent().getStringExtra("EXTRA_RESULT_ID");
        }
        ExamResult result = null;

        if (resultId != null) {
            result = tracker.getResultById(resultId);
        }
        if (result == null) {
            List<ExamResult> history = tracker.getExamHistory();
            if (!history.isEmpty()) {
                result = history.get(0);
            }
        }

        if (result != null) {
            tvResultExamTitle.setText(result.getExamTitle() + " (" + result.getUniversityName() + ")");

            // Pontuação: ex 37 / 50 e 74%
            tvScoreFraction.setText(result.getCorrectCount() + " / " + result.getTotalQuestions());
            tvScorePercentage.setText(FormatUtils.formatPercentage(result.getPercentage()));

            if (result.getPercentage() >= 70.0) {
                tvScoreFeedbackSummary.setText("Excelente resultado! Com esta média você estaria admitido na UEM!");
            } else if (result.getPercentage() >= 50.0) {
                tvScoreFeedbackSummary.setText("Bom desempenho! Pratique as áreas de atenção para garantir a admissão.");
            } else {
                tvScoreFeedbackSummary.setText("Recomendamos reforçar a teoria e refazer os simulados.");
            }

            // Métricas
            tvCorrectCount.setText(String.valueOf(result.getCorrectCount()));
            tvIncorrectCount.setText(String.valueOf(result.getWrongCount()));
            tvUnansweredCount.setText(String.valueOf(result.getUnansweredCount()));
            tvTimeSpent.setText(FormatUtils.formatDuration(result.getTimeSpentSeconds()));
            tvAvgTimePerQuestion.setText(FormatUtils.formatSeconds(result.getAverageTimePerQuestionSeconds()));

            // Áreas que precisam de atenção
            List<TopicPerformance> attentionAreas = tracker.getAttentionAreas();
            if (attentionAreas != null && !attentionAreas.isEmpty()) {
                layoutAttentionSection.setVisibility(View.VISIBLE);
                AttentionAreaAdapter adapter = new AttentionAreaAdapter(attentionAreas);
                rvAttentionAreas.setAdapter(adapter);
            } else {
                layoutAttentionSection.setVisibility(View.GONE);
            }
        }
    }

    private void setupListeners() {
        btnResultBackHome.setOnClickListener(v -> {
            Intent intent = new Intent(ExamResultActivity.this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            finish();
        });

        btnResultReviewManuals.setOnClickListener(v -> {
            Intent intent = new Intent(ExamResultActivity.this, ManualsActivity.class);
            startActivity(intent);
        });
    }

    @Override
    public void onBackPressed() {
        btnResultBackHome.performClick();
    }
}
