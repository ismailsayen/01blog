package com.blog.blog.DTO;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
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
        @Size(min = 10, max = 100, message = "The title must be between 10 and 100 characters.")
        private String title;
        @NotNull(message = "The content must not be null or empty.")
        @Size(min = 100, max = 10000, message = "The content must be between 100 and 10000 characters.")
        private String content;
        @NotBlank(message = "Categorie cannot be empty or null")
        private String categorie;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BlogOutput {
        private Long commentsCount;
        private LocalDateTime createdAt;
        private Long id;
        private LocalDateTime lastUpdateAt;
        private Long likeCount;
        private Long userId;
        private String categorie;
        private String content;
        private String title;
        private String userName;
        private String job;
        private String avatar;
        private Boolean liked;
        private Boolean myBlog;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReactionResponse {
        private Long blogId;
        private Boolean status;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DeletionResponse {
        private Long blogId;
        private String action;
    }
}
