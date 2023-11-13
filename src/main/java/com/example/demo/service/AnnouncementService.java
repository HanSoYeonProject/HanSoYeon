package com.example.demo.service;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.entity.AnnouncementEntity;
import com.example.demo.repository.AnnouncementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private static final Logger logger = LoggerFactory.getLogger(AnnouncementService.class);
    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @Transactional
    public AnnouncementDto createAnnouncement(AnnouncementDto announcementDto) {
        logger.info("Creating a new announcement.");
        AnnouncementEntity announcement = new AnnouncementEntity();
        announcement.setAnnoTitle(announcementDto.getAnno_title());
        announcement.setAnnoContent(announcementDto.getAnno_content());
        announcement.setAnnoRegist(LocalDateTime.now());
        announcement.setAnnoViews(0);

        AnnouncementEntity savedAnnouncement = announcementRepository.save(announcement);

        return convertToDto(savedAnnouncement);
    }

    public List<AnnouncementDto> getAllAnnouncements() {
        List<AnnouncementEntity> announcements = announcementRepository.findAll();
        List<AnnouncementDto> announcementDtos = new ArrayList<>();

        for (AnnouncementEntity announcement : announcements) {
            AnnouncementDto announcementDto = convertToDto(announcement);
            announcementDtos.add(announcementDto);
        }

        return announcementDtos;
    }

    private AnnouncementDto convertToDto(AnnouncementEntity announcement) {
        AnnouncementDto announcementDto = new AnnouncementDto();
        announcementDto.setAnno_id(announcement.getAnnoId());
        announcementDto.setAnno_title(announcement.getAnnoTitle());
        announcementDto.setAnno_content(announcement.getAnnoContent());
        announcementDto.setAnno_views(announcement.getAnnoViews());
        announcementDto.setAnno_regist(announcement.getAnnoRegist());

        return announcementDto;
    }
}
