package com.example.demo.controller;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.dto.JobProvidersDto;
import com.example.demo.service.RecruitmentService;
import com.google.api.pathtemplate.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@Slf4j
public class RecruitmentController {
    private final RecruitmentService recruitmentService;
    private static final Logger logger = LoggerFactory.getLogger(RecruitmentController.class);

    @Autowired
    public RecruitmentController(RecruitmentService recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    //글 작성
    @PostMapping("/createRecruitment")
    public ResponseEntity<JobProvidersDto> createJobProviders(@RequestBody JobProvidersDto jobProvidersDto) {
        log.info("Received request to create a new job provider.");
        try {
            JobProvidersDto createdJobProviders = recruitmentService.createJobProviders(jobProvidersDto);
            logger.info("Announcement created successfully.");
            return new ResponseEntity<>(createdJobProviders, HttpStatus.CREATED);
        } catch (ValidationException e) {
            logger.error("Validation error while creating announcement", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            logger.error("Error creating announcement", e);
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //글 목록 불러오기
    @GetMapping("/recruitments")
    public List<JobProvidersDto> getAllJobProviders() {
        return recruitmentService.getAlljobProviders();
    }

    //상세글
    //상세글
    @GetMapping("/recruitments/{Id}")
    public ResponseEntity<JobProvidersDto> getJobProviderById(@PathVariable int Id) {

        try {
            JobProvidersDto jobProviders = recruitmentService.getProvidersById(Id);
            if (jobProviders != null) {
                return new ResponseEntity<>(jobProviders, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("공지사항을 검색하는 중에 오류가 발생했습니다", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/recruitments/byProvider/{provider}")
    public ResponseEntity<List<JobProvidersDto>> getAnnouncementsByProvider(@PathVariable String provider) {
        try {
            List<JobProvidersDto> announcements = recruitmentService.getJobProvidersAnnouncements(provider);
            return new ResponseEntity<>(announcements, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error getting announcements by provider", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/recruitments/{recruitmentId}")
    public ResponseEntity<?> deleteRecruitment(@PathVariable int recruitmentId) {
        try {
            recruitmentService.deleteRecruitmentById(recruitmentId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred while deleting recruitment with id " + recruitmentId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}