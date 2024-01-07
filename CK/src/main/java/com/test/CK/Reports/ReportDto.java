package com.test.CK.Reports;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


public class ReportDto implements Serializable {
    private  Short id;
    private  String address;
    private  String format;
    private  String name;
    private  LocalDate reportDate;
    private  String content;
    private  String email;
    private  String phone;
    private  ReportState state;
    private  String imgUrl;
    private  String userAddress;
    private  float longitude;
    private  float latitude;

    public ReportDto(Short id, String address, String format, String name, LocalDate reportDate, String content, String email, String phone, ReportState state, String imgUrl, String userAddress) {
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
        this.userAddress = userAddress;
    }

    public ReportDto(){}

    public float getLongitude() {
        return longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setReport(Report report){
        this.id = report.getId();
        this.address = report.getAddress();
        this.format = report.getFormat();
        this.name = report.getName();
        this.reportDate = report.getReportDate();
        this.content = report.getContent();
        this.email = report.getEmail();
        this.phone = report.getPhone();
        this.state = report.getState();
        this.imgUrl = report.getImgUrl();
        this.userAddress = report.getUserAddress();
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public Short getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public String getFormat() {
        return format;
    }

    public String getName() {
        return name;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public String getContent() {
        return content;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public ReportState getState() {
        return state;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getUserAddress() {
        return userAddress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReportDto entity = (ReportDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.address, entity.address) &&
                Objects.equals(this.format, entity.format) &&
                Objects.equals(this.name, entity.name) &&
                Objects.equals(this.reportDate, entity.reportDate) &&
                Objects.equals(this.content, entity.content) &&
                Objects.equals(this.email, entity.email) &&
                Objects.equals(this.phone, entity.phone) &&
                Objects.equals(this.state, entity.state) &&
                Objects.equals(this.imgUrl, entity.imgUrl) &&
                Objects.equals(this.userAddress, entity.userAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, address, format, name, reportDate, content, email, phone, state, imgUrl, userAddress);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "address = " + address + ", " +
                "format = " + format + ", " +
                "name = " + name + ", " +
                "reportDate = " + reportDate + ", " +
                "content = " + content + ", " +
                "email = " + email + ", " +
                "phone = " + phone + ", " +
                "state = " + state + ", " +
                "imgUrl = " + imgUrl + ", " +
                "userAddress = " + userAddress + ")";
    }
}