package com.vn.portfolio.project.Service;

import com.vn.portfolio.project.Model.Education;
import com.vn.portfolio.project.Repository.EducationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationService {
    @Autowired
    EducationRepo repo;


    public List<Education> getAllEducation(){
        return repo.findAll();
    }

    public Optional<Education> getEducationById(int id){
        return repo.findById(id);
    }

    public Education addNewEducation(Education education) {
        return repo.save(education);
    }

    public void deleteEducationById(int id) {
        repo.deleteById(id);
    }
}
