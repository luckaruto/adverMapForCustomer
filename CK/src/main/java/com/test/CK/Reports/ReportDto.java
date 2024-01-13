package com.test.CK.Reports;

import com.test.CK.Space.Space;
import com.test.CK.Surface.Surface;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


public class ReportDto implements Serializable {
    private  Short id;
    private  String address;
    private  String name;
    private  LocalDate reportDate;
    private  String content;
    private  String email;
    private  String phone;
    private  ReportState state;
    private  String imgUrl;
    private  String userAddress;
    private  Float longitude;
    private  Float latitude;

    private Surface surface;

    private Space space;

    private ReportType reportType;
    public Surface getSurface() {
        return surface;
    }

    public void setSurface(Surface surface) {
        this.surface = surface;
    }

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public ReportDto(Short id, String address, String name, LocalDate reportDate, String content, String email, String phone, ReportState state, String imgUrl, String userAddress, Float longitude,
                     Float latitude, Surface surface, Space space, ReportType reportType) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.reportDate = reportDate;
        this.content = content;
        this.email = email;
        this.phone = phone;
        this.state = state;
        this.imgUrl = imgUrl;
        this.userAddress = userAddress;
        this.longitude = longitude;
        this.latitude = latitude;
        this.surface = surface;
        this.space = space;
        this.reportType =reportType;
    }

    public ReportDto(){}

    public Float getLongitude() {
        return longitude;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setReport(Report report){
        this.id = report.getId();
        this.address = report.getAddress();
        this.name = report.getName();
        this.reportDate = report.getReportDate();
        this.content = report.getContent();
        this.email = report.getEmail();
        this.phone = report.getPhone();
        this.state = report.getState();
        this.imgUrl = report.getImgUrl();
        this.userAddress = report.getUserAddress();
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Short getId() {
        return id;
    }

    public String getAddress() {
        return address;
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
        return Objects.hash(id, address, name, reportDate, content, email, phone, state, imgUrl, userAddress);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "address = " + address + ", " +
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