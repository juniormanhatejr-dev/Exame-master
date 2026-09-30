package mz.co.examemaster.models;

import java.io.Serializable;
import java.util.List;

/**
 * Modelo para os Cursos Universitários (ex: Medicina, Engenharia Informática, Direito, Economia)
 */
public class Course implements Serializable {
    private String id;
    private String universityId;
    private String name;
    private String faculty;
    private int durationYears;
    private List<String> requiredSubjectIds;
    private String description;

    public Course() {
    }

    public Course(String id, String universityId, String name, String faculty, int durationYears, List<String> requiredSubjectIds, String description) {
        this.id = id;
        this.universityId = universityId;
        this.name = name;
        this.faculty = faculty;
        this.durationYears = durationYears;
        this.requiredSubjectIds = requiredSubjectIds;
        this.description = description;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public int getDurationYears() {
        return durationYears;
    }

    public void setDurationYears(int durationYears) {
        this.durationYears = durationYears;
    }

    public List<String> getRequiredSubjectIds() {
        return requiredSubjectIds;
    }

    public void setRequiredSubjectIds(List<String> requiredSubjectIds) {
        this.requiredSubjectIds = requiredSubjectIds;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
