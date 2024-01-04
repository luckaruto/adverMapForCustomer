package com.test.CK.Space;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.test.CK.Surface.Surface;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "space")
public class Space implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column
    @NotNull(message = "address is not null")
    private String address;
    @Column
    @NotNull(message = "longitude is not null")
    private float longitude;
    @Column
    @NotNull(message = "latitude is not null")

    private float latitude;
    @Column
    @NotNull(message = "type is not null")
    private String type;
    @Column
    @NotNull(message = "format is not null")
    private String format;
    @Column
    private Short ward;

    @Column
    @NotNull(message = "imgUrl is not null")
    private String imgUrl;

    @Column
    @NotNull(message = "isPlanned is not null")
    private boolean isPlanned;

    @Column(updatable = true)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "space")
    @JsonIgnore
    private Set<Surface> surfaces = new LinkedHashSet<>();

    public Space() {
    }

    public Space(Short id, String address, float longitude, float latitude, String type, String format, Short ward,
            String imgUrl, boolean isPlanned, LocalDateTime createdAt, LocalDateTime updatedAt, Set<Surface> surfaces) {
        this.id = id;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.type = type;
        this.format = format;
        this.ward = ward;
        this.imgUrl = imgUrl;
        this.isPlanned = isPlanned;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.surfaces = surfaces;
    }

    public void update(Space updatedSpace) {
        this.address = updatedSpace.address;
        this.longitude = updatedSpace.longitude;
        this.latitude = updatedSpace.latitude;
        this.type = updatedSpace.type;
        this.format = updatedSpace.format;
        this.ward = updatedSpace.ward;
        this.imgUrl = updatedSpace.imgUrl;
        this.isPlanned = updatedSpace.isPlanned;
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

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public Short getWard() {
        return ward;
    }

    public void setWard(Short ward) {
        this.ward = ward;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public boolean isPlanned() {
        return isPlanned;
    }

    public void setPlanned(boolean planned) {
        isPlanned = planned;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Surface> getSurfaces() {
        return surfaces;
    }

    public void setSurfaces(Set<Surface> surfaces) {
        this.surfaces = surfaces;
    }
}
