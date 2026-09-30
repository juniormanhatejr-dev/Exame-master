package mz.co.examemaster.repositories;

import java.util.List;
import mz.co.examemaster.models.Course;
import mz.co.examemaster.models.Exam;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.models.Question;
import mz.co.examemaster.models.StudyManual;
import mz.co.examemaster.models.Subject;
import mz.co.examemaster.models.University;
import mz.co.examemaster.models.UserProfile;
import mz.co.examemaster.models.VideoLesson;

/**
 * Interface do repositório de dados do Exame Master.
 * Desacopla a camada de apresentação da fonte de dados,
 * permitindo alternar de dados locais para Firebase Firestore sem reescrever as Activities.
 */
public interface IDataRepository {
    List<University> getUniversities();
    University getUniversityById(String id);

    List<Course> getCourses();
    List<Course> getCoursesByUniversity(String universityId);
    Course getCourseById(String courseId);

    List<Subject> getSubjects();
    Subject getSubjectById(String subjectId);

    List<Exam> getExams();
    List<Exam> getExams(String universityId, String subjectId);
    List<Exam> getExamsBySubject(String subjectId);
    Exam getExamById(String examId);

    List<Question> getQuestions();
    List<Question> getQuestionsByExam(String examId);
    List<Question> getQuestionsForExam(String examId);
    List<Question> getQuestionsForSubject(String subjectId, int limit);

    void saveExamResult(ExamResult result);
    List<ExamResult> getExamResultsHistory();
    ExamResult getLastExamResult();

    List<StudyManual> getStudyManuals();
    List<StudyManual> getManuals(String universityId, String courseId, String subjectId);
    StudyManual getManualById(String manualId);

    List<VideoLesson> getVideoLessons();
    List<VideoLesson> getVideoLessons(String subjectId);
    VideoLesson getVideoLessonById(String videoId);

    UserProfile getUserProfile();
    void updateUserProfile(UserProfile profile);
}
