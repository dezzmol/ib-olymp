package com.astu.ibolympapi.tasks.controller;

import com.astu.ibolympapi.tasks.dto.CreateCategoryDTO;
import com.astu.ibolympapi.tasks.entities.Category;
import com.astu.ibolympapi.tasks.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/olympadmin/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<Category> createCategory(@RequestBody CreateCategoryDTO category) {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }
}
