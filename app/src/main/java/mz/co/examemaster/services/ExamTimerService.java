package mz.co.examemaster.services;

import android.os.CountDownTimer;

/**
 * Serviço gerenciador do cronómetro para exames e simulados cronometrados.
 * Suporta contagem precisa em segundos e minutos.
 */
public class ExamTimerService {

    public interface TimerListener {
        void onTick(long millisUntilFinished, int elapsedSeconds);
        void onFinish();
    }

    private CountDownTimer countDownTimer;
    private long totalDurationMillis;
    private long timeRemainingMillis;
    private boolean isRunning;
    private TimerListener listener;

    /**
     * Construtor que recebe a duração total em segundos.
     */
    public ExamTimerService(int durationSeconds, TimerListener listener) {
        this.totalDurationMillis = (long) durationSeconds * 1000L;
        this.timeRemainingMillis = totalDurationMillis;
        this.listener = listener;
    }

    /**
     * Sobrecarga de conveniência que recebe a duração em minutos.
     */
    public ExamTimerService(long durationMinutes, TimerListener listener, boolean isMinutes) {
        this.totalDurationMillis = isMinutes ? durationMinutes * 60L * 1000L : durationMinutes * 1000L;
        this.timeRemainingMillis = totalDurationMillis;
        this.listener = listener;
    }

    public void start() {
        if (isRunning) return;

        countDownTimer = new CountDownTimer(timeRemainingMillis, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                timeRemainingMillis = millisUntilFinished;
                if (listener != null) {
                    listener.onTick(millisUntilFinished, getElapsedSeconds());
                }
            }

            @Override
            public void onFinish() {
                isRunning = false;
                timeRemainingMillis = 0;
                if (listener != null) {
                    listener.onFinish();
                }
            }
        }.start();

        isRunning = true;
    }

    public void stop() {
        if (countDownTimer != null) {
            countDownTimer.cancel();
        }
        isRunning = false;
    }

    public long getTimeSpentMillis() {
        return totalDurationMillis - timeRemainingMillis;
    }

    /**
     * Retorna os segundos decorridos (tempo gasto).
     */
    public int getElapsedSeconds() {
        return (int) (getTimeSpentMillis() / 1000L);
    }

    /**
     * Alias de compatibilidade com versões anteriores.
     */
    public long getTimeSpentSeconds() {
        return getTimeSpentMillis() / 1000L;
    }

    public static String formatTime(long millis) {
        long totalSeconds = millis / 1000;
        long minutes = totalSeconds / 60;
        long seconds = totalSeconds % 60;
        return String.format("%02d:%02d", minutes, seconds);
    }

    public boolean isRunning() {
        return isRunning;
    }
}
