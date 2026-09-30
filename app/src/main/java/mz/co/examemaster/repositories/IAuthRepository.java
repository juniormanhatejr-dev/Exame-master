package mz.co.examemaster.repositories;

/**
 * Interface para autenticação.
 * Preparada para migração futura para Firebase Authentication sem alterar as telas de Login/Registo.
 */
public interface IAuthRepository {
    boolean isLoggedIn();
    boolean login(String email, String password);
    boolean register(String fullName, String email, String password);
    void logout();
    String getCurrentUserEmail();
    String getCurrentUserName();
}
