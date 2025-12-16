package com.blog.blog.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class BlogDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BlogInput {
        @NotNull(message = "The title must not be null or empty.")
        @Size(min = 10, max = 50, message = "The title must be between 10 and 50 characters.")
        private String title;
        @NotNull(message = "The content must not be null or empty.")
        @Size(min = 100, max = 10000, message = "The content must be between 100 and 10000 characters.")
        private String content;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BlogOutput {
        private Long id;
        private Long comments_cout;
        private String content;
        private LocalDate created_at;
        private Long dislikec_out;
        private Long like_cout;
        private String title;
        private Long user_id;
    }
}
