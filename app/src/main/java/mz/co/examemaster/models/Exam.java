package mz.co.examemaster.models;

import java.io.Serializable;

/**
 * Modelo para exames anteriores e simulados.
 */
public class Exam implements Serializable {
    private String id;
    private String universityId;
    private String universityName;
    private String subjectId;
    private String subjectName;
    private int year;
    private String title;
    private int totalQuestions;
    private int durationMinutes;
    private boolean isDemo;

    public Exam() {
    }

    public Exam(String id, String universityId, String universityName, String subjectId, String subjectName,
                int year, String title, int totalQuestions, int durationMinutes, boolean isDemo) {
        this.id = id;
        this.universityId = universityId;
        this.universityName = universityName;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.year = year;
        this.title = title;
        this.totalQuestions = totalQuestions;
        this.durationMinutes = durationMinutes;
        this.isDemo = isDemo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUniversityId() {
        return universityId;
    }

    public void setUniversityId(String universityId) {
        this.universityId = universityId;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public boolean isDemo() {
        return isDemo;
    }

    public void setDemo(boolean demo) {
        isDemo = demo;
    }
}
