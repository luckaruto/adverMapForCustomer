package com.test.CK.Reports;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/reports")

public class ReportController {
    private final ReportService service;

    public ReportController(ReportService service) {
        this.service = service;
    }

    @PostMapping(path = "/{surfaceId}")
    public ResponseEntity<String> addReport(@RequestBody @Valid Report report, @PathVariable Short surfaceId){

        HttpStatus status = service.addReport(report,surfaceId);
        switch (status) {
            case OK -> {
                return new ResponseEntity<>("Create Report Success", status);
            }
            case NOT_FOUND -> {
                return new ResponseEntity<>("Surface is not exist", status);
            }
            default -> {
                return new ResponseEntity<>("Create Report Failed", HttpStatus.BAD_REQUEST);
            }
        }
    }
    @GetMapping
    public ResponseEntity<List<Report>> getAll(){
        List<Report> reports= service.getAll();
        return new ResponseEntity<>(reports,HttpStatus.OK);
    }
    @GetMapping(path = "/{surfaceId}")
    public ResponseEntity<List<Report>> getBySurfaceId(@PathVariable Short surfaceId){
        List<Report> reports=service.getBySurfaceId(surfaceId);
        return new ResponseEntity<>(reports,HttpStatus.OK);
    }
}
