package mz.co.examemaster.activities;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import mz.co.examemaster.R;
import mz.co.examemaster.repositories.LocalAuthRepository;

/**
 * 3. Registo de Estudante
 * Permite definir nome, e-mail, universidade-alvo, curso e ano de candidatura.
 */
public class RegisterActivity extends AppCompatActivity {

    private EditText etName, etEmail, etPassword, etCourse;
    private AutoCompleteTextView actvUniversity;
    private Button btnRegister;
    private TextView tvGoToLogin;
    private LocalAuthRepository authRepo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        authRepo = LocalAuthRepository.getInstance(this);

        etName = findViewById(R.id.etRegisterName);
        etEmail = findViewById(R.id.etRegisterEmail);
        etPassword = findViewById(R.id.etRegisterPassword);
        actvUniversity = findViewById(R.id.actvRegisterUniversity);
        etCourse = findViewById(R.id.etRegisterCourse);
        btnRegister = findViewById(R.id.btnRegister);
        tvGoToLogin = findViewById(R.id.tvGoToLogin);

        String[] universities = new String[]{
                "Universidade Eduardo Mondlane (UEM)",
                "Universidade Pedagógica de Maputo (UP)",
                "Universidade Lúrio (UniLúrio)",
                "Universidade Zambeze (UniZambeze)",
                "Universidade Púnguè (UniPúnguè)",
                "Universidade Rovuma (UniRovuma)",
                "Universidade Joaquim Chissano (UJC)"
        };
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, universities);
        actvUniversity.setAdapter(adapter);

        btnRegister.setOnClickListener(v -> handleRegister());
        tvGoToLogin.setOnClickListener(v -> finish());
    }

    private void handleRegister() {
        String name = etName.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String university = actvUniversity.getText().toString().trim();
        String course = etCourse.getText().toString().trim();

        if (TextUtils.isEmpty(name)) {
            etName.setError("Informe o seu nome");
            etName.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(email)) {
            etEmail.setError("Informe o seu e-mail");
            etEmail.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(password) || password.length() < 6) {
            etPassword.setError("Palavra-passe deve ter no mínimo 6 caracteres");
            etPassword.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(university)) {
            university = "Universidade Eduardo Mondlane (UEM)";
        }

        if (TextUtils.isEmpty(course)) {
            course = "Engenharia Informática";
        }

        boolean success = authRepo.register(name, email, password, university, course, 2025);
        if (success) {
            Toast.makeText(this, "Conta criada com sucesso!", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
        } else {
            Toast.makeText(this, "Erro ao criar perfil. Tente novamente.", Toast.LENGTH_SHORT).show();
        }
    }
}
