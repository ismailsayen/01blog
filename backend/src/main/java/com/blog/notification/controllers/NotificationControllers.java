package com.blog.notification.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.DTO.UserInfo;
import com.blog.blog.DTO.BlogDTO;
import com.blog.notification.DTO.NotifOutput;
import com.blog.notification.services.NotificationService;

@RequestMapping("/notif")
@RestController
public class NotificationControllers {

    @Autowired
    NotificationService notifSevice;

    @GetMapping
    public List<NotifOutput> getMethodName(@AuthenticationPrincipal UserInfo auth) {
        return notifSevice.getNotifs(auth.getId());
    }

    @PatchMapping("/{id}")
    public BlogDTO.ActionResponse updateStatus(@PathVariable Long id, @AuthenticationPrincipal UserInfo auth) {
        return notifSevice.ReadOrUnRead(id, auth.getId());
    }

    @PatchMapping("/markAllAsRead")
    public void MarkAllAsRead(@AuthenticationPrincipal UserInfo auth) {
        notifSevice.MarkAllAsRead(auth.getId());
    }

    @DeleteMapping("/{id}")
    public BlogDTO.ActionResponse Delete(@PathVariable Long id, @AuthenticationPrincipal UserInfo auth) {
        return notifSevice.Deletenotif(id, auth.getId());
    }

    @DeleteMapping("/deleteAll")
    public void DeleteAll(@AuthenticationPrincipal UserInfo auth) {
        notifSevice.DeleteAll(auth.getId());
    }
}
