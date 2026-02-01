package com.blog.notification.DTO;

import java.time.LocalDateTime;

public record NotifOutput(Long id, LocalDateTime createdAt, Boolean readed, String userName, String avatar) {
}
