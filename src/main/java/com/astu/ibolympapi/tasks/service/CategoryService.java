package com.astu.ibolympapi.tasks.service;

import com.astu.ibolympapi.exceptions.BadRequestException;
import com.astu.ibolympapi.exceptions.enums.ErrorCode;
import com.astu.ibolympapi.tasks.dto.CreateCategoryDTO;
import com.astu.ibolympapi.tasks.entities.Category;
import com.astu.ibolympapi.tasks.repository.CategoryRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
    private final CategoryRepo repo;

    public Category createCategory(CreateCategoryDTO category) {
        Category categoryEntity = Category.builder()
                .name(category.name())
                .description(category.description())
                .build();

        return repo.save(categoryEntity);
    }

    public Category getCategory(Long id) {
        return repo.findById(id).orElseThrow(() -> new BadRequestException(ErrorCode.CATEGORY_NOT_FOUND));
    }
}
