package com.vn.portfolio.project.Controller;

import com.vn.portfolio.project.Model.Skill;
import com.vn.portfolio.project.Service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    SkillService service;

    @GetMapping("/")
    public String display() {
        return "hello";
    }

    @GetMapping
    public List<Skill> getSkills() {
        return service.getSkills();
    }

    @PostMapping
    public ResponseEntity<String> addSkill(@RequestBody Skill newSkill) {
        boolean added = service.addSkill(newSkill);

        if (!added) return ResponseEntity.status(HttpStatus.CONFLICT).body(newSkill.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(newSkill.getName());
    }
    @DeleteMapping("/all")
    public void deleteAll() {
        service.deleteAll();
    }
    @DeleteMapping("{name}")
    public ResponseEntity<String> deleteSkill(@PathVariable String name) {
        boolean deleted = service.deleteSkill(name);

        if (!deleted) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Skill not Found");
        return ResponseEntity.ok("skill deleted successfully");
    }

}
    