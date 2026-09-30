package mz.co.examemaster.services;

import android.content.Context;
import android.content.SharedPreferences;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.models.Question;
import mz.co.examemaster.models.TopicPerformance;

/**
 * Serviço que rastreia as respostas durante a sessão e calcula as métricas de desempenho:
 * - Nota final e percentual
 * - Respostas certas, erradas e não respondidas
 * - Tempo total e média por questão
 * - Áreas que precisam de atenção (tópicos mais errados)
 * - Persistência offline em SharedPreferences com Gson
 */
public class PerformanceTracker {

    private static final String PREFS_NAME = "mz_examemaster_performance";
    private static final String KEY_RESULTS_HISTORY = "key_exam_results_history";

    private final Context context;
    private final SharedPreferences prefs;
    private final Gson gson;

    // Estado da sessão activa de exame
    private final List<Question> sessionQuestions = new ArrayList<>();
    private final Map<Integer, String> sessionAnswers = new HashMap<>();

    public PerformanceTracker(Context context) {
        this.context = context != null ? context.getApplicationContext() : null;
        if (this.context != null) {
            this.prefs = this.context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        } else {
            this.prefs = null;
        }
        this.gson = new Gson();
    }

    /**
     * Regista uma resposta para a questão na sessão activa.
     */
    public synchronized void recordAnswer(Question question, String selectedOption) {
        if (question == null) return;
        int index = -1;
        for (int i = 0; i < sessionQuestions.size(); i++) {
            if (sessionQuestions.get(i).getId() != null && sessionQuestions.get(i).getId().equals(question.getId())) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            index = sessionQuestions.size();
            sessionQuestions.add(question);
        }
        sessionAnswers.put(index, selectedOption);
    }

    /**
     * Gera o ExamResult consolidado a partir das respostas registadas na sessão.
     */
    public ExamResult generateResult(String examId, String examTitle, String universityName, String subjectName, long timeSpentSeconds) {
        return calculateResult(examId, examTitle, universityName, subjectName, sessionQuestions, sessionAnswers, timeSpentSeconds);
    }

    /**
     * Persiste o resultado do exame localmente.
     */
    public synchronized void saveExamResult(ExamResult result) {
        if (result == null || prefs == null) return;
        List<ExamResult> history = getExamHistory();
        history.add(0, result); // Mais recente no topo
        String json = gson.toJson(history);
        prefs.edit().putString(KEY_RESULTS_HISTORY, json).apply();
    }

    /**
     * Retorna um resultado específico pelo ID.
     */
    public ExamResult getResultById(String resultId) {
        if (resultId == null) return null;
        List<ExamResult> history = getExamHistory();
        for (ExamResult r : history) {
            if (resultId.equals(r.getId())) {
                return r;
            }
        }
        return null;
    }

    /**
     * Retorna a lista com todo o histórico de exames resolvidos.
     */
    public List<ExamResult> getExamHistory() {
        if (prefs == null) return new ArrayList<>();
        String json = prefs.getString(KEY_RESULTS_HISTORY, null);
        if (json == null || json.trim().isEmpty()) {
            return new ArrayList<>();
        }
        try {
            Type listType = new TypeToken<ArrayList<ExamResult>>() {}.getType();
            List<ExamResult> list = gson.fromJson(json, listType);
            return list != null ? list : new ArrayList<>();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    /**
     * Retorna as áreas de atenção com base nos tópicos com maior taxa de erro do histórico recente ou último exame.
     */
    public List<TopicPerformance> getAttentionAreas() {
        List<ExamResult> history = getExamHistory();
        if (history.isEmpty()) return new ArrayList<>();
        // Devolve os tópicos do resultado mais recente ou consolidados
        ExamResult latest = history.get(0);
        if (latest.getAttentionTopics() != null) {
            return latest.getAttentionTopics();
        }
        return new ArrayList<>();
    }

    /**
     * Método estático legado para cálculo de resultado directo com listas.
     */
    public static ExamResult calculateResult(
            String examId,
            String examTitle,
            String universityName,
            String subjectName,
            List<Question> questions,
            Map<Integer, String> userAnswers,
            long timeSpentSeconds) {

        int total = questions != null ? questions.size() : 0;
        int correct = 0;
        int incorrect = 0;
        int unanswered = 0;

        Map<String, int[]> topicStats = new HashMap<>(); // [wrongCount, totalCount]

        for (int i = 0; i < total; i++) {
            Question q = questions.get(i);
            String userAns = userAnswers != null ? userAnswers.get(i) : null;
            String topic = q.getTopico() != null ? q.getTopico() : "Geral";

            int[] stats = topicStats.get(topic);
            if (stats == null) {
                stats = new int[]{0, 0};
                topicStats.put(topic, stats);
            }
            stats[1]++; // Incrementa total de questões do tópico

            String correctOpt = q.getRespostaCorrecta();
            if (correctOpt == null) {
                correctOpt = q.getCorrectOption();
            }

            if (userAns == null || userAns.trim().isEmpty()) {
                unanswered++;
            } else if (userAns.equalsIgnoreCase(correctOpt)) {
                correct++;
            } else {
                incorrect++;
                stats[0]++; // Incrementa erros do tópico
            }
        }

        double percentage = total > 0 ? ((double) correct / total) * 100.0 : 0.0;
        double avgTime = total > 0 ? (double) timeSpentSeconds / total : 0.0;

        // Montar a secção "Áreas que precisam de atenção"
        List<TopicPerformance> attentionTopics = new ArrayList<>();
        for (Map.Entry<String, int[]> entry : topicStats.entrySet()) {
            int wrong = entry.getValue()[0];
            int topicTotal = entry.getValue()[1];
            if (wrong > 0) {
                String tip = "Revise os conceitos e resolva exercícios guiados sobre " + entry.getKey();
                attentionTopics.add(new TopicPerformance(entry.getKey(), subjectName, wrong, topicTotal, tip));
            }
        }

        String resultId = "res_" + System.currentTimeMillis();
        return new ExamResult(
                resultId, examId, examTitle, universityName, subjectName,
                correct, total, percentage, correct, incorrect, unanswered,
                timeSpentSeconds, avgTime, System.currentTimeMillis(), attentionTopics);
    }
}
