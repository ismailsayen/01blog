package com.blog.auth.services;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

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
        List<String> errors = new ArrayList<>();
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            errors.add("Email cannot be empty or null, and you must respect the format: example@example.com");
        }

        if (!isValidUsername(user.getUserName())) {
            errors.add(
                    "sername must be more than 3 and less than 20 characters, and must respect the format: Ismai1 or Ismail Sayen0.");
        }
        
        user.setPassword(encoder.encode(user.getPassword()));
        authRepo.save(user);
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

    private boolean isValidUsername(String userName) {
        Pattern pattern = Pattern.compile("^(?:[A-Za-z0-9]{3,15}|(?=.{1,20}$)[A-Za-z0-9]+ [A-Za-z0-9]+)$");
        return pattern.matcher(userName).matches();
    }
}
