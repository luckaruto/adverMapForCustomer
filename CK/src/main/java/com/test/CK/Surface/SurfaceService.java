package com.test.CK.Surface;

import com.test.CK.Space.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SurfaceService {
    private final  SurfaceRepository surfaceRepository;
    private final SpaceRepository spaceRepository;
    private final SpaceSurfaceRepository spaceSurfaceRepository;

    public SurfaceService(SurfaceRepository surfaceRepository, SpaceRepository spaceRepository, SpaceSurfaceRepository spaceSurfaceRepository) {
        this.surfaceRepository = surfaceRepository;
        this.spaceRepository = spaceRepository;
        this.spaceSurfaceRepository = spaceSurfaceRepository;
    }
    HttpStatus addToSpace(Short spaceId,Short surfaceId){
        Optional<Space> spaceOptional=spaceRepository.findById(spaceId);
        Optional<Surface> surfaceOptional=surfaceRepository.findById(surfaceId);


        if(spaceOptional.isEmpty() || surfaceOptional.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }else {
            SpaceSurface spaceSurface=new SpaceSurface();
            spaceSurface.setSurfaces(surfaceOptional.get());
            spaceSurface.setSpace(spaceOptional.get());
            spaceSurfaceRepository.save(spaceSurface);
            return HttpStatus.OK;
        }
    }

    HttpStatus deleteFromSpace(Short spaceId,Short surfaceId){
        Optional<Space> spaceOptional=spaceRepository.findById(spaceId);
        Optional<Surface> surfaceOptional=surfaceRepository.findById(surfaceId);
        if(spaceOptional.isEmpty() || surfaceOptional.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }else {
            spaceSurfaceRepository.deleteBySpaceIdAndSurfacesId(spaceId,surfaceId);
            return HttpStatus.OK;
        }
    }
    Set<Surface> getAllBySpaceId(Short id){
        Optional<Space> spaceOptional=spaceRepository.findById(id);
        if(spaceOptional.isEmpty()){
            return null;
        }else {
            Space space=spaceOptional.get();
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

    public HttpStatus deleteById(Short id){
        Optional<Surface> spaceOptional=surfaceRepository.findById(id);
        if(spaceOptional.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }
        surfaceRepository.deleteById(id);
        return HttpStatus.OK;
    }

    public HttpStatus create(Surface space){
        surfaceRepository.save(space);
        return HttpStatus.OK;
    }

    public HttpStatus editById(Surface updatedSurface,Short id){
        Optional<Surface> surfaceOptional=surfaceRepository.findById(id);
        if(surfaceOptional.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }
        Surface surface=surfaceOptional.get();
        surface.update(updatedSurface);
        surfaceRepository.save(surface);
        return HttpStatus.OK;
    }
}
