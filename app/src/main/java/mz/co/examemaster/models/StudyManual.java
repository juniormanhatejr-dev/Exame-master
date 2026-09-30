package mz.co.examemaster.models;

import java.io.Serializable;
import java.util.List;

/**
 * Modelo para a Biblioteca de Manuais de Estudo organizada por:
 * Universidade -> Curso -> Disciplina -> Tema.
 */
public class StudyManual implements Serializable {
    private String id;
    private String universityId;
    private String universityName;
    private String courseId;
    private String courseName;
    private String subjectId;
    private String subjectName;
    private String topic;
    private String title;
    private String summary;
    private String contentText;
    private String pdfUrl;
    private List<String> chapters;
    private int relatedExercisesCount;
    private boolean isDemo;

    public StudyManual() {
    }

    public StudyManual(String id, String universityId, String universityName, String courseId, String courseName,
                       String subjectId, String subjectName, String topic, String title, String summary,
                       String contentText, String pdfUrl, List<String> chapters, int relatedExercisesCount, boolean isDemo) {
        this.id = id;
        this.universityId = universityId;
        this.universityName = universityName;
        this.courseId = courseId;
        this.courseName = courseName;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.topic = topic;
        this.title = title;
        this.summary = summary;
        this.contentText = contentText;
        this.pdfUrl = pdfUrl;
        this.chapters = chapters;
        this.relatedExercisesCount = relatedExercisesCount;
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

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
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

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public List<String> getChapters() {
        return chapters;
    }

    public void setChapters(List<String> chapters) {
        this.chapters = chapters;
    }

    public int getRelatedExercisesCount() {
        return relatedExercisesCount;
    }

    public void setRelatedExercisesCount(int relatedExercisesCount) {
        this.relatedExercisesCount = relatedExercisesCount;
    }

    public boolean isDemo() {
        return isDemo;
    }

    public void setDemo(boolean demo) {
        isDemo = demo;
    }

    // Alias de compatibilidade
    public String getContent() {
        return contentText;
    }

    public void setContent(String content) {
        this.contentText = content;
    }
}
