package mz.co.examemaster.models;

import java.io.Serializable;

/**
 * Modelo de dados para questões de exames de admissão.
 * Suporta identificação completa da instituição, alternativas, resposta correcta,
 * explicações pedagógicas em texto e vídeo.
 */
public class Question implements Serializable {
    private String id;
    private String universidade;
    private String curso;
    private String disciplina;
    private int ano;
    private String enunciado;
    private String imagemOpcional; // URL ou nome do recurso de imagem (opcional)
    private String alternativaA;
    private String alternativaB;
    private String alternativaC;
    private String alternativaD;
    private String respostaCorrecta; // "A", "B", "C" ou "D"
    private String explicacaoTextual;
    private String urlVideoExplicativo;
    private String topico;
    private String dificuldade; // "Fácil", "Média", "Difícil"

    public Question() {
    }

    public Question(String id, String universidade, String curso, String disciplina, int ano,
                    String enunciado, String imagemOpcional,
                    String alternativaA, String alternativaB, String alternativaC, String alternativaD,
                    String respostaCorrecta, String explicacaoTextual, String urlVideoExplicativo,
                    String topico, String dificuldade) {
        this.id = id;
        this.universidade = universidade;
        this.curso = curso;
        this.disciplina = disciplina;
        this.ano = ano;
        this.enunciado = enunciado;
        this.imagemOpcional = imagemOpcional;
        this.alternativaA = alternativaA;
        this.alternativaB = alternativaB;
        this.alternativaC = alternativaC;
        this.alternativaD = alternativaD;
        this.respostaCorrecta = respostaCorrecta;
        this.explicacaoTextual = explicacaoTextual;
        this.urlVideoExplicativo = urlVideoExplicativo;
        this.topico = topico;
        this.dificuldade = dificuldade;
    }

    // Getters e Setters principais
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUniversidade() {
        return universidade;
    }

    public void setUniversidade(String universidade) {
        this.universidade = universidade;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public String getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(String disciplina) {
        this.disciplina = disciplina;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getEnunciado() {
        return enunciado;
    }

    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
    }

    public String getImagemOpcional() {
        return imagemOpcional;
    }

    public void setImagemOpcional(String imagemOpcional) {
        this.imagemOpcional = imagemOpcional;
    }

    public String getAlternativaA() {
        return alternativaA;
    }

    public void setAlternativaA(String alternativaA) {
        this.alternativaA = alternativaA;
    }

    public String getAlternativaB() {
        return alternativaB;
    }

    public void setAlternativaB(String alternativaB) {
        this.alternativaB = alternativaB;
    }

    public String getAlternativaC() {
        return alternativaC;
    }

    public void setAlternativaC(String alternativaC) {
        this.alternativaC = alternativaC;
    }

    public String getAlternativaD() {
        return alternativaD;
    }

    public void setAlternativaD(String alternativaD) {
        this.alternativaD = alternativaD;
    }

    public String getRespostaCorrecta() {
        return respostaCorrecta;
    }

    public void setRespostaCorrecta(String respostaCorrecta) {
        this.respostaCorrecta = respostaCorrecta;
    }

    public String getExplicacaoTextual() {
        return explicacaoTextual;
    }

    public void setExplicacaoTextual(String explicacaoTextual) {
        this.explicacaoTextual = explicacaoTextual;
    }

    public String getUrlVideoExplicativo() {
        return urlVideoExplicativo;
    }

    public void setUrlVideoExplicativo(String urlVideoExplicativo) {
        this.urlVideoExplicativo = urlVideoExplicativo;
    }

    public String getTopico() {
        return topico;
    }

    public void setTopico(String topico) {
        this.topico = topico;
    }

    public String getDificuldade() {
        return dificuldade;
    }

    public void setDificuldade(String dificuldade) {
        this.dificuldade = dificuldade;
    }

    // Aliases de compatibilidade exigidos para interoperabilidade
    public String getOptionA() {
        return alternativaA;
    }

    public void setOptionA(String optionA) {
        this.alternativaA = optionA;
    }

    public String getOptionB() {
        return alternativaB;
    }

    public void setOptionB(String optionB) {
        this.alternativaB = optionB;
    }

    public String getOptionC() {
        return alternativaC;
    }

    public void setOptionC(String optionC) {
        this.alternativaC = optionC;
    }

    public String getOptionD() {
        return alternativaD;
    }

    public void setOptionD(String optionD) {
        this.alternativaD = optionD;
    }

    public String getCorrectOption() {
        return respostaCorrecta;
    }

    public void setCorrectOption(String correctOption) {
        this.respostaCorrecta = correctOption;
    }

    public String getTopic() {
        return topico;
    }

    public void setTopic(String topic) {
        this.topico = topic;
    }

    public String getStatement() {
        return enunciado;
    }

    public void setStatement(String statement) {
        this.enunciado = statement;
    }

    public String getUniversity() {
        return universidade;
    }

    public void setUniversity(String university) {
        this.universidade = university;
    }

    public String getSubject() {
        return disciplina;
    }

    public void setSubject(String subject) {
        this.disciplina = subject;
    }

    public int getYear() {
        return ano;
    }

    public void setYear(int year) {
        this.ano = year;
    }

    public String getTextExplanation() {
        return explicacaoTextual;
    }

    public void setTextExplanation(String textExplanation) {
        this.explicacaoTextual = textExplanation;
    }

    public String getVideoExplanationUrl() {
        return urlVideoExplicativo;
    }

    public void setVideoExplanationUrl(String videoExplanationUrl) {
        this.urlVideoExplicativo = videoExplanationUrl;
    }

    public String getDifficulty() {
        return dificuldade;
    }

    public void setDifficulty(String difficulty) {
        this.dificuldade = difficulty;
    }

    public String getOptionText(String optionLetter) {
        if ("A".equalsIgnoreCase(optionLetter)) return alternativaA;
        if ("B".equalsIgnoreCase(optionLetter)) return alternativaB;
        if ("C".equalsIgnoreCase(optionLetter)) return alternativaC;
        if ("D".equalsIgnoreCase(optionLetter)) return alternativaD;
        return "";
    }
}
