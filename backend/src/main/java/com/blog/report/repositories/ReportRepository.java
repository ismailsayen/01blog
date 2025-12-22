package com.blog.report.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.report.models.ReportEntity;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

}
