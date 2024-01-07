package com.test.CK.Reports;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.test.CK.Surface.Surface;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "report")
public class Report implements Serializable {

    static final int[] STATE_VALUES = {-1, 0, 1};
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(columnDefinition="TEXT")
    private String address;

    @Column
    @NotNull(message = "format is not null")
    private String format;

    @Column
    @NotNull(message = "name is not null")
    private String name;

    @Column
    @CreationTimestamp
    private LocalDate reportDate;

    @Column(columnDefinition="TEXT")
    @NotNull(message = "content is not null")
    private String content;

    @Column
    @NotNull(message = "email is not null")
    @Email
    private String email;

    @Column
    @NotNull(message = "phone is not null")
    private String phone;

    @Column
    @Enumerated(EnumType.STRING)
    private ReportState state;

    @Column(columnDefinition="TEXT")
    @NotNull(message = "img url not null")
    private String imgUrl;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "surface_id")
    @JsonIgnore
    private Surface surface;

    @Column
    private String userAddress;


    public Report() {
    }

    public Report(Short id, String address, String format, String name, LocalDate reportDate, String content, String email, String phone, ReportState state, String imgUrl, Surface surface, String userAddress) {
        this.id = id;
        this.address = address;
        this.format = format;
        this.name = name;
        this.reportDate = reportDate;
        this.content = content;
        this.email = email;
        this.phone = phone;
        this.state = state;
        this.imgUrl = imgUrl;
        this.surface = surface;
        this.userAddress = userAddress;

    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public ReportState getState() {
        return state;
    }

    public void setState(ReportState state) {
        this.state = state;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Surface getSurface() {
        return surface;
    }

    public void setSurface(Surface surface) {
        this.surface = surface;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }
}
