package com.astu.ibolympapi.tasks.repository;

import com.astu.ibolympapi.tasks.entities.AttachmentForTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentsRepo extends JpaRepository<AttachmentForTask, Long> {
}
