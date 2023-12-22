package com.test.CK.Space;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SpaceSurfaceRepository extends JpaRepository<SpaceSurface, SpaceSurfaceId> {
    @Modifying
    @Transactional
    @Query("DELETE FROM SpaceSurface s WHERE s.id.spaceId = :spaceId AND s.id.surfacesId = :surfaceId")
    void deleteBySpaceIdAndSurfacesId(Short spaceId, Short surfaceId);
}