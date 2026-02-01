package com.blog.notification.DTO;

import lombok.Builder;

@Builder
public record ActionResponse(Long id, Boolean status) {
}
