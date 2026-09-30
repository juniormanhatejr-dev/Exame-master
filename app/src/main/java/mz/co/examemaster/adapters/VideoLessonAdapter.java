package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.VideoLesson;

public class VideoLessonAdapter extends RecyclerView.Adapter<VideoLessonAdapter.ViewHolder> {

    public interface OnVideoClickListener {
        void onVideoClick(VideoLesson video);
    }

    private final List<VideoLesson> list;
    private final OnVideoClickListener listener;

    public VideoLessonAdapter(List<VideoLesson> list, OnVideoClickListener listener) {
        this.list = list;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_video_lesson, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        VideoLesson v = list.get(position);
        holder.tvSubject.setText(v.getSubject());
        holder.tvTopic.setText(v.getTopic());
        holder.tvDuration.setText("⏱ " + v.getDuration());
        holder.tvTitle.setText(v.getTitle());
        holder.tvDescription.setText(v.getDescription());
        holder.tvInstructor.setText(v.getInstructor() + " • " + v.getUniversityReference());

        holder.itemView.setOnClickListener(view -> {
            if (listener != null) listener.onVideoClick(v);
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvSubject, tvTopic, tvDuration, tvTitle, tvDescription, tvInstructor;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvSubject = itemView.findViewById(R.id.tvVideoSubject);
            tvTopic = itemView.findViewById(R.id.tvVideoTopic);
            tvDuration = itemView.findViewById(R.id.tvVideoDuration);
            tvTitle = itemView.findViewById(R.id.tvVideoTitle);
            tvDescription = itemView.findViewById(R.id.tvVideoDescription);
            tvInstructor = itemView.findViewById(R.id.tvVideoInstructor);
        }
    }
}
