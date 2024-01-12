package com.test.CK.Reports;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;


public interface ReportTypeRepository extends JpaRepository<ReportType, Short>, CrudRepository<ReportType, Short> {

}