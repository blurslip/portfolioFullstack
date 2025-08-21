package com.vn.portfolio.project.Service;

import com.vn.portfolio.project.Model.Skill;
import com.vn.portfolio.project.Repository.SkillRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {
    @Autowired
    SkillRepo repo;

    public List<Skill> getSkills() {
        return repo.findAll();
    }

    public boolean addSkill(Skill newSkill) {

        if (repo.existsByNameIgnoreCase(newSkill.getName()))
            return false;

        else repo.save(newSkill);
        return true;
    }

    @Transactional
    public boolean deleteSkill(String name) {
        Optional<Skill> skill = repo.findByNameIgnoreCase(name);

        if (((Optional<?>) skill).isPresent()) {
            repo.delete(skill.get());
            return true;
        }
        return false;
    }
    public void deleteAll() {
        repo.deleteAll();
    }
}
