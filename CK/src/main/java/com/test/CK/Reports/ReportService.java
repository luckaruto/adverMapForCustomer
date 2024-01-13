package com.test.CK.Reports;

import com.test.CK.Space.Space;
import com.test.CK.Surface.Surface;
import com.test.CK.Surface.SurfaceRepository;
import com.test.CK.Ward.Ward;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final SurfaceRepository surfaceRepository;

    private final ReportTypeRepository reportTypeRepository;

    public ReportService(ReportRepository reportRepository, SurfaceRepository surfaceRepository, ReportTypeRepository reportTypeRepository) {
        this.reportRepository = reportRepository;
        this.surfaceRepository = surfaceRepository;
        this.reportTypeRepository = reportTypeRepository;
    }

    public HttpStatus addReport(Report report,Short surfaceId){
        Optional<Surface> optionalSurface=surfaceRepository.findById(surfaceId);
        if(optionalSurface.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }
        else {
            Surface surface = optionalSurface.get();

            var space = surface.getSpace();

            Short wardId = null;
            if (space != null){
                wardId = space.getWard();
                report.setWard(new Ward(wardId));
            }

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

    public List<ReportDto> getByUserAddress(String userAddress) {
        List<Report> reports = reportRepository.findByUserAddress(userAddress);
        List<ReportDto> result = new ArrayList<>();

        for (Report report : reports) {
            result.add(report.toDto());
        }

        return result;
    }

    public List<ReportType> findAllReportType(){
        return reportTypeRepository.findAll();
    }
}
