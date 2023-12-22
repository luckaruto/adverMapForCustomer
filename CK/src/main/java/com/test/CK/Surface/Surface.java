package com.test.CK.Surface;

import com.test.CK.Reports.Report;
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


    public Surface() {

    }

    public Surface(Short id, String format, Float width, Float height, String content, String imgUrl, LocalDateTime expiredDate) {
        this.id = id;
        this.format = format;
        this.width = width;
        this.height = height;
        this.content = content;
        this.imgUrl = imgUrl;
        this.expiredDate = expiredDate;
    }

    public void update(Surface surface) {
        this.format = surface.format;
        this.width = surface.width;
        this.height = surface.height;
        this.content = surface.content;
        this.imgUrl = surface.imgUrl;
        this.expiredDate = surface.expiredDate;
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
}
