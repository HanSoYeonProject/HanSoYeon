package com.example.demo.service;

import org.apache.commons.codec.binary.Base64;
import com.example.demo.entity.JobprovidersEntity;
import com.example.demo.repository.RecruitmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class RecruitmentService {

    @Autowired
    private RecruitmentRepository recruitmentRepository;

    /* jobproviders SELECT */
    public List<JobprovidersEntity> findAllRecruitments() {
        return recruitmentRepository.findAll();
    }

    /* jobproviders INSERT */
    public JobprovidersEntity addRecruitment(String title, String description, String workSchedule, String region, String providers, String money, MultipartFile image) {
        JobprovidersEntity recruitment = new JobprovidersEntity();
        recruitment.setJobTitle(title);
        recruitment.setJobContent(description);
        recruitment.setJobWorkSchedule(workSchedule);
        recruitment.setJobRegion(region);
        recruitment.setJobProviders(providers);
        recruitment.setJobMoney(money);
        recruitment.setJobStartDate(new Date()); // 이 부분은 실제 비즈니스 로직에 맞게 조정 해야함
        recruitment.setJobEndDate(new Date());   // 이 부분도 마찬가지

        // 이미지 처리 로직
        try {
            if (image != null && !image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                String base64Image = Base64.encodeBase64String(imageBytes);
                recruitment.setJobImage(base64Image);
            }
        } catch (IOException e) {
            // 이미지 처리 중 오류 발생 시 예외 처리
            e.printStackTrace(); // 또는 로깅 또는 다른 예외 처리 방법을 선택합니다.
        }

        return recruitmentRepository.save(recruitment);
    }
}