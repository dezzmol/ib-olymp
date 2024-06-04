package com.astu.ibolympapi.tasks.mapper;

import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.entities.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDTO taskToTaskDTO(Task task);
}
