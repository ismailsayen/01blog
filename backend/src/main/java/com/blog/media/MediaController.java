package com.blog.media;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog.media.MediaDTO.MediaResponse;

@RestController
public class MediaController {
    @Autowired
    MediaService mediaService;

    @PostMapping("/uploadMedia")
    public ResponseEntity<MediaResponse> UploadMedia(@RequestParam("file") MultipartFile file,
            @RequestParam("oldUrl") String oldUrl) throws Exception {
        return mediaService.saveMedia(file, oldUrl);
    }

}
