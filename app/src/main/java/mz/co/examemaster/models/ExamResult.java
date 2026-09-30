package mz.co.examemaster.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Modelo com o resultado consolidado de um exame resolvido.
 */
public class ExamResult implements Serializable {
    private String id;
    private String examId;
    private String examTitle;
    private String universityName;
    private String subjectName;
    private int score;
    private int totalQuestions;
    private double percentage;
    private int correctCount;
    private int incorrectCount;
    private int unansweredCount;
    private long timeSpentSeconds;
    private double averageTimePerQuestionSeconds;
    private long timestamp;
    private List<TopicPerformance> attentionTopics;

    public ExamResult() {
        this.attentionTopics = new ArrayList<>();
    }

    public ExamResult(String id, String examId, String examTitle, String universityName, String subjectName,
                      int score, int totalQuestions, double percentage, int correctCount, int incorrectCount,
                      int unansweredCount, long timeSpentSeconds, double averageTimePerQuestionSeconds,
                      long timestamp, List<TopicPerformance> attentionTopics) {
        this.id = id;
        this.examId = examId;
        this.examTitle = examTitle;
        this.universityName = universityName;
        this.subjectName = subjectName;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.correctCount = correctCount;
        this.incorrectCount = incorrectCount;
        this.unansweredCount = unansweredCount;
        this.timeSpentSeconds = timeSpentSeconds;
        this.averageTimePerQuestionSeconds = averageTimePerQuestionSeconds;
        this.timestamp = timestamp;
        this.attentionTopics = attentionTopics != null ? attentionTopics : new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public int getCorrectCount() {
        return correctCount;
    }

    public void setCorrectCount(int correctCount) {
        this.correctCount = correctCount;
    }

    public int getIncorrectCount() {
        return incorrectCount;
    }

    public void setIncorrectCount(int incorrectCount) {
        this.incorrectCount = incorrectCount;
    }

    public int getUnansweredCount() {
        return unansweredCount;
    }

    public void setUnansweredCount(int unansweredCount) {
        this.unansweredCount = unansweredCount;
    }

    public long getTimeSpentSeconds() {
        return timeSpentSeconds;
    }

    public void setTimeSpentSeconds(long timeSpentSeconds) {
        this.timeSpentSeconds = timeSpentSeconds;
    }

    public double getAverageTimePerQuestionSeconds() {
        return averageTimePerQuestionSeconds;
    }

    public void setAverageTimePerQuestionSeconds(double averageTimePerQuestionSeconds) {
        this.averageTimePerQuestionSeconds = averageTimePerQuestionSeconds;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public List<TopicPerformance> getAttentionTopics() {
        return attentionTopics;
    }

    public void setAttentionTopics(List<TopicPerformance> attentionTopics) {
        this.attentionTopics = attentionTopics;
    }

    // Aliases de compatibilidade
    public int getWrongCount() {
        return incorrectCount;
    }

    public void setWrongCount(int wrongCount) {
        this.incorrectCount = wrongCount;
    }

    public List<TopicPerformance> getAttentionAreas() {
        return attentionTopics;
    }

    public void setAttentionAreas(List<TopicPerformance> attentionAreas) {
        this.attentionTopics = attentionAreas;
    }
}
