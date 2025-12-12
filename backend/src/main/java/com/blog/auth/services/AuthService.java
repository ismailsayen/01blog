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

    public UserDTO.RegisterData saveUser(UserDTO.RegisterData user) {
        user.setPassword(encoder.encode(user.getPassword()));
        UserEntity entity = UserEntity.builder()
                .email(user.getEmail()).password(user.getPassword())
                .userName(user.getUserName())
                .build();
        authRepo.save(entity);
        return user;
    }

    public String verify(UserDTO.LoginData user) throws AuthenticationException {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            Long userId = authRepo.findIdByEmail(user.getEmail());
            return jwt.generateToken(userId);
        }
        return "fail";
    }

    // private boolean isValidUsername(String userName) {
    // Pattern pattern =
    // Pattern.compile("^(?:[A-Za-z0-9]{3,15}|(?=.{1,20}$)[A-Za-z0-9]+[A-Za-z0-9]+)$");
    // return pattern.matcher(userName).matches();
    // }
}
