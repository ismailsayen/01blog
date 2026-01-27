package com.blog.blog.DTO;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CommentDTO {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {
        @NotNull(message = "blog Id can't be Null.")
        private Long blogId;
        @NotBlank(message = "comment can't be empty or Null")
        @Size(min = 1, max = 1000, message = "Content must be between 1 and 1000 charachters.")
        private String content;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CommentOutput {
        Long blogId;
        LocalDateTime createdAt;
        Long id;
        Long userId;
        String content;
        String userName;
        String avatar;
    }
}
