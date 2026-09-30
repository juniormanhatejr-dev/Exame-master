package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.appbar.MaterialToolbar;
import mz.co.examemaster.R;
import mz.co.examemaster.models.Exam;
import mz.co.examemaster.models.StudyManual;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.utils.Constants;

/**
 * Tela de Conteúdo Completo do Manual de Estudo.
 */
public class ManualDetailActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manual_detail);

        MaterialToolbar toolbar = findViewById(R.id.toolbarManualDetail);
        toolbar.setNavigationOnClickListener(v -> finish());

        String manualId = getIntent().getStringExtra(Constants.EXTRA_MANUAL_ID);
        DemoDataRepository repo = DemoDataRepository.getInstance(this);
        StudyManual manual = repo.getManualById(manualId);

        if (manual == null && !repo.getStudyManuals().isEmpty()) {
            manual = repo.getStudyManuals().get(0);
        }

        if (manual != null) {
            TextView tvTopic = findViewById(R.id.tvManualDetailTopic);
            TextView tvTitle = findViewById(R.id.tvManualDetailTitle);
            TextView tvHierarchy = findViewById(R.id.tvManualDetailHierarchy);
            TextView tvChapters = findViewById(R.id.tvManualDetailChapters);
            TextView tvContent = findViewById(R.id.tvManualDetailContent);
            Button btnPractice = findViewById(R.id.btnPracticeExercisesFromManual);

            tvTopic.setText(manual.getTopic());
            tvTitle.setText(manual.getTitle());
            tvHierarchy.setText(manual.getUniversityName() + " • " + manual.getCourseName() + " • " + manual.getSubjectName());

            StringBuilder sb = new StringBuilder();
            if (manual.getChapters() != null) {
                for (int i = 0; i < manual.getChapters().size(); i++) {
                    sb.append(i + 1).append(". ").append(manual.getChapters().get(i)).append("\n");
                }
            }
            tvChapters.setText(sb.toString().trim());
            tvContent.setText(manual.getContent());

            btnPractice.setOnClickListener(v -> {
                Exam exam = repo.getExams().get(0);
                Intent intent = new Intent(ManualDetailActivity.this, QuizActivity.class);
                intent.putExtra(Constants.EXTRA_EXAM_ID, exam.getId());
                startActivity(intent);
            });
        }
    }
}
