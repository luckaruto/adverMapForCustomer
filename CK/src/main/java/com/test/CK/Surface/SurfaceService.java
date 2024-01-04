package com.test.CK.Surface;

import com.test.CK.Space.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SurfaceService {
    private final SurfaceRepository surfaceRepository;
    private final SpaceRepository spaceRepository;

    public SurfaceService(SurfaceRepository surfaceRepository, SpaceRepository spaceRepository) {
        this.surfaceRepository = surfaceRepository;
        this.spaceRepository = spaceRepository;

    }

    HttpStatus addToSpace(Short spaceId, Surface surface) {
        Optional<Space> spaceOptional = spaceRepository.findById(spaceId);

        if (spaceOptional.isEmpty()) {
            return HttpStatus.NOT_FOUND;
        } else {
            surface.setSpace(spaceOptional.get());
            surfaceRepository.save(surface);
            return HttpStatus.OK;
        }
    }

    HttpStatus deleteFromSpace(Short spaceId, Short surfaceId) {
        Optional<Space> spaceOptional = spaceRepository.findById(spaceId);
        Optional<Surface> surfaceOptional = surfaceRepository.findById(surfaceId);
        if (spaceOptional.isEmpty() || surfaceOptional.isEmpty()) {
            return HttpStatus.NOT_FOUND;
        } else {
            Surface surface = surfaceOptional.get();
            surface.setSpace(null);
            surfaceRepository.save(surface);
            return HttpStatus.OK;
        }

    }

    Set<Surface> getAllBySpaceId(Short id) {
        Optional<Space> spaceOptional = spaceRepository.findById(id);
        if (spaceOptional.isEmpty()) {
            return null;
        } else {
            Space space = spaceOptional.get();
            return space.getSurfaces();
        }
    }

    public List<Surface> getAll() {
        return surfaceRepository.findAll();
    }

    public Surface getById(Short id) {
        if (!surfaceRepository.findById(id).isPresent())
            return null;
        return surfaceRepository.findById(id).get();
    }

    public HttpStatus deleteById(Short id) {
        Optional<Surface> spaceOptional = surfaceRepository.findById(id);
        if (spaceOptional.isEmpty()) {
            return HttpStatus.NOT_FOUND;
        }
        surfaceRepository.deleteById(id);
        return HttpStatus.OK;
    }

    public HttpStatus create(Surface space) {
        surfaceRepository.save(space);
        return HttpStatus.OK;
    }

    public HttpStatus editById(Surface updatedSurface, Short id) {
        Optional<Surface> surfaceOptional = surfaceRepository.findById(id);
        if (surfaceOptional.isEmpty()) {
            return HttpStatus.NOT_FOUND;
        }
        Surface surface = surfaceOptional.get();
        surface.update(updatedSurface);
        surfaceRepository.save(surface);
        return HttpStatus.OK;
    }
}
