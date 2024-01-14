package com.test.CK.Reports;

import com.test.CK.Space.Space;
import com.test.CK.Space.SpaceRepository;
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

    private final SpaceRepository spaceRepository;

    private final ReportTypeRepository reportTypeRepository;

    public ReportService(ReportRepository reportRepository, SurfaceRepository surfaceRepository, SpaceRepository spaceRepository, ReportTypeRepository reportTypeRepository) {
        this.reportRepository = reportRepository;
        this.surfaceRepository = surfaceRepository;
        this.spaceRepository = spaceRepository;
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
                if (wardId != null) {
                    report.setWard(new Ward(wardId));
                }
            }

            report.setSurface(surface);
            report.setSpace(null);


            reportRepository.save(report);

            return HttpStatus.OK;
        }
    }

    public HttpStatus addSpaceReport(Report report){
        var space = report.getSpace();
        if (report.getSpace() != null){
            Optional<Space> optionalSpace=spaceRepository.findById(report.getSpace().getId());
            if(optionalSpace.isEmpty()){
                return HttpStatus.NOT_FOUND;
            }
            space = optionalSpace.get();

        }

        var ward = new Ward((short) 1);
        if (space != null){
            var wardId = space.getWard();
            ward = new Ward(wardId);
            report.setWard(ward);
        }


        report.setSurface(null);
        report.setSpace(space);

        if (report.getLongitude() ==null){
            report.setLongitude(space.getLongitude());
        }

        if (report.getLatitude() == null){
            report.setLatitude(space.getLatitude());
        }

        reportRepository.save(report);
        return HttpStatus.OK;

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
