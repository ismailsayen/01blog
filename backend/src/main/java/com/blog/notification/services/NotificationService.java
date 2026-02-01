package com.blog.notification.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog.DTO.BlogDTO.ActionResponse;
import com.blog.follow.repositories.FollowRepository;
import com.blog.notification.DTO.NotifOutput;
import com.blog.notification.models.NotificationEntity;
import com.blog.notification.repositories.NotificationRepositpry;
import com.blog.user.model.UserEntity;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class NotificationService {

    @Autowired
    FollowRepository followRepo;
    @Autowired
    NotificationRepositpry notifRepo;

    public void PostNotfis(UserEntity user) {

        List<UserEntity> followers = followRepo.findFollowers(user.getId());
        for (UserEntity follower : followers) {
            NotificationEntity notif = NotificationEntity.builder()
                    .receiver(follower)
                    .sender(user)
                    .readed(false)
                    .build();
            notifRepo.save(notif);
        }
    }

    public List<NotifOutput> getNotifs(Long id) {
        return notifRepo.findByReceiverId(id);
    }

    public ActionResponse ReadOrUnRead(Long id, Long receiverId) {
        NotificationEntity notif = findNotif(id, receiverId);
        notif.setReaded(!notif.getReaded());
        notifRepo.save(notif);
        return ActionResponse.builder().id(notif.getId()).status(notif.getReaded()).build();
    }

    public void MarkAllAsRead(Long receiverId) {
        List<NotificationEntity> notifs = notifRepo.findAllByReceiverId(receiverId);
        for (NotificationEntity notif : notifs) {
            notif.setReaded(true);
            notifRepo.save(notif);
        }
    }

    public ActionResponse Deletenotif(Long id, Long receiverId) {
        NotificationEntity notif = findNotif(id, receiverId);

        notifRepo.delete(notif);
        return ActionResponse.builder().id(notif.getId()).status(notif.getReaded()).build();
    }

    public void DeleteAll(Long receiverId) {
        List<NotificationEntity> notifs = notifRepo.findAllByReceiverId(receiverId);
        for (NotificationEntity notif : notifs) {
            notifRepo.delete(notif);
        }
    }

    private NotificationEntity findNotif(Long id, Long receiverId) throws NoSuchElementException {
        return notifRepo.findByIdAndReceiverId(id, receiverId)
                .orElseThrow(() -> new NoSuchElementException("Notification Not found"));
    }
}
