package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.appbar.MaterialToolbar;
import mz.co.examemaster.R;
import mz.co.examemaster.models.UserProfile;
import mz.co.examemaster.repositories.LocalAuthRepository;

/**
 * Tela de Perfil do Estudante.
 */
public class ProfileActivity extends AppCompatActivity {

    private LocalAuthRepository authRepo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        authRepo = LocalAuthRepository.getInstance(this);

        MaterialToolbar toolbar = findViewById(R.id.toolbarProfile);
        toolbar.setNavigationOnClickListener(v -> finish());

        TextView tvName = findViewById(R.id.tvProfileName);
        TextView tvEmail = findViewById(R.id.tvProfileEmail);
        TextView tvTargetUni = findViewById(R.id.tvProfileTargetUniversity);
        TextView tvTargetCourse = findViewById(R.id.tvProfileTargetCourse);

        TextView tvExamsDone = findViewById(R.id.tvProfileExamsDone);
        TextView tvQuestionsDone = findViewById(R.id.tvProfileQuestionsDone);
        TextView tvAccuracy = findViewById(R.id.tvProfileAccuracy);

        Button btnHistory = findViewById(R.id.btnViewFullHistory);
        Button btnLogout = findViewById(R.id.btnLogout);

        UserProfile user = authRepo.getCurrentUser();
        if (user != null) {
            tvName.setText(user.getName());
            tvEmail.setText(user.getEmail());
            tvTargetUni.setText(user.getTargetUniversity());
            tvTargetCourse.setText("Curso: " + user.getTargetCourse() + " (Ano " + user.getTargetYear() + ")");

            tvExamsDone.setText(String.valueOf(user.getTotalExamsCompleted()));
            tvQuestionsDone.setText(String.valueOf(user.getTotalQuestionsAnswered()));
            tvAccuracy.setText(Math.round(user.getOverallAccuracy()) + "%");
        }

        btnHistory.setOnClickListener(v -> {
            startActivity(new Intent(ProfileActivity.this, PerformanceHistoryActivity.class));
        });

        btnLogout.setOnClickListener(v -> {
            new AlertDialog.Builder(ProfileActivity.this)
                    .setTitle("Terminar Sessão")
                    .setMessage("Tem a certeza de que deseja sair?")
                    .setPositiveButton("Sair", (dialog, which) -> {
                        authRepo.logout();
                        Intent intent = new Intent(ProfileActivity.this, LoginActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(intent);
                        finish();
                    })
                    .setNegativeButton("Cancelar", null)
                    .show();
        });
    }
}
