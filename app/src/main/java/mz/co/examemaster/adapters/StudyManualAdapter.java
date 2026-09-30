package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.StudyManual;

public class StudyManualAdapter extends RecyclerView.Adapter<StudyManualAdapter.ViewHolder> {

    public interface OnManualClickListener {
        void onManualClick(StudyManual manual);
    }

    private final List<StudyManual> list;
    private final OnManualClickListener listener;

    public StudyManualAdapter(List<StudyManual> list, OnManualClickListener listener) {
        this.list = list;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_manual, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        StudyManual m = list.get(position);
        holder.tvHierarchy.setText(m.getUniversityName() + " → " + m.getCourseName() + " → " + m.getSubjectName() + " → " + m.getTopic());
        holder.tvTitle.setText(m.getTitle());
        holder.tvSummary.setText(m.getSummary());
        int chapCount = m.getChapters() != null ? m.getChapters().size() : 0;
        holder.tvChapters.setText(chapCount + " capítulos • " + m.getRelatedExercisesCount() + " exercícios relacionados");

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) listener.onManualClick(m);
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvHierarchy, tvTitle, tvSummary, tvChapters;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvHierarchy = itemView.findViewById(R.id.tvManualItemHierarchy);
            tvTitle = itemView.findViewById(R.id.tvManualItemTitle);
            tvSummary = itemView.findViewById(R.id.tvManualItemSummary);
            tvChapters = itemView.findViewById(R.id.tvManualItemChaptersCount);
        }
    }
}
