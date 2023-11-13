package com.example.demo.controller;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.service.AnnouncementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AnnouncementController {
    private final AnnouncementService announcementService;
    private static final Logger logger = LoggerFactory.getLogger(AnnouncementController.class);

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping("/createAnnouncement")
    public AnnouncementDto createAnnouncement(@RequestBody AnnouncementDto announcementDto) {
        logger.info("Received a request to create announcement.");
        return announcementService.createAnnouncement(announcementDto);
    }
    @GetMapping("/announcements")
    public List<AnnouncementDto> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }
}
