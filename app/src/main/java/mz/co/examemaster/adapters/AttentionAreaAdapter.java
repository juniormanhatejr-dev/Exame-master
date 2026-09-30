package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.TopicPerformance;

public class AttentionAreaAdapter extends RecyclerView.Adapter<AttentionAreaAdapter.ViewHolder> {

    private final List<TopicPerformance> list;

    public AttentionAreaAdapter(List<TopicPerformance> list) {
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_attention_area, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        TopicPerformance item = list.get(position);
        holder.tvTopicName.setText(item.getTopicName() + " (" + item.getSubjectName() + ")");
        holder.tvErrorCount.setText(item.getWrongCount() + " de " + item.getTotalQuestions() + " erradas");
        holder.tvTip.setText(item.getTip());
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvTopicName, tvErrorCount, tvTip;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTopicName = itemView.findViewById(R.id.tvAttentionTopicName);
            tvErrorCount = itemView.findViewById(R.id.tvAttentionErrorCount);
            tvTip = itemView.findViewById(R.id.tvAttentionTip);
        }
    }
}
