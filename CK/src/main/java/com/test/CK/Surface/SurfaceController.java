package com.test.CK.Surface;

import com.test.CK.Space.Space;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.GetExchange;

import java.util.List;
import java.util.Set;

@RestController()
@RequestMapping(path = "/api/v1/surfaces")
public class SurfaceController {
    private final SurfaceService service;

    public SurfaceController(SurfaceService surfaceService) {
        this.service = surfaceService;
    }

    @GetMapping(path = "/space/{spaceId}")
    public ResponseEntity<Set<Surface>> getAllBySpaceId(@PathVariable Short spaceId) {
        Set<Surface> result = service.getAllBySpaceId(spaceId);
        if (result == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping
    public ResponseEntity<List<Surface>> getAll() {
        List<Surface> surfaces = service.getAll();
        return new ResponseEntity<>(surfaces, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Surface> getById(@PathVariable @Valid Short id) {
        Surface surface = service.getById(id);
        if (surface == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(surface, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody @Valid Surface surface) {
        HttpStatus status = service.create(surface);
        switch (status) {
            case OK -> {
                return new ResponseEntity<>("Create Success", status);
            }
            default -> {
                return new ResponseEntity<>("Create Failed", HttpStatus.BAD_REQUEST);
            }
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delete(@PathVariable Short id) {
        HttpStatus status = service.deleteById(id);
        switch (status) {
            case OK -> {
                return new ResponseEntity<>("Delete Success", status);
            }
            case NOT_FOUND -> {
                return new ResponseEntity<>("Surface is not existed", status);
            }
            default -> {
                return new ResponseEntity<>("Delete Failed", HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<String> edit(@PathVariable Short id, @RequestBody @Valid Surface updatedSurface) {
        HttpStatus status = service.editById(updatedSurface, id);
        switch (status) {
            case OK -> {
                return new ResponseEntity<>("Update Success", status);
            }
            case NOT_FOUND -> {
                return new ResponseEntity<>("Surface is not existed", status);
            }
            default -> {
                return new ResponseEntity<>("Update Failed", HttpStatus.BAD_REQUEST);
            }
        }
    }

}
