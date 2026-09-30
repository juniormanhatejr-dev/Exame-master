package mz.co.examemaster.activities;

import android.os.Bundle;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.appbar.MaterialToolbar;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.adapters.VideoLessonAdapter;
import mz.co.examemaster.models.VideoLesson;
import mz.co.examemaster.repositories.DemoDataRepository;

/**
 * Tela de Videoaulas Explicativas.
 * Suporta metadados e arquitectura pronta para Android Media3 / ExoPlayer.
 */
public class VideoLessonsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_lessons);

        MaterialToolbar toolbar = findViewById(R.id.toolbarVideoLessons);
        toolbar.setNavigationOnClickListener(v -> finish());

        RecyclerView rv = findViewById(R.id.rvVideoLessons);
        rv.setLayoutManager(new LinearLayoutManager(this));

        DemoDataRepository repo = DemoDataRepository.getInstance(this);
        List<VideoLesson> list = repo.getVideoLessons();

        VideoLessonAdapter adapter = new VideoLessonAdapter(list, video -> {
            new AlertDialog.Builder(VideoLessonsActivity.this)
                    .setTitle(video.getTitle())
                    .setMessage("Disciplina: " + video.getSubject() + "\n" +
                            "Tópico: " + video.getTopic() + "\n" +
                            "Docente: " + video.getInstructor() + " (" + video.getUniversityReference() + ")\n" +
                            "Duração: " + video.getDuration() + "\n\n" +
                            "Descrição:\n" + video.getDescription() + "\n\n" +
                            "Streaming URI:\n" + video.getVideoUrl() + "\n\n" +
                            "(Reprodução em alta definição configurada com Media3/ExoPlayer)")
                    .setPositiveButton("Reproduzir", null)
                    .setNegativeButton("Fechar", null)
                    .show();
        });

        rv.setAdapter(adapter);
    }
}
