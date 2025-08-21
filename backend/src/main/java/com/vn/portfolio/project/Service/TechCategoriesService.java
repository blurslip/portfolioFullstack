package com.vn.portfolio.project.Service;

import com.vn.portfolio.project.Model.TechCategories;
import com.vn.portfolio.project.Repository.TechCategoriesRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TechCategoriesService {

    @Autowired
    TechCategoriesRepo repo;

    public List<TechCategories> getAllCategories() {
        return repo.findAll();
    }

    public boolean addNewCategory(TechCategories newCategory) {

        if (repo.existsByCategoryIgnoreCase(newCategory.getCategory()))
            return false;
        else repo.save(newCategory);
        return true;
    }

    @Transactional
    public boolean deleteCategory(String category) {
        Optional<TechCategories> storedCategory = repo.findByCategoryIgnoreCase(category);

        if (storedCategory.isPresent()) {
            repo.delete(storedCategory.get());
            return true;
        }
        return false;
    }

    public void deleteById(int id) {
        repo.deleteById(id);
    }

    public void deleteAll() {
        repo.deleteAll();
    }
}
