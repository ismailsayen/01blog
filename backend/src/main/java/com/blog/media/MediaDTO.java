package com.blog.media;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

public class MediaDTO {
    @Data
    @AllArgsConstructor
    @Builder
    public static class MediaResponse {
        private String OldUrl;
        private String newURL;
    }
}
