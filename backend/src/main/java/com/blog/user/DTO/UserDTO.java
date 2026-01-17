package com.blog.user.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

public class UserDTO {
    @Data
    @AllArgsConstructor

    public static class SearchedUsers {
        private Long id;
        private String userName;
        private String job;
        private String avatar;
    }
}
