package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.Exam;

public class ExamAdapter extends RecyclerView.Adapter<ExamAdapter.ViewHolder> {

    public interface OnExamActionListener {
        void onStartPractice(Exam exam);
        void onStartTimed(Exam exam);
    }

    private final List<Exam> list;
    private final OnExamActionListener listener;

    public ExamAdapter(List<Exam> list, OnExamActionListener listener) {
        this.list = list;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_exam, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Exam e = list.get(position);
        holder.tvYear.setText(String.valueOf(e.getYear()));
        holder.tvUniversity.setText(e.getUniversityName() + " • " + e.getSubjectName());
        holder.tvTitle.setText(e.getTitle());
        holder.tvMeta.setText(e.getTotalQuestions() + " questões • Duração: " + e.getDurationMinutes() + " minutos");

        holder.btnPractice.setOnClickListener(v -> {
            if (listener != null) listener.onStartPractice(e);
        });

        holder.btnTimed.setOnClickListener(v -> {
            if (listener != null) listener.onStartTimed(e);
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvYear, tvUniversity, tvTitle, tvMeta;
        Button btnPractice, btnTimed;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvYear = itemView.findViewById(R.id.tvExamYearBadge);
            tvUniversity = itemView.findViewById(R.id.tvExamUniversityBadge);
            tvTitle = itemView.findViewById(R.id.tvExamTitle);
            tvMeta = itemView.findViewById(R.id.tvExamMeta);
            btnPractice = itemView.findViewById(R.id.btnStartPractice);
            btnTimed = itemView.findViewById(R.id.btnStartTimed);
        }
    }
}
