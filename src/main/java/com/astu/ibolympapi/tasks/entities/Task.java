package com.astu.ibolympapi.tasks.entities;

import com.astu.ibolympapi.olympiads.entities.Olympiad;
import com.astu.ibolympapi.tasks.entities.Category;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "tasks")
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

    @Column(name = "is_open")
    private Boolean isOpen = false;

    @ManyToMany(mappedBy = "tasks")
    private List<Olympiad> olympiads;
}
