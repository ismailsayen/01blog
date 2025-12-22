package com.blog.report.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

public class ReportDTO {
    @Data
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
}
