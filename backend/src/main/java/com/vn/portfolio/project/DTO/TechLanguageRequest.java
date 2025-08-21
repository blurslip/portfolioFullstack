package com.vn.portfolio.project.DTO;


public class TechLanguageRequest {
    private String name;
    private String icon;
    private String category;

    public void setName(String name){
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getCategory() {
        return category;
    }



}
