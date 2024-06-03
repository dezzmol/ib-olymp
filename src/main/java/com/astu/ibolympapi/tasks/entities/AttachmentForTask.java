package com.astu.ibolympapi.tasks.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Table(name = "attachments_for_tasks")
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class AttachmentForTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "path_to_file", nullable = false, length = 255)
    private String pathToFile;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false, foreignKey = @ForeignKey(name = "task_id"))
    private Task task;
}
