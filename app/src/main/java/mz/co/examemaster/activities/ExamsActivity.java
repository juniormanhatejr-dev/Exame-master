package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.ExamAdapter;
import mz.co.examemaster.models.Exam;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.utils.Constants;

/**
 * Tela de Listagem de Exames Anteriores de Admissão.
 */
public class ExamsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exams);

        MaterialToolbar toolbar = findViewById(R.id.toolbarExams);
        toolbar.setNavigationOnClickListener(v -> finish());

        String subjectId = getIntent().getStringExtra(Constants.EXTRA_SUBJECT_ID);

        RecyclerView rv = findViewById(R.id.rvExams);
        rv.setLayoutManager(new LinearLayoutManager(this));

        DemoDataRepository repo = DemoDataRepository.getInstance(this);
        List<Exam> list = (subjectId != null) ? repo.getExamsBySubject(subjectId) : repo.getExams();

        ExamAdapter adapter = new ExamAdapter(list, new ExamAdapter.OnExamActionListener() {
            @Override
            public void onStartPractice(Exam exam) {
                Intent intent = new Intent(ExamsActivity.this, QuizActivity.class);
                intent.putExtra(Constants.EXTRA_EXAM_ID, exam.getId());
                startActivity(intent);
            }

            @Override
            public void onStartTimed(Exam exam) {
                Intent intent = new Intent(ExamsActivity.this, TimedQuizActivity.class);
                intent.putExtra(Constants.EXTRA_EXAM_ID, exam.getId());
                startActivity(intent);
            }
        });

        rv.setAdapter(adapter);
    }
}
