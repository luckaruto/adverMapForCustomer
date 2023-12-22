package com.test.CK.Reports;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Short> {
    public List<Report> findBySurfaceId(Short surfaceId);
}
