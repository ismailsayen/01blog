package com.blog.user.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.user.DTO.UserDTO.ProfileOutput;
import com.blog.user.DTO.UserDTO.SearchedUsers;
import com.blog.user.repositories.UserRepository;

@Service
public class UserServices {
    @Autowired
    UserRepository userRepo;

    public ProfileOutput getProfile(Long id, Long sessionId) throws NoSuchElementException {
        Optional<ProfileOutput> user = userRepo.findProfileId(id, sessionId);
        if (!user.isPresent()) {
            throw new NoSuchElementException("No profile Founded with this id");
        }
   
        return user.get();
    }

    public List<SearchedUsers> getProfiles(String name, Long id) {
        return userRepo.findByUserName(name, id);
    }

    public List<SearchedUsers> getSuggestedProfiles(Long id) {

        return userRepo.findSuggestedProfiles(id);
    }
}
