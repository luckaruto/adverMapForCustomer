package com.test.CK.Space;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(path = "/api/v1/spaces")
public class SpaceController {
    private final SpaceService service;

    public SpaceController(SpaceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Space>> getAll(){
        List<Space> spaces = service.getAll();
        return new ResponseEntity<>(spaces, HttpStatus.OK);
    }
    @GetMapping(path = "/{id}")
    public ResponseEntity<Space> getById(@PathVariable @Valid Short id){
        Space space=service.getById(id);
        if(space==null){
            return new ResponseEntity<>(space,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(space, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody @Valid Space space){
        HttpStatus status = service.create(space);
        switch (status){
            case OK-> {
                return new ResponseEntity<>("Create Success", status);
            }
            default -> {
                return new ResponseEntity<>("Create Failed",HttpStatus.BAD_REQUEST);
            }
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delete(@PathVariable Short id){
        HttpStatus status = service.deleteById(id);
        switch (status){
            case OK-> {
                return new ResponseEntity<>("Delete Success", status);
            }
            case NOT_FOUND -> {
                return new ResponseEntity<>("Space is not existed", status);
            }
            default -> {
                return new ResponseEntity<>("Delete Failed",HttpStatus.BAD_REQUEST);
            }
        }
    }
    @PutMapping(path = "/{id}")
    public ResponseEntity<String> edit(@PathVariable Short id, @RequestBody @Valid Space updatedSpace){
        HttpStatus status = service.editById(updatedSpace,id);
        switch (status){
            case OK-> {
                return new ResponseEntity<>("Update Success", status);
            }
            case NOT_FOUND -> {
                return new ResponseEntity<>("Space is not existed", status);
            }
            default -> {
                return new ResponseEntity<>("Update Failed",HttpStatus.BAD_REQUEST);
            }
        }
    }
}
