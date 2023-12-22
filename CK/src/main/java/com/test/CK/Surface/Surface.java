package com.test.CK.Surface;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.test.CK.Reports.Report;
import com.test.CK.Space.Space;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.w3c.dom.Text;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "surface")
public class Surface implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column
    @NotNull(message = "Format is not null")
    private String format;

    @Column
    @NotNull(message = "width is not null")
    private Float width;

    @Column
    @NotNull(message = "height is not null")
    private Float height;

    @Column
    @NotNull(message = "Content is not null")
    private String content;

    @Column
    @NotNull(message = "imgUrl is not null")
    private String imgUrl;

    @OneToMany(mappedBy = "surface", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports = new ArrayList<>();

    public List<Report> getReports() {
        return reports;
    }

    @Column(updatable = true)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column()
    @NotNull(message = "expiredDate is not null")
    private LocalDateTime expiredDate;

    @ManyToOne(targetEntity = Space.class)
    @JoinColumn(name = "space_id")
    private Space space = new Space();

    public Surface() {

    }

    public Surface(Short id, String format, Float width, Float height, String content, String imgUrl, List<Report> reports, LocalDateTime createdAt, LocalDateTime expiredDate, Space space) {
        this.id = id;
        this.format = format;
        this.width = width;
        this.height = height;
        this.content = content;
        this.imgUrl = imgUrl;
        this.reports = reports;
        this.createdAt = createdAt;
        this.expiredDate = expiredDate;
        this.space = space;
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public Float getWidth() {
        return width;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiredDate() {
        return expiredDate;
    }

    public void setExpiredDate(LocalDateTime expiredDate) {
        this.expiredDate = expiredDate;
    }

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public void update(Surface updatedSurface) {
        this.format = updatedSurface.format;
        this.width = updatedSurface.width;
        this.height = updatedSurface.height;
        this.content = updatedSurface.content;
        this.imgUrl = updatedSurface.imgUrl;
        this.reports = updatedSurface.reports;
        this.expiredDate = updatedSurface.expiredDate;
    }
}
