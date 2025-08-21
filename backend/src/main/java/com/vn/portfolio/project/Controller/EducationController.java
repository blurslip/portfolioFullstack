package com.vn.portfolio.project.Controller;

import com.vn.portfolio.project.Model.Education;
import com.vn.portfolio.project.Service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping("/api/educations")
public class EducationController {
    @Autowired
    EducationService service;

    @GetMapping
    public List<Education> getAllEducation() {
        return service.getAllEducation();
    }
    @GetMapping("/{id}")
    public Optional<Education> getEducationById(@PathVariable int id) {
        return service.getEducationById(id);
    }

    @PostMapping
    public Education addNewEducation(@RequestBody Education education){
        return service.addNewEducation(education);
    }

    @DeleteMapping("deleteById/{id}")
    public void deleteEducationById(@PathVariable int id){
        service.deleteEducationById(id);
    }
}
