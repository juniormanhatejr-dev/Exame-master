package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.Course;

public class CourseAdapter extends RecyclerView.Adapter<CourseAdapter.ViewHolder> {

    public interface OnCourseClickListener {
        void onCourseClick(Course course);
    }

    private final List<Course> list;
    private final OnCourseClickListener listener;

    public CourseAdapter(List<Course> list, OnCourseClickListener listener) {
        this.list = list;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_course, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Course c = list.get(position);
        holder.tvName.setText(c.getName());
        holder.tvFaculty.setText(c.getFaculty() + " • " + c.getDurationYears() + " anos");
        holder.tvDescription.setText(c.getDescription());
        holder.tvExamRequirements.setText("Exames obrigatórios: " + c.getRequiredSubjectIds().size() + " disciplinas");

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onCourseClick(c);
            }
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvFaculty, tvDescription, tvExamRequirements;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvCourseName);
            tvFaculty = itemView.findViewById(R.id.tvCourseFaculty);
            tvDescription = itemView.findViewById(R.id.tvCourseDescription);
            tvExamRequirements = itemView.findViewById(R.id.tvCourseExamRequirements);
        }
    }
}
