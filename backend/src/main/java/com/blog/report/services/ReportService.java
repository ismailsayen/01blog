package com.blog.report.services;

import org.springframework.stereotype.Service;

import com.blog.auth.DTO.UserInfo;
import com.blog.report.DTO.ReportDTO;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ReportService {

    public String addBlogReport(UserInfo auth, ReportDTO.CreateReport data) {
        return "blog reported successfully";
    }

    public String addCommentReport(UserInfo auth, ReportDTO.CreateReport data) {
        return "Comment reported successfully";
    }

    public String addProfileReport(UserInfo auth, ReportDTO.CreateReport data) {
        // TODO Auto-generated method stub
        return "Profile reported successfully";
    }

}
