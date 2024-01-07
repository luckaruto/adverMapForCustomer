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
    @Enumerated(EnumType.STRING)
    private SurfaceFormat format;

    @Column
    @NotNull(message = "width is not null")
    private Short width;

    @Column
    @NotNull(message = "height is not null")
    private Short height;

    @Column(columnDefinition="TEXT")
    @NotNull(message = "Content is not null")
    private String content;

    @Column(columnDefinition="TEXT")
    @NotNull(message = "imgUrl is not null")
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;

    @OneToMany(mappedBy = "surface")
    private List<Report> reports;

    @Column(updatable = true)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column()
    @NotNull(message = "expiredDate is not null")
    private LocalDateTime expiredDate;

    public Surface() {

    }


    public Surface(Short id, SurfaceFormat format, Short width, Short height, String content, String imgUrl, Space space, List<Report> reports, LocalDateTime expiredDate) {

        this.id = id;
        this.format = format;
        this.width = width;
        this.height = height;
        this.content = content;
        this.imgUrl = imgUrl;
        this.space = space;
        this.reports = reports;
        this.expiredDate = expiredDate;
    }

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public List<Report> getReports() {
        return reports;
    }


    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public SurfaceFormat getFormat() {
        return format;
    }

    public void setFormat(SurfaceFormat format) {
        this.format = format;
    }

    public Short getWidth() {
        return width;
    }

    public void setWidth(Short width) {
        this.width = width;
    }

    public Short getHeight() {
        return height;
    }

    public void setHeight(Short height) {
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
