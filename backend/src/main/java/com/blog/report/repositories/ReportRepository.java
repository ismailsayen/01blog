package com.blog.report.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.report.DTO.ReportDTO;
import com.blog.report.DTO.ReportDTO.AllReports;
import com.blog.report.models.ReportEntity;
import com.blog.report.models.ReportTargetType;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    @Query(value = "SELECT DISTINCT p.*, u.user_name FROM reports p INNER JOIN users u ON p.user_id=u.id", nativeQuery = true)
    public Page<AllReports> getNewRports(Pageable pageable);

    @Query(value = "SELECT p.*, u.user_name, c.content  FROM reports p INNER JOIN users u ON p.user_id=u.id  LEFT JOIN comments c ON p.target_type = 'COMMENT' AND p.target_id = c.id where p.id=:id AND p.target_type=:target_type", nativeQuery = true)
    public Optional<ReportDTO.Report> findByIdAndTargetType(@Param("id") Long id,
            @Param("target_type") String target_type);

    public void deleteByTargetIdAndTargetType(Long id, ReportTargetType targetType);

    @Query(value = "SELECT DISTINCT p.*, u.user_name FROM reports p INNER JOIN users u ON p.target_type=:target_type", nativeQuery = true)
    public List<AllReports> findByTargetType(@Param("target_type") String target_type, Pageable pageable);
}
