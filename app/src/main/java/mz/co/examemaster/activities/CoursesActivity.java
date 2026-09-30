package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.CourseAdapter;
import mz.co.examemaster.models.Course;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.utils.Constants;

/**
 * Tela de Cursos da Universidade Seleccionada.
 */
public class CoursesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_courses);

        MaterialToolbar toolbar = findViewById(R.id.toolbarCourses);
        toolbar.setNavigationOnClickListener(v -> finish());

        String uniId = getIntent().getStringExtra(Constants.EXTRA_UNIVERSITY_ID);
        String uniName = getIntent().getStringExtra("EXTRA_UNIVERSITY_NAME");

        TextView tvUniName = findViewById(R.id.tvCoursesUniversityName);
        if (uniName != null) {
            tvUniName.setText(uniName);
        }

        RecyclerView rv = findViewById(R.id.rvCourses);
        rv.setLayoutManager(new LinearLayoutManager(this));

        DemoDataRepository repo = DemoDataRepository.getInstance(this);
        List<Course> list = (uniId != null) ? repo.getCoursesByUniversity(uniId) : repo.getCourses();

        CourseAdapter adapter = new CourseAdapter(list, course -> {
            Intent intent = new Intent(CoursesActivity.this, SubjectsActivity.class);
            intent.putExtra(Constants.EXTRA_COURSE_ID, course.getId());
            intent.putExtra("EXTRA_COURSE_NAME", course.getName());
            startActivity(intent);
        });

        rv.setAdapter(adapter);
    }
}
