package com.vn.portfolio.project.Service;

import com.vn.portfolio.project.DTO.TechLanguageRequest;
import com.vn.portfolio.project.Model.TechCategories;
import com.vn.portfolio.project.Model.TechLanguages;
import com.vn.portfolio.project.Repository.TechCategoriesRepo;
import com.vn.portfolio.project.Repository.TechLanguagesRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TechLanguagesService {

    @Autowired
    private TechLanguagesRepo languagesRepo;

    @Autowired
    private TechCategoriesRepo categoriesRepo;

    public List<TechLanguages> getAllLang() {
        return languagesRepo.findAll();
    }

    public TechLanguages addNewLang(TechLanguageRequest request) {
        TechCategories categories = categoriesRepo.findByCategoryIgnoreCase(request.getCategory()).orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategory()));

        TechLanguages newLang = new TechLanguages(
                request.getName(), request.getIcon(), categories
        );

        return languagesRepo.save(newLang);
    }

    @Transactional
    public boolean deleteLang(String lang){
        Optional<TechLanguages> storedLang = languagesRepo.findByNameIgnoreCase(lang);

        if (storedLang.isPresent()) {
            languagesRepo.delete(storedLang.get());
            return true;
        }
        return false;
    }

    public void deleteAll() {
        languagesRepo.deleteAll();
    }
}
