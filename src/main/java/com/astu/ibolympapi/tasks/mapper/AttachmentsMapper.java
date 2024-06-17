package com.astu.ibolympapi.tasks.mapper;

import com.astu.ibolympapi.tasks.dto.AttachmentDTO;
import com.astu.ibolympapi.tasks.entities.AttachmentForTask;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttachmentsMapper {
    AttachmentDTO toAttachmentDTO(AttachmentForTask attachmentForTask);
}
