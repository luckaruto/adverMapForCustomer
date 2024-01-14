package com.test.CK.Space;

import com.test.CK.Ward.Ward;

public class SpaceDto {
    private Short id;
    private String address;
    private Float longitude;
    private Float latitude;
    private String type;
    private String format;
    private String imgUrl;
    private boolean isPlanned;
    private Short ward;
    private Long totalSurface;

    public SpaceDto(Short id, String address, Float longitude, Float latitude, String type, String format, String imgUrl, boolean isPlanned, Short ward, Long totalSurface) {
        this.id = id;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.type = type;
        this.format = format;
        this.imgUrl = imgUrl;
        this.isPlanned = isPlanned;
        this.ward = ward;
        this.totalSurface = totalSurface;
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

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
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

    public Short getWard() {
        return ward;
    }

    public void setWard(Short ward) {
        this.ward = ward;
    }

    public Long getTotalSurface() {
        return totalSurface;
    }

    public void setTotalSurface(Long totalSurface) {
        this.totalSurface = totalSurface;
    }
}
