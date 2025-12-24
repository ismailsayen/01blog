package com.blog.report.DTO;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ReportDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateReport {
        @NotBlank
        private String reason;
        @NotNull
        private Long targetId;
        @NotBlank
        @Pattern(regexp = "BLOG|COMMENT|PROFILE", message = "targetType must be BLOG, COMMENT or PROFILE")
        private String targetType;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Report {
        private Long id;
        private LocalDateTime reportedAt;
        private String reason;
        private Long targetId;
        private String targetType;
        private Long reportedBy;
        private String userName;
        private String commentContent;
    }

     @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AllReports {
        private Long id;
        private LocalDateTime reportedAt;
        private String reason;
        private Long targetId;
        private String targetType;
        private Long reportedBy;
        private String userName;
    }

}
