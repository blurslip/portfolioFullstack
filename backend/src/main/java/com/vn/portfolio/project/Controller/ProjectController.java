package com.vn.portfolio.project.Controller;

import com.vn.portfolio.project.Model.Projects;
import com.vn.portfolio.project.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @GetMapping
    public List<Projects> getALlProjects() {
        return service.getAllProjects();
    }

    @PostMapping
    public Projects addNewProject(@RequestBody Projects projectName) {
        return service.addNewProject(projectName);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable int id) {
        service.deleteById(id);
    }
    @DeleteMapping("/delete/all")
    public void deleteAll() {
        service.deleteAll();
    }
}
