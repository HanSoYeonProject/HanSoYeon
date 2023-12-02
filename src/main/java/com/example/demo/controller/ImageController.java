package com.example.demo.controller;

import com.example.demo.service.ImageService;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private ImageService imageService;

    @PostMapping("/uploadProfileImage")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("profileImage") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File cannot be empty");
            }
            String imageUrl = imageService.uploadImage(file);
            if (imageUrl != null) {
                return ResponseEntity.ok(new ImageResponse(imageUrl));
            }
        } catch (Exception e) {
            logger.error("Error while processing image upload", e);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/uploadProfileImages")
    public ResponseEntity<?> uploadProfileImages(@RequestParam("profileImages") MultipartFile[] files) {
        try {
            if (files == null || files.length == 0) {
                return ResponseEntity.badRequest().body("Files cannot be empty");
            }

            List<String> imageUrls = new ArrayList<>();
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String imageUrl = imageService.uploadImage(file);
                    if (imageUrl != null) {
                        imageUrls.add(imageUrl);
                    } else {
                        System.out.println("Failed to upload image: " + file.getOriginalFilename());
                    }
                }
            }

            if (!imageUrls.isEmpty()) {
                System.out.println("Image upload successful. URLs: " + imageUrls);
                return ResponseEntity.ok(new MultipleImageResponse(imageUrls));
            } else {
                System.out.println("No valid images uploaded.");
            }
        } catch (Exception e) {
            logger.error("Error while processing image upload", e);
        }
        return ResponseEntity.badRequest().build();
    }

    @Getter
    class ImageResponse {
        private String imageUrl;

        public ImageResponse(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }

    @Getter
    class MultipleImageResponse {
        private List<String> imageUrls;

        public MultipleImageResponse(List<String> imageUrls) {
            this.imageUrls = imageUrls;
        }

        public void setImageUrls(List<String> imageUrls) {
            this.imageUrls = imageUrls;
        }
    }
}