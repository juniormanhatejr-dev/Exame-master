package mz.co.examemaster.models;

import java.io.Serializable;

/**
 * Representa o desempenho por tópico para a secção:
 * "Áreas que precisam de atenção"
 */
public class TopicPerformance implements Serializable {
    private String topicName;
    private String subjectName;
    private int wrongCount;
    private int totalQuestions;
    private String tip;

    public TopicPerformance() {
    }

    public TopicPerformance(String topicName, String subjectName, int wrongCount, int totalQuestions, String tip) {
        this.topicName = topicName;
        this.subjectName = subjectName;
        this.wrongCount = wrongCount;
        this.totalQuestions = totalQuestions;
        this.tip = tip;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public int getWrongCount() {
        return wrongCount;
    }

    public void setWrongCount(int wrongCount) {
        this.wrongCount = wrongCount;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public int getErrorPercentage() {
        if (totalQuestions == 0) return 0;
        return (int) Math.round(((double) wrongCount / totalQuestions) * 100);
    }
}
