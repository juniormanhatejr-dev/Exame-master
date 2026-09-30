package mz.co.examemaster.models;

import java.io.Serializable;

/**
 * Modelo para as Universidades moçambicanas (UEM, UP-Maputo, UJC, UniLicungo, UniPúnguè, etc.)
 */
public class University implements Serializable {
    private String id;
    private String name;
    private String acronym;
    private String location;
    private String description;
    private String logoUrl;
    private int coursesCount;
    private boolean isDemo;

    public University() {
    }

    public University(String id, String name, String acronym, String location, String description, String logoUrl, int coursesCount, boolean isDemo) {
        this.id = id;
        this.name = name;
        this.acronym = acronym;
        this.location = location;
        this.description = description;
        this.logoUrl = logoUrl;
        this.coursesCount = coursesCount;
        this.isDemo = isDemo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public int getCoursesCount() {
        return coursesCount;
    }

    public void setCoursesCount(int coursesCount) {
        this.coursesCount = coursesCount;
    }

    public boolean isDemo() {
        return isDemo;
    }

    public void setDemo(boolean demo) {
        isDemo = demo;
    }
}
