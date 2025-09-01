package com.vn.portfolio.project.Service;

import com.vn.portfolio.project.Model.CVFile;
import com.vn.portfolio.project.Repository.CVVFileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class CVFileService {
    private final CVVFileRepo repo;

    public CVFileService(CVVFileRepo repo) {
        this.repo = repo;
    }


    public CVFile saveFile(MultipartFile file) throws IOException {
        if (repo.count() > 0) {
            repo.deleteAll();
        }

        CVFile cvFile = new CVFile();
        cvFile.setFileName(file.getOriginalFilename());
        cvFile.setFileType((file.getContentType()));
        cvFile.setData(file.getBytes());

        return repo.save(cvFile);
    }

    public Optional<CVFile> getLatestCV() {
        return repo.findAll().stream().findFirst();
    }
}
