package com.example.demo.controller;

import com.example.demo.entity.JobprovidersEntity;
import com.example.demo.service.RecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/recruits")
@CrossOrigin(origins = "http://localhost:3000")
public class RecruitmentController {

    @Autowired
    private RecruitmentService recruitmentService;

    /* jobproviders SELECT */
    @GetMapping
    public ResponseEntity<List<JobprovidersEntity>> getAllRecruitments() {
        List<JobprovidersEntity> recruitments = recruitmentService.findAllRecruitments();
        return ResponseEntity.ok(recruitments);
    }

    /* jobproviders INSERT */
    @PostMapping
    public ResponseEntity<JobprovidersEntity> addRecruitment(@RequestParam("title") String title,
                                                             @RequestParam("description") String description,
                                                             @RequestParam("workSchedule") String workSchedule,
                                                             @RequestParam("region") String region,
                                                             @RequestParam("providers") String providers,
                                                             @RequestParam("money") String money,
                                                             @RequestParam("image") MultipartFile image) {
        JobprovidersEntity newRecruitment = recruitmentService.addRecruitment(title, description, workSchedule, region, providers, money, image);
        return ResponseEntity.ok(newRecruitment);
    }
}