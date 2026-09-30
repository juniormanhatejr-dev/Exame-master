package mz.co.examemaster.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;
import mz.co.examemaster.R;
import mz.co.examemaster.models.University;

public class UniversityAdapter extends RecyclerView.Adapter<UniversityAdapter.ViewHolder> {

    public interface OnUniversityClickListener {
        void onUniversityClick(University university);
    }

    private final List<University> list;
    private final OnUniversityClickListener listener;

    public UniversityAdapter(List<University> list, OnUniversityClickListener listener) {
        this.list = list;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_university, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        University u = list.get(position);
        holder.tvAcronym.setText(u.getAcronym());
        holder.tvName.setText(u.getName());
        holder.tvLocation.setText(u.getLocation());
        holder.tvDescription.setText(u.getDescription());
        holder.tvCoursesCount.setText(u.getCoursesCount() + " cursos disponíveis");

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onUniversityClick(u);
            }
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvAcronym, tvName, tvLocation, tvDescription, tvCoursesCount;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvAcronym = itemView.findViewById(R.id.tvUniversityAcronym);
            tvName = itemView.findViewById(R.id.tvUniversityName);
            tvLocation = itemView.findViewById(R.id.tvUniversityLocation);
            tvDescription = itemView.findViewById(R.id.tvUniversityDescription);
            tvCoursesCount = itemView.findViewById(R.id.tvUniversityCoursesCount);
        }
    }
}
