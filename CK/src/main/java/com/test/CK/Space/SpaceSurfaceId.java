package com.test.CK.Space;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SpaceSurfaceId implements Serializable {
    private static final long serialVersionUID = -707590164467730197L;
    @NotNull
    @Column(name = "space_id", nullable = false)
    private Short spaceId;

    @NotNull
    @Column(name = "surfaces_id", nullable = false)
    private Short surfacesId;

    public Short getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(Short spaceId) {
        this.spaceId = spaceId;
    }

    public Short getSurfacesId() {
        return surfacesId;
    }

    public void setSurfacesId(Short surfacesId) {
        this.surfacesId = surfacesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SpaceSurfaceId entity = (SpaceSurfaceId) o;
        return Objects.equals(this.spaceId, entity.spaceId) &&
                Objects.equals(this.surfacesId, entity.surfacesId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(spaceId, surfacesId);
    }

}