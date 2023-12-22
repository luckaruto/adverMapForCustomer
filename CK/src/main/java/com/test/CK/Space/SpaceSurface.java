package com.test.CK.Space;

import com.test.CK.Surface.Surface;
import jakarta.persistence.*;

@Entity
@Table(name = "space_surfaces")
public class SpaceSurface {
    @EmbeddedId
    private SpaceSurfaceId id;

    @MapsId("spaceId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @MapsId("surfacesId")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "surfaces_id", nullable = false)
    private Surface surfaces;

    public SpaceSurface(SpaceSurfaceId id, Space space, Surface surfaces) {
        this.id = id;
        this.space = space;
        this.surfaces = surfaces;
    }
    public SpaceSurface() {
        this.id = new SpaceSurfaceId();
    }

    public SpaceSurfaceId getId() {
        return id;
    }

    public void setId(SpaceSurfaceId id) {
        this.id = id;
    }

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {

        this.id.setSpaceId(space.getId()); // Assuming getId() returns the spaceId
        this.space = space;
    }

    public Surface getSurfaces() {
        return surfaces;
    }

    public void setSurfaces(Surface surfaces) {
        this.surfaces = surfaces;
    }

}