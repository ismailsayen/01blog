package com.blog.report.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.blog.auth.DTO.UserInfo;
import com.blog.auth.repositories.AuthRepository;
import com.blog.blog.models.BlogEntity;
import com.blog.blog.services.BlogService;
import com.blog.comment.models.CommentEntity;
import com.blog.comment.services.CommentService;
import com.blog.report.DTO.ReportDTO;
import com.blog.report.models.ReportEntity;
import com.blog.report.models.ReportTargetType;
import com.blog.report.repositories.ReportRepository;
import com.blog.user.model.UserEntity;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ReportService {
    @Autowired
    ReportRepository reportRepo;
    @Autowired
    BlogService blgService;
    @Autowired
    CommentService cmntService;
    @Autowired
    AuthRepository userRepo;

    public String addBlogReport(UserInfo auth, ReportDTO.CreateReport data) {
        BlogEntity blog = blgService.getBlogById(data.getTargetId());
        ReportEntity report = ReportEntity.builder()
                .reason(data.getReason())
                .targetId(blog.getId())
                .targetType(ReportTargetType.BLOG)
                .userReported(auth.getUser())
                .build();
        reportRepo.save(report);
        return "blog reported successfully";
    }

    public String addCommentReport(UserInfo auth, ReportDTO.CreateReport data) {
        CommentEntity cmntEntity = cmntService.getComment(data.getTargetId());
        ReportEntity report = ReportEntity.builder()
                .reason(data.getReason())
                .targetId(cmntEntity.getId())
                .targetType(ReportTargetType.COMMENT)
                .userReported(auth.getUser())
                .build();
        reportRepo.save(report);
        return "Comment reported successfully";
    }

    public String addProfileReport(UserInfo auth, ReportDTO.CreateReport data) {
        UserEntity userEntity = userRepo.findById(data.getTargetId())
                .orElseThrow(() -> new NoSuchElementException("No comment found."));
        ReportEntity report = ReportEntity.builder()
                .reason(data.getReason())
                .targetId(userEntity.getId())
                .targetType(ReportTargetType.PROFILE)
                .userReported(auth.getUser())
                .build();
        reportRepo.save(report);
        return "Profile reported successfully";
    }

    public List<ReportDTO.AllReports> getNewReports(Pageable pageable) {

        return reportRepo.getNewRports(pageable).toList();
    }

    public ReportDTO.Report getReport(Long reportId, ReportTargetType reportTargetType) {
        return getReportByIdAndType(reportId, reportTargetType);
    }

    public ReportDTO.Report getReportByIdAndType(Long id, ReportTargetType reportTargetType) throws NoSuchElementException {
        return reportRepo.findByIdAndTargetType(id, reportTargetType.toString())
                .orElseThrow(() -> new NoSuchElementException("Report not found."));
    }
}
