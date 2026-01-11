package com.blog.user.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.blog.user.DTO.UserDTO.SearchedUsers;
import com.blog.user.model.UserEntity;
import com.blog.user.repositories.UserRepository;

@Service
public class UserServices {
    @Autowired
    UserRepository userRepo;

    public UserEntity getProfile(Long id) {
        return userRepo.findById(id).get();
    }

    public  List<SearchedUsers> getProfiles(Pageable pageable, String name, Long id) {
        return userRepo.findByUserName(pageable,name,id);
    }
}
