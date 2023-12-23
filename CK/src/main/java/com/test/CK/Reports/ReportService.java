package com.test.CK.Reports;

import com.test.CK.Surface.Surface;
import com.test.CK.Surface.SurfaceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final SurfaceRepository surfaceRepository;

    public ReportService( ReportRepository reportRepository, SurfaceRepository surfaceRepository) {
        this.reportRepository = reportRepository;
        this.surfaceRepository = surfaceRepository;
    }

    public HttpStatus addReport(Report report,Short surfaceId){
        Optional<Surface> optionalSurface=surfaceRepository.findById(surfaceId);
        if(optionalSurface.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }
        else {
            Surface surface = optionalSurface.get();
            report.setSurface(surface);
            reportRepository.save(report);
            surfaceRepository.save(surface); // Save the updated Surface entity
            return HttpStatus.OK;
        }
    }
    public List<Report> getAll(){
       return reportRepository.findAll();
    }

    public List<Report> getBySurfaceId(Short surfaceId){
        return reportRepository.findBySurfaceId(surfaceId);
    }
}
