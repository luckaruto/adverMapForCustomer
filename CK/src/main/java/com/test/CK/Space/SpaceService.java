package com.test.CK.Space;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class SpaceService {
    private final SpaceRepository spaceRepository;

    public SpaceService(SpaceRepository spaceRepository) {
        this.spaceRepository = spaceRepository;
    }

    public List<Space> getAll() {
        return spaceRepository.findAll();
    }
    public Space getById(Short id) {
        if (!spaceRepository.findById(id).isPresent())
            return null;
        return spaceRepository.findById(id).get();
    }

    public HttpStatus deleteById(Short id){
        Optional<Space> spaceOptional=spaceRepository.findById(id);
        if(spaceOptional.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }
        spaceRepository.deleteById(id);
        return HttpStatus.OK;
    }

    public HttpStatus create(Space space){
        spaceRepository.save(space);
        return HttpStatus.OK;
    }

    public HttpStatus editById(Space updatedSpace,Short id){
        Optional<Space> spaceOptional=spaceRepository.findById(id);
        if(spaceOptional.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }
        Space space=spaceOptional.get();
        space.update(updatedSpace);
        spaceRepository.save(space);
        return HttpStatus.OK;
    }
}
