package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.SubjectAdapter;
import mz.co.examemaster.models.Subject;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.utils.Constants;

/**
 * Tela de Disciplinas de Admissão.
 */
public class SubjectsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_subjects);

        MaterialToolbar toolbar = findViewById(R.id.toolbarSubjects);
        toolbar.setNavigationOnClickListener(v -> finish());

        RecyclerView rv = findViewById(R.id.rvSubjects);
        rv.setLayoutManager(new LinearLayoutManager(this));

        DemoDataRepository repo = DemoDataRepository.getInstance(this);
        List<Subject> list = repo.getSubjects();

        SubjectAdapter adapter = new SubjectAdapter(list, subject -> {
            Intent intent = new Intent(SubjectsActivity.this, ExamsActivity.class);
            intent.putExtra(Constants.EXTRA_SUBJECT_ID, subject.getId());
            intent.putExtra("EXTRA_SUBJECT_NAME", subject.getName());
            startActivity(intent);
        });

        rv.setAdapter(adapter);
    }
}
