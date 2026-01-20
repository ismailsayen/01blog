package com.blog.report.DTO;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
        @Pattern(regexp = "BLOG|COMMENT", message = "targetType must be BLOG or PROFILE")
        private String targetType;
    }

    @Data
    @AllArgsConstructor
    @Builder
    public static class ReportReponse {
        private String Message;

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Report {
        private Long id;
        private String reason;
        private LocalDateTime reportedAt;
        private Long targetId;
        private String targetType;
        private Long reportedBy;
        private String userName;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AllReports {
        private Long id;
        private String reason;
        private LocalDateTime reportedAt;
        private Long targetId;
        private String targetType;
        private Long reportedBy;
        private String userName;
    }

}
