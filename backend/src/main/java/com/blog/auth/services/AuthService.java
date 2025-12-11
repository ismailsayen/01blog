package com.blog.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.auth.DTO.UserDTO;
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

    public UserEntity saveUser(UserEntity user) {
        user.setPassword(encoder.encode(user.getPassword()));
        authRepo.save(user);
        return user;
    }

    public String verify(UserDTO.LoginData user) throws AuthenticationException {
        Long userId = authRepo.findIdByEmail(user.getEmail());
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwt.generateToken(userId);
        }
        return "fail";
    }

}
