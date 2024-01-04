package com.test.CK.Reports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Short> {
    public List<Report> findBySurfaceId(Short surfaceId);
    @Query("SELECT r FROM Report r WHERE r.userAddress = :userAddress")
    public List<Report> findByUserAddress(String userAddress);
}
