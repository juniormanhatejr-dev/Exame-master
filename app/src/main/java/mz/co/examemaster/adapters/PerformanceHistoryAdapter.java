package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.ExamResult;
import mz.co.examemaster.utils.FormatUtils;

public class PerformanceHistoryAdapter extends RecyclerView.Adapter<PerformanceHistoryAdapter.ViewHolder> {

    private final List<ExamResult> list;

    public PerformanceHistoryAdapter(List<ExamResult> list) {
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_history, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        ExamResult r = list.get(position);
        holder.tvTitle.setText(r.getExamTitle() != null ? r.getExamTitle() : (r.getUniversityName() + " - " + r.getSubjectName()));
        holder.tvPercentage.setText(FormatUtils.formatPercentage(r.getPercentage()));
        holder.tvScore.setText(r.getCorrectCount() + " de " + r.getTotalQuestions() + " correctas (" + FormatUtils.formatDuration(r.getTimeSpentSeconds()) + ")");
        holder.tvDate.setText(FormatUtils.formatDate(r.getTimestamp()));
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvTitle, tvPercentage, tvScore, tvDate;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTitle = itemView.findViewById(R.id.tvHistoryExamTitle);
            tvPercentage = itemView.findViewById(R.id.tvHistoryPercentage);
            tvScore = itemView.findViewById(R.id.tvHistoryScoreFraction);
            tvDate = itemView.findViewById(R.id.tvHistoryDate);
        }
    }
}
