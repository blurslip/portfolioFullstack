package com.vn.portfolio.project.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.YearMonth;

@Entity
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String education;
    private String description;
    @Column(nullable = true, unique = true)
    @JsonFormat(pattern = "MMM-yyyy")
    private YearMonth fromDate;
    @JsonFormat(pattern = "MMM-yyyy")
    private YearMonth toDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public YearMonth getFromDate() {
        return fromDate;
    }

    public void setFromDate(YearMonth fromDate) {
        this.fromDate = fromDate;
    }

    public YearMonth getToDate() {
        return toDate;
    }

    public void setToDate(YearMonth toDate) {
        this.toDate = toDate;
    }
}
