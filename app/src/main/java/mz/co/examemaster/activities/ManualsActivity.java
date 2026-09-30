package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.StudyManualAdapter;
import mz.co.examemaster.models.StudyManual;
import mz.co.examemaster.repositories.DemoDataRepository;
import mz.co.examemaster.utils.Constants;

/**
 * Tela de Manuais de Estudo organizada por:
 * Universidade → Curso → Disciplina → Tema
 */
public class ManualsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manuals);

        MaterialToolbar toolbar = findViewById(R.id.toolbarManuals);
        toolbar.setNavigationOnClickListener(v -> finish());

        RecyclerView rv = findViewById(R.id.rvManuals);
        rv.setLayoutManager(new LinearLayoutManager(this));

        DemoDataRepository repo = DemoDataRepository.getInstance(this);
        List<StudyManual> list = repo.getStudyManuals();

        StudyManualAdapter adapter = new StudyManualAdapter(list, manual -> {
            Intent intent = new Intent(ManualsActivity.this, ManualDetailActivity.class);
            intent.putExtra(Constants.EXTRA_MANUAL_ID, manual.getId());
            startActivity(intent);
        });

        rv.setAdapter(adapter);
    }
}
