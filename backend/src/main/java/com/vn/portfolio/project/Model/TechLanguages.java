    package com.vn.portfolio.project.Model;

    import jakarta.persistence.*;

    @Entity
    @Table(name = "tech_languages")
    public class TechLanguages {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        @Column(nullable = false, unique = true)
        private String name;
        private String icon;
        @ManyToOne
        @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
        private TechCategories category;


        public TechLanguages(String name, String icon) {
            this.name = name;
            this.icon = icon;
        }

        public TechLanguages(String name, String icon, TechCategories category) {
            this.name = name;
            this.icon = icon;
            this.category = category;
        }

        public TechLanguages() {
        }

        public TechCategories getCategory() {
            return category;
        }

        public void setCategory(TechCategories category) {
            this.category = category;
        }

        public int getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }


    }
