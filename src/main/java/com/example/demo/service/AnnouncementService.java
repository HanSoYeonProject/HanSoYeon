package com.example.demo.service;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.entity.AnnouncementEntity;
import com.example.demo.repository.AnnouncementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public AnnouncementDto convertToDto(AnnouncementEntity announcement) {
        if (announcement == null) {
            // 예외를 throw하거나, 기본값을 설정하는 등의 처리를 수행할 수 있습니다.
            throw new IllegalArgumentException("Input AnnouncementEntity cannot be null");
        }

        AnnouncementDto announcementDto = new AnnouncementDto();
        announcementDto.setAnno_id(announcement.getAnnoId());
        announcementDto.setAnno_title(announcement.getAnnoTitle());
        announcementDto.setAnno_content(announcement.getAnnoContent());
        announcementDto.setAnno_views(announcement.getAnnoViews());
        announcementDto.setAnno_regist(announcement.getAnnoRegist());

        return announcementDto;
    }


    public AnnouncementDto getAnnouncementById(int annoId) {
        Optional<AnnouncementEntity> announcementOptional = announcementRepository.findById(annoId);
        return announcementOptional.map(this::convertToDto).orElse(null);
    }

    @Transactional
    public void increaseAnnouncementViews(int annoId) {
        AnnouncementEntity announcement = announcementRepository.findById(annoId)
                .orElseThrow(() -> new IllegalArgumentException("Announcement not found with ID: " + annoId));
        announcement.setAnnoViews(announcement.getAnnoViews() + 1);
    }
    //삭제
    @Transactional
    public void deleteAnnouncementById(int annoId) {
        announcementRepository.deleteById(annoId);
    }

    @Transactional
    public AnnouncementEntity modifyAnnouncementById(int annoId, AnnouncementDto modifiedData) {
        AnnouncementEntity announcement = announcementRepository.findById(annoId)
                .orElseThrow(() -> new EntityNotFoundException("해당하는 공지사항이 없습니다."));
        announcement.setAnnoContent(modifiedData.getAnno_content());
        return announcementRepository.save(announcement);
    }

}
