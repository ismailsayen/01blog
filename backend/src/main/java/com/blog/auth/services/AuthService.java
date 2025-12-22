package com.blog.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.auth.DTO.UserDTO;
import com.blog.auth.Exception.AuthException;
import com.blog.auth.jwt.JwtService;
import com.blog.auth.repositories.AuthRepository;
import com.blog.user.model.UserEntity;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthService {
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private AuthRepository authRepo;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtService jwt;

    public UserDTO.RegisterOutput saveUser(UserDTO.RegisterInput user)  {
            user.setPassword(encoder.encode(user.getPassword()));
            UserEntity entity = UserEntity.builder()
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .userName(user.getUserName())
                    .role("USER")
                    .build();
            authRepo.save(entity);

            UserDTO.RegisterOutput result = UserDTO.RegisterOutput.builder()
                    .id(entity.getId())
                    .email(entity.getEmail())
                    .userName(entity.getUserName())
                    .role(entity.getRole())
                    .createdAt(entity.getCreatedAt())
                    .build();

            return result;
     
    
        }
    

    public String verify(UserDTO.LoginData user) throws AuthenticationException {
        if (user.getEmail() == null || user.getPassword() == null) {
            throw new AuthException("Invalid credentials: email or password is incorrect.");
        }

        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            Long userId = authRepo.findIdByEmail(user.getEmail());
            return jwt.generateToken(userId);
        }
        return "fail";
    }
}
