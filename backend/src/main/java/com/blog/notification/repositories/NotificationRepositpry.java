package com.blog.notification.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.notification.DTO.NotifOutput;
import com.blog.notification.models.NotificationEntity;

@Repository
public interface NotificationRepositpry extends JpaRepository<NotificationEntity, Long> {

    @Query("""
            SELECT n.id, n.createdAt, n.readed, u.userName, u.avatar
            FROM NotificationEntity n
            INNER JOIN UserEntity u ON n.sender.id=u.id
            WHERE n.receiver.id=:id
            """)
    List<NotifOutput> findByReceiverId(@Param("id") Long id);

    Optional<NotificationEntity> findByIdAndReceiverId(Long id, Long receiverId);

    List<NotificationEntity> findAllByReceiverId(Long receiverId);

}
