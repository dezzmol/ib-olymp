package com.astu.ibolympapi.category.service;

import com.astu.ibolympapi.category.dto.CategoryDTO;
import com.astu.ibolympapi.category.mapper.CategoryMapper;
import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.category.dto.CreateCategoryDTO;
import com.astu.ibolympapi.category.entity.Category;
import com.astu.ibolympapi.category.repository.CategoryRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
    private final CategoryRepo repo;
    private final CategoryMapper mapper;

    public Category createCategory(CreateCategoryDTO category) {
        Category categoryEntity = Category.builder()
                .name(category.name())
                .description(category.description())
                .mark(category.mark())
                .time(category.timeForComplete())
                .extraPoints(category.extraPoints())
                .build();

        return repo.save(categoryEntity);
    }

    public Category getCategory(Long id) {
        return repo.findById(id).orElseThrow(() -> new BadRequestException(ErrorCode.CATEGORY_NOT_FOUND));
    }

    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = repo.findAll();

        return mapper.categoryListToCategoryDTOList(categories);
    }
}
