package com.vn.portfolio.project.Repository;

import com.vn.portfolio.project.Model.CVFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CVVFileRepo extends JpaRepository<CVFile, Integer> {

}
