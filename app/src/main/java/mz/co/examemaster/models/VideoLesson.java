package mz.co.examemaster.models;

import java.io.Serializable;

/**
 * Modelo para Videoaulas preparatórias.
 * Arquitectura compatível com Android Media3 / ExoPlayer.
 */
public class VideoLesson implements Serializable {
    private String id;
    private String title;
    private String subject;
    private String topic;
    private String description;
    private String url;
    private String duration; // e.g. "18:45"
    private String instructor;
    private String universityReference;

    public VideoLesson() {
    }

    public VideoLesson(String id, String title, String subject, String topic, String description,
                       String url, String duration, String instructor, String universityReference) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.topic = topic;
        this.description = description;
        this.url = url;
        this.duration = duration;
        this.instructor = instructor;
        this.universityReference = universityReference;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getUniversityReference() {
        return universityReference;
    }

    public void setUniversityReference(String universityReference) {
        this.universityReference = universityReference;
    }

    // Alias de compatibilidade
    public String getVideoUrl() {
        return url;
    }

    public void setVideoUrl(String videoUrl) {
        this.url = videoUrl;
    }
}
