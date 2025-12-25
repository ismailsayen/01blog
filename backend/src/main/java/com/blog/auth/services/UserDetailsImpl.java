package com.blog.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.blog.auth.DTO.UserInfo;
import com.blog.auth.repositories.UserRepository;
import com.blog.user.model.UserEntity;

@Service
public class UserDetailsImpl implements UserDetailsService {

    @Autowired
    private UserRepository authRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity user = authRepo.findByEmail(email);
        if (user == null) {
            throw new UnsupportedOperationException("Invalid credentials: email or password is incorrect.");
        }
        return new UserInfo(user);
    }
}
