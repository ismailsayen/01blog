package com.blog.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.auth.repositories.AuthRepository;
import com.blog.user.DTO.UserDTO;
import com.blog.user.DTO.UserInfo;
import com.blog.user.model.UserEntity;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthService implements UserDetailsService {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    private AuthRepository authRepo;
    @Autowired
    @Lazy
    AuthenticationManager authManager;

    public UserEntity saveUser(UserEntity user) {
        user.setPassword(encoder.encode(user.getPassword()));
        authRepo.save(user);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity user = authRepo.findByEmail(email);
        if (user == null) {
            log.info("No user found with email: " + email);
            throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
        }
        return new UserInfo(user);
    }

    
    public String verify(UserDTO.LoginData user) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated())
            return "succed";
        return "fail";
    }

}
