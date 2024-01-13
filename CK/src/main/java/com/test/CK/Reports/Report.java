package com.test.CK.Reports;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.test.CK.Space.Space;
import com.test.CK.Surface.Surface;
import com.test.CK.Ward.Ward;
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

    @Column(name = "response")
    private String response;

    @ManyToOne
    @JoinColumn(name="ward_id")
    private Ward ward;

    @ManyToOne
    @JoinColumn(name="space_id")
    private Space space;

    @ManyToOne
    @JoinColumn(name="report_type_id")
    private ReportType reportType;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "latitude")
    private Float latitude;
    public Report() {
    }

    public Report(Short id, String address, String name, LocalDate reportDate, String content, String email, String phone, ReportState state, String imgUrl, Surface surface, String userAddress, String response, Ward ward, Space space, ReportType reportType) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.reportDate = reportDate;
        this.content = content;
        this.email = email;
        this.phone = phone;
        this.state = state;
        this.imgUrl = imgUrl;
        this.surface = surface;
        this.userAddress = userAddress;
        this.response = response;
        this.ward = ward;
        this.reportType =reportType;
        this.space = space;

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

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public Ward getWard() {
        return ward;
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

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public ReportDto toDto() {
        float longitudeN = 0;
        if (this.longitude != null) {
            longitudeN = this.longitude;
        } else {
            if (this.space != null) {
                longitudeN = this.space.getLongitude();
            } else {
                if (this.surface != null && this.surface.getSpace() != null) {
                    longitudeN = this.surface.getSpace().getLongitude();
                }
            }
        }
        float latitudeN = 0;
        if (this.latitude != null) {
            latitudeN = this.latitude;
        } else {
            if (this.space != null) {
                latitudeN = this.space.getLatitude();
            }else {
                if (this.surface != null && this.surface.getSpace() != null) {
                    latitudeN = this.surface.getSpace().getLatitude();
                }
            }
        }

        return new ReportDto(id, address,name,reportDate,content,email,phone,state,imgUrl,userAddress,longitudeN,latitudeN,surface,space,reportType);
    }
}
