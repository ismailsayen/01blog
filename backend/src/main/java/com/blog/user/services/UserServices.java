package com.blog.user.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.user.DTO.UserDTO;
import com.blog.user.DTO.UserDTO.ProfileOutput;
import com.blog.user.DTO.UserDTO.SearchedUsers;
import com.blog.user.DTO.UserDTO.StatiqueInfo;
import com.blog.user.DTO.UserDTO.StatiqueUsers;
import com.blog.user.DTO.UserDTO.UsersData;
import com.blog.user.model.UserEntity;
import com.blog.user.repositories.UserRepository;
import com.cloudinary.api.exceptions.BadRequest;

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

    public UserDTO.StatiqueInfo getStatiques() {
        return userRepo.findStatiques();
    }

    public StatiqueInfo getStatiquesReports() {
        return userRepo.findStatiqueReport();
    }

    public StatiqueUsers getStatiquesUsers() {
        StatiqueUsers statique = userRepo.getStatiqueUsers();
        return statique;
    }

    public  List<UsersData> getAllUsers() {
        
        return userRepo.findAllUsers();
    }

    public UserDTO.ActionResponse BanOrUnbanUser(Long id) throws BadRequest {
         UserEntity user = userRepo.findById(id).orElseThrow(()->new NoSuchElementException("No profile Founded with this id"));
        
        if(user.getRole().equals("ROLE_ADMIN")){
            throw new BadRequest("You cannot ban an admin");
        }
        
        user.setBanned(!user.getBanned());
        userRepo.save(user);

        return UserDTO.ActionResponse.builder().id(user.getId()).status(user.getBanned()).build();
    }

    public UserDTO.ActionResponse DeleteUser(Long id) throws  BadRequest {
        UserEntity user = userRepo.findById(id).orElseThrow(()->new NoSuchElementException("No profile Founded with this id"));
        
        if(user.getRole().equals("ROLE_ADMIN")){
            throw new BadRequest("You cannot delete an admin");
        }
        
        
        userRepo.delete(user);

        return UserDTO.ActionResponse.builder().id(user.getId()).status(user.getBanned()).build();
    }
}
