package com.blog.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.auth.DTO.UserDTO;
import com.blog.auth.jwt.JwtService;
import com.blog.user.model.UserEntity;
import com.blog.user.model.exception.BanneException;
import com.blog.user.repositories.UserRepository;

@Transactional
@Service
public class AuthService {
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private UserRepository authRepo;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtService jwt;

    public UserDTO.UserOutput saveUser(UserDTO.RegisterInput user) {
        user.setPassword(encoder.encode(user.getPassword()));
        UserEntity entity = UserEntity.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .job(user.getJob())
                .userName(user.getUserName())
                .role("ROLE_USER")
                .countfollowers(0L)
                .countfollowing(0L)
                .banned(false)
                .avatar(user.getAvatar())
                .build();
        authRepo.save(entity);

        UserDTO.UserOutput result = UserDTO.UserOutput.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .userName(entity.getUserName())
                .role(entity.getRole())
                .job(entity.getJob())
                .banned(false)
                .createdAt(entity.getCreatedAt())
                .avatar(entity.getAvatar())
                .token(jwt.generateToken(entity.getId()))
                .build();

        return result;

    }

    public UserDTO.UserOutput verify(UserDTO.LoginData user) throws AuthenticationException, BanneException {

        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            UserEntity entity = authRepo.findByEmail(user.getEmail());
            if (entity.getBanned()) {
                throw new BanneException("Your account has been banned.");
            }
            return UserDTO.UserOutput.builder()
                    .id(entity.getId())
                    .email(entity.getEmail())
                    .userName(entity.getUserName())
                    .role(entity.getRole())
                    .banned(entity.getBanned())
                    .avatar(entity.getAvatar())
                    .createdAt(entity.getCreatedAt())
                    .token(jwt.generateToken(entity.getId()))
                    .build();
        }
        return null;
    }
}
