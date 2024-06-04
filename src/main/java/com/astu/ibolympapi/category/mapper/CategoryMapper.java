package com.astu.ibolympapi.category.mapper;

import com.astu.ibolympapi.category.dto.CategoryDTO;
import com.astu.ibolympapi.category.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    List<CategoryDTO> categoryListToCategoryDTOList(List<Category> categoryList);
}
