package com.blog.auth.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

public class UserDTO {

    @Data
    @Builder
    @AllArgsConstructor
    public static  class LoginData {
        private String email;
        private String password;
    }
}
