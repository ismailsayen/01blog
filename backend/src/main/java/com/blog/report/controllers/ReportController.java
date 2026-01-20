package com.blog.report.controllers;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.report.DTO.ReportDTO;
import com.blog.report.DTO.ReportDTO.ReportReponse;
import com.blog.report.models.ReportTargetType;
import com.blog.report.services.ReportService;

import jakarta.validation.Valid;

@RequestMapping("/report")
@RestController
public class ReportController {
    @Autowired
    ReportService reportService;

    @PostMapping
    public ReportReponse addReport(@AuthenticationPrincipal UserInfo auth, @Valid @RequestBody ReportDTO.CreateReport data) {

        return switch (getReportTargetType(data.getTargetType())) {
            case BLOG -> reportService.addBlogReport(auth, data);
            default -> reportService.addProfileReport(auth, data);
        };
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<ReportDTO.AllReports> getNewReports() {
        Sort sort = Sort.by("created_at").descending();
        Pageable pageable = PageRequest.of(0, 10, sort);
        return reportService.getNewReports(pageable);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get")
    public ReportDTO.Report getReport(@RequestParam Long reportId, @RequestParam String reportType)
            throws BadRequestException {
        if (reportId == null || reportType == null ||
                (!reportType.equalsIgnoreCase("BLOG")
                        && !reportType.equalsIgnoreCase("COMMENT")
                        && !reportType.equalsIgnoreCase("PROFILE"))) {
            throw new BadRequestException("Bad Request");
        }

        return reportService.getReport(reportId, getReportTargetType(reportType.toUpperCase()));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/filter")
    public List<ReportDTO.AllReports> getReportByType(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam String reportType)
            throws BadRequestException {

        if (reportType == null ||
                (!reportType.equalsIgnoreCase("BLOG")
                        && !reportType.equalsIgnoreCase("COMMENT")
                        && !reportType.equalsIgnoreCase("PROFILE"))) {
            throw new BadRequestException("Bad Request");
        }
        Sort sort = Sort.by("created_at").descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return reportService.getReportByType(pageable, getReportTargetType(reportType.toUpperCase()));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{reportId}")
    public String deleteReport(@PathVariable Long reportId) {
        return reportService.deleteReport(reportId);
    }

    private ReportTargetType getReportTargetType(String type) {
        return switch (type.toUpperCase()) {
            case "BLOG" -> ReportTargetType.BLOG;
            case "COMMENT" -> ReportTargetType.COMMENT;
            default -> ReportTargetType.PROFILE;

        };
    }
}
