package com.blog.user.DTO;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

public class UserDTO {
    @Data
    @AllArgsConstructor
    public static class SearchedUsers {
        private Long id;
        private String userName;
        private String job;
        private String avatar;
        private Boolean followed;
    }

    @Data
    @AllArgsConstructor
    @Builder
    public static class ProfileOutput {
        private Long id;
        private String userName;
        private String job;
        private String avatar;
        private LocalDateTime createdAt;
        private Long followers;
        private Long following;
        private Boolean followed;
        private Boolean MyAccount;
    }
    @Data
    @AllArgsConstructor
    @Builder
    public static class StatiqueInfo {
        private Long usersCount;  
        private Long blogsCount;
        private Long reportsCount;
    }
}
