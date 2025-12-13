package com.blog.auth.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class UserDTO {

    @Data
    @AllArgsConstructor
    public static class LoginData {

        @Email(message = "Invalid credentials: email or password is incorrect.")
        private String email;
        @NotBlank(message = "Invalid credentials: email or password is incorrect.")
        private String password;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class RegisterInput {
        @NotNull
        @Pattern(regexp = "^(?:[A-Za-z0-9]{3,15}|(?=.{1,20}$)[A-Za-z0-9]+ [A-Za-z0-9]+)$", message = "Username must be more than 3 and less than 20 characters, and must respect the format: Ismai1 | Ismail Sayen0")
        private String userName;
        @Email(message = "Email cannot be empty or null, and you must respect the format: example@example.com")
        private String email;
        @NotBlank
        @Size(min = 8, max = 16, message = "Password should be between 8 and 16 characters")
        private String password;
    }

    @Data
    @AllArgsConstructor
    @Builder
    public static class RegisterOutput {
        private Long id;
        private String userName;
        private String email;
        private LocalDate createdAt;
        private String role;
    }
}
