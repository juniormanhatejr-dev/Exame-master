package mz.co.examemaster.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class FormatUtils {

    public static String formatDuration(long seconds) {
        long minutes = seconds / 60;
        long remainingSec = seconds % 60;
        if (minutes == 0) {
            return remainingSec + " segundos";
        }
        return String.format(Locale.getDefault(), "%d min %02d s", minutes, remainingSec);
    }

    public static String formatDate(long timestamp) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());
        return sdf.format(new Date(timestamp));
    }

    public static String formatScore(int score, int total) {
        return score + " / " + total;
    }

    public static String formatPercentage(double percentage) {
        return String.format(Locale.getDefault(), "%.0f%%", percentage);
    }
}
