package mz.co.examemaster.repositories;

import android.content.Context;
import android.content.SharedPreferences;
import com.google.gson.Gson;
import mz.co.examemaster.models.UserProfile;

/**
 * Autenticação local offline utilizando SharedPreferences e Gson.
 * Funciona sem internet na primeira versão e garante transição suave para Firebase Authentication.
 */
public class LocalAuthRepository implements IAuthRepository {

    private static LocalAuthRepository instance;
    private final SharedPreferences preferences;
    private final Context context;
    private final Gson gson;

    private static final String PREF_NAME = "ExameMasterAuth";
    private static final String KEY_IS_LOGGED_IN = "is_logged_in";
    private static final String KEY_USER_EMAIL = "user_email";
    private static final String KEY_USER_NAME = "user_name";
    private static final String KEY_USER_PROFILE_JSON = "user_profile_json";

    public static synchronized LocalAuthRepository getInstance(Context context) {
        if (instance == null) {
            instance = new LocalAuthRepository(context.getApplicationContext());
        }
        return instance;
    }

    private LocalAuthRepository(Context context) {
        this.context = context;
        this.preferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        this.gson = new Gson();
    }

    @Override
    public boolean isLoggedIn() {
        return preferences.getBoolean(KEY_IS_LOGGED_IN, false);
    }

    @Override
    public boolean login(String email, String password) {
        if (email != null && !email.trim().isEmpty() && password != null && password.length() >= 4) {
            String name = email.split("@")[0];
            String formattedName = Character.toUpperCase(name.charAt(0)) + (name.length() > 1 ? name.substring(1) : "");
            
            // Verifica se já existe um perfil gravado ou cria um correspondente
            UserProfile profile = getCurrentUser();
            if (profile == null) {
                profile = new UserProfile(
                        "usr_" + System.currentTimeMillis(),
                        formattedName,
                        email.trim(),
                        "uem",
                        "Universidade Eduardo Mondlane (UEM)",
                        "c_inf_uem",
                        "Engenharia Informática",
                        2025,
                        45, 33, 4,
                        "74% (UEM Matemática)",
                        5
                );
                saveUserProfile(profile);
            } else {
                profile.setEmail(email.trim());
                saveUserProfile(profile);
            }

            preferences.edit()
                    .putBoolean(KEY_IS_LOGGED_IN, true)
                    .putString(KEY_USER_EMAIL, email.trim())
                    .putString(KEY_USER_NAME, formattedName)
                    .apply();
            return true;
        }
        return false;
    }

    @Override
    public boolean register(String fullName, String email, String password) {
        return register(fullName, email, password, "Universidade Eduardo Mondlane (UEM)", "Engenharia Informática", 2025);
    }

    /**
     * Sobrecarga completa de registro com informações académicas.
     */
    public boolean register(String fullName, String email, String password, String university, String course, int targetYear) {
        if (fullName != null && !fullName.trim().isEmpty() && email != null && email.contains("@") && password != null && password.length() >= 4) {
            UserProfile profile = new UserProfile(
                    "usr_" + System.currentTimeMillis(),
                    fullName.trim(),
                    email.trim(),
                    "uni_target",
                    university != null ? university : "Universidade Eduardo Mondlane (UEM)",
                    "course_target",
                    course != null ? course : "Engenharia Informática",
                    targetYear > 0 ? targetYear : 2025,
                    0, 0, 0,
                    "Novo Candidato",
                    1
            );
            saveUserProfile(profile);

            preferences.edit()
                    .putBoolean(KEY_IS_LOGGED_IN, true)
                    .putString(KEY_USER_EMAIL, email.trim())
                    .putString(KEY_USER_NAME, fullName.trim())
                    .apply();
            return true;
        }
        return false;
    }

    /**
     * Retorna o perfil do utilizador autenticado.
     */
    public UserProfile getCurrentUser() {
        String json = preferences.getString(KEY_USER_PROFILE_JSON, null);
        if (json != null && !json.trim().isEmpty()) {
            try {
                return gson.fromJson(json, UserProfile.class);
            } catch (Exception ignored) {
            }
        }
        // Fallback para perfil inicial demo
        String name = preferences.getString(KEY_USER_NAME, "Candidato Universitário");
        String email = preferences.getString(KEY_USER_EMAIL, "candidato@examemaster.mz");
        return new UserProfile(
                "usr_demo",
                name,
                email,
                "uem",
                "Universidade Eduardo Mondlane (UEM)",
                "c_inf_uem",
                "Engenharia Informática",
                2025,
                45, 33, 4,
                "74% (UEM Matemática)",
                5
        );
    }

    public void saveUserProfile(UserProfile profile) {
        if (profile == null) return;
        String json = gson.toJson(profile);
        preferences.edit()
                .putString(KEY_USER_PROFILE_JSON, json)
                .putString(KEY_USER_NAME, profile.getFullName())
                .putString(KEY_USER_EMAIL, profile.getEmail())
                .apply();
    }

    @Override
    public void logout() {
        preferences.edit()
                .putBoolean(KEY_IS_LOGGED_IN, false)
                .apply();
    }

    @Override
    public String getCurrentUserEmail() {
        return preferences.getString(KEY_USER_EMAIL, "candidato@examemaster.mz");
    }

    @Override
    public String getCurrentUserName() {
        return preferences.getString(KEY_USER_NAME, "Candidato Universitário");
    }
}
