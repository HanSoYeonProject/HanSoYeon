package com.example.demo.config;

import com.google.cloud.storage.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Configuration
public class GcsConfig {

    private static final Logger logger = LoggerFactory.getLogger(GcsConfig.class);

    @Value("${gcs.bucket.name}")
    private String bucketName;

    @Autowired
    private Storage storage;

    public String uploadFile(MultipartFile file) throws IOException {
        try {
            String fileName = "profile/" + UUID.randomUUID().toString();
            BlobId blobId = BlobId.of(bucketName, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

            Blob blob = storage.create(blobInfo, file.getBytes());
            if (blob != null) {
                return blob.getMediaLink();
            }
        } catch (Exception e) {
            logger.error("Error while uploading file to GCS", e);
        }
        return null;
    }
}