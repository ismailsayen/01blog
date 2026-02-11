package com.blog.media;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.coyote.BadRequestException;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blog.media.MediaDTO.MediaResponse;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;

@Service
public class MediaService {

    @Autowired
    Cloudinary cloudinary;
    protected static final List<String> ALLOWED_TYPES = List.of("image/png", "image/jpeg", "image/webp", "image/gif",
            "image/avif", "video/mp4", "video/webm", "video/ogg");

    public ResponseEntity<MediaResponse> saveMedia(MultipartFile file, String oldUrl) throws Exception {

        Tika tika = new Tika();
        String type;

        type = tika.detect(file.getBytes());
        if (type == null || ALLOWED_TYPES.stream().noneMatch(t -> t.equalsIgnoreCase(type))) {
            throw new BadRequestException("Invalid Types");
        }

        boolean isVideo = type.startsWith("video/");

        try {
            String resourceType = isVideo ? "video" : "image";

            Map<String, Object> options = new HashMap<>();
            options.put("resource_type", resourceType);
            options.put("folder", "my_app/media");
            options.put("overwrite", true);
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), options);

            String publicId = (String) result.get("public_id");

            String optimizedUrl;
            if (isVideo) {
                optimizedUrl = cloudinary.url()
                        .secure(true)
                        .resourceType("video")
                        .transformation(new Transformation()
                                .quality("auto")
                                .fetchFormat("auto"))
                        .generate(publicId);
            } else {
                optimizedUrl = cloudinary.url()
                        .secure(true)
                        .resourceType("image")
                        .transformation(new Transformation()
                                .width(300).height(300).crop("fill")
                                .quality("auto")
                                .fetchFormat("auto"))
                        .generate(publicId);
            }

            return ResponseEntity.ok(
                    MediaResponse.builder()
                            .OldUrl(oldUrl)
                            .newURL(optimizedUrl)
                            .build());

        } catch (IOException e) {
            throw e;
        }
    }
}
