package com.astu.ibolympapi.tasks.mapper;

import com.astu.ibolympapi.tasks.dto.TaskDTO;
import com.astu.ibolympapi.tasks.entities.Task;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDTO taskToTaskDTO(Task task);
    List<TaskDTO> tasksToTaskDTOs(List<Task> tasks);
}
