package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.Subject;

public class SubjectAdapter extends RecyclerView.Adapter<SubjectAdapter.ViewHolder> {

    public interface OnSubjectClickListener {
        void onSubjectClick(Subject subject);
    }

    private final List<Subject> list;
    private final OnSubjectClickListener listener;

    public SubjectAdapter(List<Subject> list, OnSubjectClickListener listener) {
        this.list = list;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_subject, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Subject s = list.get(position);
        holder.tvCode.setText(s.getCode());
        holder.tvName.setText(s.getName());
        holder.tvDescription.setText(s.getDescription());
        holder.tvQuestionCount.setText(s.getQuestionsCount() + " questões de demonstração disponíveis");

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onSubjectClick(s);
            }
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvCode, tvName, tvDescription, tvQuestionCount;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvCode = itemView.findViewById(R.id.tvSubjectCode);
            tvName = itemView.findViewById(R.id.tvSubjectName);
            tvDescription = itemView.findViewById(R.id.tvSubjectDescription);
            tvQuestionCount = itemView.findViewById(R.id.tvSubjectQuestionCount);
        }
    }
}
