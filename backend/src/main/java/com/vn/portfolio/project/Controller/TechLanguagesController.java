package com.vn.portfolio.project.Controller;

import com.vn.portfolio.project.DTO.TechLanguageRequest;
import com.vn.portfolio.project.Model.TechLanguages;
import com.vn.portfolio.project.Service.TechLanguagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/languages")
public class TechLanguagesController {

    @Autowired
    TechLanguagesService service;

    @GetMapping
    public List<TechLanguages> getAllLang(){
        return service.getAllLang();
    }

    @PostMapping
    public TechLanguages addNewLang(@RequestBody TechLanguageRequest request) {
        return service.addNewLang(request);
    }

    @DeleteMapping("/all")
    public void deleteAll() {
        service.deleteAll();
    }
    @DeleteMapping("/{lang}")
    public ResponseEntity<String> deleteLang(@PathVariable String lang)
    {
       boolean deleted =  service.deleteLang(lang);

       if(!deleted) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
       return  ResponseEntity.ok("Language deleted Successfully");
    }
}
