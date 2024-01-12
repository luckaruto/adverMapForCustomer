package com.test.CK.Reports;


import jakarta.persistence.*;

@Entity
@Table(name = "report_type")
public class ReportType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "name")
    private String name;

    public ReportType( ) {

    }

    public ReportType(Short id ) {
        this.id = id;
    }

    public ReportType(Short id, String name) {
        this.id = id;
        this.name = name;
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
