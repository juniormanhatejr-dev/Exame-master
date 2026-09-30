package mz.co.examemaster.activities;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.PerformanceHistoryAdapter;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.services.PerformanceTracker;

/**
 * Tela de Histórico Completo de Desempenho do Estudante.
 */
public class PerformanceHistoryActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_performance_history);

        MaterialToolbar toolbar = findViewById(R.id.toolbarHistory);
        toolbar.setNavigationOnClickListener(v -> finish());

        RecyclerView rv = findViewById(R.id.rvHistory);
        rv.setLayoutManager(new LinearLayoutManager(this));

        PerformanceTracker tracker = new PerformanceTracker(this);
        List<ExamResult> history = tracker.getExamHistory();

        PerformanceHistoryAdapter adapter = new PerformanceHistoryAdapter(history);
        rv.setAdapter(adapter);
    }
}
