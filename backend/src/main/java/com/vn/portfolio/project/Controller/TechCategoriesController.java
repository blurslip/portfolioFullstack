package com.vn.portfolio.project.Controller;

import com.vn.portfolio.project.Model.TechCategories;
import com.vn.portfolio.project.Service.TechCategoriesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/categories")
public class TechCategoriesController {

    @Autowired
    TechCategoriesService service;

    @GetMapping
    public List<TechCategories> getAllCategories() {
        return service.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<String> addNewCategory(@Valid @RequestBody TechCategories newCategory) {
        boolean added = service.addNewCategory(newCategory);

        if (!added) return ResponseEntity.status(HttpStatus.CONFLICT).body(newCategory.getCategory());
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory.getCategory());
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable int id) {
        service.deleteById(id);
    }

    @DeleteMapping("/all")
    public void deleteAll() {
        service.deleteAll();
    }

    @DeleteMapping("/{category}")
    public ResponseEntity<String> deleteCategory(@PathVariable String category) {
        boolean deleted = service.deleteCategory(category);

        if (!deleted) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        return ResponseEntity.ok("Category deleted Successfully");
    }
}
