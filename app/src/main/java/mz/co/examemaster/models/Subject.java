package mz.co.examemaster.models;

import java.io.Serializable;

/**
 * Modelo para as Disciplinas dos exames de admissão (Matemática, Português, Física, Biologia, Química, Geografia, História, etc.)
 */
public class Subject implements Serializable {
    private String id;
    private String name;
    private String code;
    private String description;
    private int questionsCount;
    private String iconName;

    public Subject() {
    }

    public Subject(String id, String name, String code, String description, int questionsCount, String iconName) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.questionsCount = questionsCount;
        this.iconName = iconName;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuestionsCount() {
        return questionsCount;
    }

    public void setQuestionsCount(int questionsCount) {
        this.questionsCount = questionsCount;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }
}
