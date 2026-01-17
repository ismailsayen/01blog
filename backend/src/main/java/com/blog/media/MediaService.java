package com.blog.media;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blog.media.MediaDTO.MediaResponse;
import com.cloudinary.Cloudinary;

@Service
public class MediaService {
    @Autowired
    Cloudinary cloudinary;

    public ResponseEntity<MediaResponse> saveMedia(MultipartFile file, String oldUrl) throws IOException {
        try {
            String type = file.getContentType();
            String resourceType = (type != null && type.startsWith("video/")) ? "video" : "image";
            Map<String, Object> options = new HashMap<>();
            options.put("resource_type", resourceType);
            options.put("folder", "my_app/media");
            options.put("overwrite", true);
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), options);
            return ResponseEntity.ok(MediaResponse.builder()
                    .OldUrl(oldUrl)
                    .newURL((String) result.get("secure_url"))
                    .build());
        } catch (IOException e) {
            throw e;
        }
    }

}
