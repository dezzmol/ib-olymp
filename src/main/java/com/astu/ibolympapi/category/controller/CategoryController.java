package com.astu.ibolympapi.category.controller;

import com.astu.ibolympapi.category.dto.CategoryDTO;
import com.astu.ibolympapi.category.dto.CreateCategoryDTO;
import com.astu.ibolympapi.category.entity.Category;
import com.astu.ibolympapi.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/olympadmin/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<Category> createCategory(@RequestBody CreateCategoryDTO category) {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
}
