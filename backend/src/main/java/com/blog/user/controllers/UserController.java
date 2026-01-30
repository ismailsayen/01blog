package com.blog.user.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.user.DTO.UserDTO;
import com.blog.user.DTO.UserDTO.SearchedUsers;
import com.blog.user.DTO.UserDTO.UsersData;
import com.blog.user.services.UserServices;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServices userServices;

    @GetMapping("/{id}")
    public UserDTO.ProfileOutput getProfile(@PathVariable Long id, @AuthenticationPrincipal UserInfo auth) {
        return userServices.getProfile(id, auth.getId());
    }

    @GetMapping("/search")
    public List<SearchedUsers> getProfiles(@RequestParam String name, @AuthenticationPrincipal UserInfo auth) {
        return userServices.getProfiles(name, auth.getId());
    }

    @GetMapping("/suggested")
    public List<SearchedUsers> getSuggestedProfiles(@AuthenticationPrincipal UserInfo auth) {
        return userServices.getSuggestedProfiles(auth.getId());
    }

    @GetMapping("/admin/statiques")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserDTO.StatiqueInfo getStatiques() {
        return userServices.getStatiques();
    }

    @GetMapping("/admin/statiquesReports")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserDTO.StatiqueInfo getStatiquesReports() {
        return userServices.getStatiquesReports();
    }

    @GetMapping("/admin/statiquesUsers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserDTO.StatiqueUsers getStatiquesUsers() {
        return userServices.getStatiquesUsers();
    }

    @GetMapping("/admin/allUsers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public  List<UsersData> getAllUsers() {
        return userServices.getAllUsers();
    }

}
