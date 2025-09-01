package com.vn.portfolio.project.Controller;

import com.vn.portfolio.project.Service.CVFileService;
import jakarta.annotation.Resource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/cv")
public class CVFileController {
    public final CVFileService service;

    public CVFileController(CVFileService cvFileService) {
        this.service = cvFileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCV(@RequestParam("file") MultipartFile file) {
        try {
            if (file.getContentType() == null || !file.getContentType().equals("application/pdf")) {
                return ResponseEntity.badRequest().body("Only PDF file are allowed");
            }
            service.saveFile(file);
            return ResponseEntity.ok("CV uploaded Successfully");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/download")
    public ResponseEntity<ByteArrayResource> downloadCV() {
        return service.getLatestCV()
                .map(cv -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cv.getFileName() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(new ByteArrayResource(cv.getData())))
                .orElse(ResponseEntity.notFound().build());
    }

}
