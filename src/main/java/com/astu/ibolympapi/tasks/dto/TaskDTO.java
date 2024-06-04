package com.astu.ibolympapi.tasks.dto;

import com.astu.ibolympapi.tasks.entities.AttachmentForTask;
import com.astu.ibolympapi.category.entity.Category;

import java.util.List;

public record TaskDTO(
        Long id,
        String title,
        String description,
        Category category,
        Boolean isOpen,
        List<AttachmentForTask> attachments
) {
}
