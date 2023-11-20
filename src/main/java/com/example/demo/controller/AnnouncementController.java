package com.example.demo.controller;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.entity.AnnouncementEntity;
import com.example.demo.service.AnnouncementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AnnouncementController {
    private final AnnouncementService announcementService;
    private static final Logger logger = LoggerFactory.getLogger(AnnouncementController.class);

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    //공지사항 글쓰기
    @PostMapping("/createAnnouncement")
    public ResponseEntity<AnnouncementDto> createAnnouncement(@RequestBody AnnouncementDto announcementDto) {
        logger.info("Received a request to create announcement.");
        AnnouncementDto createdAnnouncement = announcementService.createAnnouncement(announcementDto);
        return new ResponseEntity<>(createdAnnouncement, HttpStatus.CREATED);

    }

    //글 목록 불러오기
    @GetMapping("/announcements")
    public List<AnnouncementDto> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    //상세글
    @GetMapping("/announcements/{annoId}")
    public ResponseEntity<AnnouncementDto> getAnnouncementById(@PathVariable int annoId) {
        try {
            AnnouncementDto announcement = announcementService.getAnnouncementById(annoId);
            if (announcement != null) {
                return new ResponseEntity<>(announcement, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("공지사항을 검색하는 중에 오류가 발생했습니다", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //조회수
    @PutMapping("/announcements/{annoId}/increaseViews")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Void> increaseAnnouncementViews(@PathVariable int annoId) {
        announcementService.increaseAnnouncementViews(annoId);
        return ResponseEntity.ok().build();
    }

    //삭제 매핑
    @DeleteMapping("/announcements/{annoId}")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable int annoId) {
        try {
            announcementService.deleteAnnouncementById(annoId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.error("공지사항을 삭제하는 중에 오류가 발생했습니다", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // 수정 매핑
    @PutMapping("/announcements/{annoId}")
    public ResponseEntity<AnnouncementDto> modifyAnnouncement(@PathVariable int annoId, @RequestBody AnnouncementDto modifiedData) {
        try {
            AnnouncementEntity modifiedAnnouncement = announcementService.modifyAnnouncementById(annoId, modifiedData);
            AnnouncementDto modifiedAnnouncementDto = announcementService.convertToDto(modifiedAnnouncement);
            return new ResponseEntity<>(modifiedAnnouncementDto, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            logger.error("공지사항을 수정하는 중에 오류가 발생했습니다", e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("공지사항을 수정하는 중에 오류가 발생했습니다", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}