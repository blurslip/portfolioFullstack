package com.vn.portfolio.project.Repository;

import com.vn.portfolio.project.Model.TechCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechCategoriesRepo extends JpaRepository<TechCategories, Integer> {
    Optional<TechCategories> findByCategoryIgnoreCase(String category);
    boolean existsByCategoryIgnoreCase(String category);
}

