package com.blog.report.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.report.DTO.ReportDTO;
import com.blog.report.models.ReportTargetType;
import com.blog.report.services.ReportService;

import jakarta.validation.Valid;

@RequestMapping("/report")
@RestController
public class ReportController {
    @Autowired
    ReportService reportService;

    @PostMapping
    public String addReport(@AuthenticationPrincipal UserInfo auth, @Valid @RequestBody ReportDTO.CreateReport data) {

        return switch (getReportTargetType(data.getTargetType())) {
            case BLOG -> reportService.addBlogReport(auth, data);
            case COMMENT -> reportService.addCommentReport(auth, data);
            default -> reportService.addProfileReport(auth, data);
        };
    }

    private ReportTargetType getReportTargetType(String type) {
        return switch (type.toUpperCase()) {
            case "BLOG" -> ReportTargetType.BLOG;
            case "COMMENT" -> ReportTargetType.COMMENT;
            default -> ReportTargetType.PROFILE;

        };
    }
}
