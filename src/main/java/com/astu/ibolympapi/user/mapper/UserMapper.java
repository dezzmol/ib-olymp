package com.astu.ibolympapi.user.mapper;

import com.astu.ibolympapi.user.dto.UserDTO;
import com.astu.ibolympapi.user.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toUserDTO(User user);
}
