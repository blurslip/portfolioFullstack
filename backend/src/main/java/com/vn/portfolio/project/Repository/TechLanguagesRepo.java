package com.vn.portfolio.project.Repository;

import com.vn.portfolio.project.Model.TechLanguages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechLanguagesRepo extends JpaRepository<TechLanguages, Integer> {
    public Optional<TechLanguages> findByNameIgnoreCase(String lang);
}
