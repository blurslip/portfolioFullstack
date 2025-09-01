package com.vn.portfolio.project.Service;

import com.vn.portfolio.project.Model.Projects;
import com.vn.portfolio.project.Repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo repo;

    public List<Projects> getAllProjects() {
        return repo.findAll();
    }

    public Projects addNewProject(Projects projectName) {
        return repo.save(projectName);
    }

    public void deleteById(int id) {
        repo.deleteById(id);
    }

    public void deleteAll() {
        repo.deleteAll();
    }
}
