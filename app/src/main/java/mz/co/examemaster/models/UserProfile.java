package mz.co.examemaster.models;

import java.io.Serializable;

/**
 * Modelo para dados do perfil do estudante.
 */
public class UserProfile implements Serializable {
    private String id;
    private String fullName;
    private String email;
    private String selectedUniversityId;
    private String selectedUniversityName;
    private String selectedCourseId;
    private String selectedCourseName;
    private int targetYear;
    private int questionsAnswered;
    private int correctAnswers;
    private int examsCompleted;
    private String lastExamResultFormatted; // e.g. "74% (UEM Matemática 2023)"
    private int studyStreakDays;

    public UserProfile() {
    }

    public UserProfile(String id, String fullName, String email, String selectedUniversityId,
                       String selectedUniversityName, String selectedCourseId, String selectedCourseName,
                       int targetYear, int questionsAnswered, int correctAnswers, int examsCompleted,
                       String lastExamResultFormatted, int studyStreakDays) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.selectedUniversityId = selectedUniversityId;
        this.selectedUniversityName = selectedUniversityName;
        this.selectedCourseId = selectedCourseId;
        this.selectedCourseName = selectedCourseName;
        this.targetYear = targetYear;
        this.questionsAnswered = questionsAnswered;
        this.correctAnswers = correctAnswers;
        this.examsCompleted = examsCompleted;
        this.lastExamResultFormatted = lastExamResultFormatted;
        this.studyStreakDays = studyStreakDays;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSelectedUniversityId() {
        return selectedUniversityId;
    }

    public void setSelectedUniversityId(String selectedUniversityId) {
        this.selectedUniversityId = selectedUniversityId;
    }

    public String getSelectedUniversityName() {
        return selectedUniversityName;
    }

    public void setSelectedUniversityName(String selectedUniversityName) {
        this.selectedUniversityName = selectedUniversityName;
    }

    public String getSelectedCourseId() {
        return selectedCourseId;
    }

    public void setSelectedCourseId(String selectedCourseId) {
        this.selectedCourseId = selectedCourseId;
    }

    public String getSelectedCourseName() {
        return selectedCourseName;
    }

    public void setSelectedCourseName(String selectedCourseName) {
        this.selectedCourseName = selectedCourseName;
    }

    public int getTargetYear() {
        return targetYear;
    }

    public void setTargetYear(int targetYear) {
        this.targetYear = targetYear;
    }

    public int getQuestionsAnswered() {
        return questionsAnswered;
    }

    public void setQuestionsAnswered(int questionsAnswered) {
        this.questionsAnswered = questionsAnswered;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getExamsCompleted() {
        return examsCompleted;
    }

    public void setExamsCompleted(int examsCompleted) {
        this.examsCompleted = examsCompleted;
    }

    public String getLastExamResultFormatted() {
        return lastExamResultFormatted;
    }

    public void setLastExamResultFormatted(String lastExamResultFormatted) {
        this.lastExamResultFormatted = lastExamResultFormatted;
    }

    public int getStudyStreakDays() {
        return studyStreakDays;
    }

    public void setStudyStreakDays(int studyStreakDays) {
        this.studyStreakDays = studyStreakDays;
    }

    public int getGlobalAccuracyPercentage() {
        if (questionsAnswered == 0) return 0;
        return (int) Math.round(((double) correctAnswers / questionsAnswered) * 100);
    }

    // Aliases de compatibilidade exigidos
    public String getName() {
        return fullName;
    }

    public void setName(String name) {
        this.fullName = name;
    }

    public String getTargetUniversity() {
        return selectedUniversityName;
    }

    public void setTargetUniversity(String targetUniversity) {
        this.selectedUniversityName = targetUniversity;
    }

    public String getTargetCourse() {
        return selectedCourseName;
    }

    public void setTargetCourse(String targetCourse) {
        this.selectedCourseName = targetCourse;
    }

    public int getTotalExamsCompleted() {
        return examsCompleted;
    }

    public void setTotalExamsCompleted(int totalExamsCompleted) {
        this.examsCompleted = totalExamsCompleted;
    }

    public int getTotalQuestionsAnswered() {
        return questionsAnswered;
    }

    public void setTotalQuestionsAnswered(int totalQuestionsAnswered) {
        this.questionsAnswered = totalQuestionsAnswered;
    }

    public double getOverallAccuracy() {
        return getGlobalAccuracyPercentage();
    }
}
