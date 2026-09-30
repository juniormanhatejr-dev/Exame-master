package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.UniversityAdapter;
import mz.co.examemaster.models.University;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.utils.Constants;

/**
 * Tela de Selecção de Universidades de Moçambique.
 */
public class UniversitiesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_universities);

        MaterialToolbar toolbar = findViewById(R.id.toolbarUniversities);
        toolbar.setNavigationOnClickListener(v -> finish());

        RecyclerView rv = findViewById(R.id.rvUniversities);
        rv.setLayoutManager(new LinearLayoutManager(this));

        DemoDataRepository repo = DemoDataRepository.getInstance(this);
        List<University> list = repo.getUniversities();

        UniversityAdapter adapter = new UniversityAdapter(list, university -> {
            Intent intent = new Intent(UniversitiesActivity.this, CoursesActivity.class);
            intent.putExtra(Constants.EXTRA_UNIVERSITY_ID, university.getId());
            intent.putExtra("EXTRA_UNIVERSITY_NAME", university.getName());
            startActivity(intent);
        });

        rv.setAdapter(adapter);
    }
}
