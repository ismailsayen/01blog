package com.blog.report.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import com.blog.report.DTO.ReportDTO.AllReports;
import com.blog.report.models.ReportEntity;
import com.blog.report.models.ReportTargetType;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
        @Query(value = "SELECT DISTINCT p.resolved AS resolved, p.created_at AS reportedAt, p.id AS id, p.target_id AS targetId, p.user_id AS reportedBy, p.reason AS reason, p.target_type AS targetType, u.user_name FROM reports p INNER JOIN users u ON p.user_id=u.id", nativeQuery = true)
        public Page<AllReports> getNewRports(Pageable pageable);

    public void deleteByTargetIdAndTargetType(Long id, ReportTargetType targetType);

    @Query(value = "SELECT DISTINCT p.resolved AS resolved, p.created_at AS reportedAt, p.id AS id, p.target_id AS targetId, p.user_id AS reportedBy, p.reason AS reason, p.target_type AS targetType, u.user_name FROM reports p INNER JOIN users u ON p.target_type=:target_type", nativeQuery = true)
    public List<AllReports> findByTargetType(@Param("target_type") String target_type, Pageable pageable);

    @Query(value = "SELECT DISTINCT p.resolved AS resolved, p.created_at AS reportedAt, p.id AS id, p.target_id AS targetId, p.user_id AS reportedBy, p.reason AS reason, p.target_type AS targetType, u.user_name FROM reports p INNER JOIN users u ON p.user_id=u.id", nativeQuery = true)
    public Streamable<AllReports> findAllReports();

}
