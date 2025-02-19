package com.astu.ibolympapi.tasks.entities;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.category.entity.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "tasks")
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "category_id"))
    private Category category;

    @Column(name = "is_task_for_while")
    private Boolean isTaskForWhile = false;

    @Column(name = "is_detailed_answer")
    private Boolean isDetailedAnswer = false;

    @Column(name = "mark")
    private Integer mark;

    @Column(name = "right_answer")
    private String rightAnswer;

    @Column(name = "complexity")
    private String complexity;

    @Column(name = "extra_points_for_creative_solution")
    private Integer extraPointsForCreativeSolution;

    @ManyToMany(mappedBy = "tasks")
    private List<Olympiad> olympiads;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AttachmentForTask> attachments;
}
