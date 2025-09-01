package com.vn.portfolio.project.Repository;

import com.vn.portfolio.project.Model.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends JpaRepository<Projects, Integer> {
}
