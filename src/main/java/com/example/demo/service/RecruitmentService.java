package com.example.demo.service;

import com.example.demo.dto.JobProvidersDto;
import com.example.demo.entity.RecruitmentEntity;
import com.example.demo.repository.RecruitmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecruitmentService {

    private final RecruitmentRepository recruitmentRepository;
    private static final Logger logger = LoggerFactory.getLogger(RecruitmentService.class);

    @Autowired
    public RecruitmentService(RecruitmentRepository recruitmentRepository) {
        this.recruitmentRepository = recruitmentRepository;
    }

    @Transactional
    public JobProvidersDto createJobProviders(JobProvidersDto jobProvidersDto) {
        RecruitmentEntity jobProviders = new RecruitmentEntity();
        jobProviders.setJobTitle(jobProvidersDto.getTitle());
        jobProviders.setJobContent(jobProvidersDto.getContent());
        jobProviders.setJobSecond(jobProvidersDto.getSecond());
        jobProviders.setJobThird(jobProvidersDto.getThird());
        jobProviders.setJobSchedule(jobProvidersDto.getSchedule());
        jobProviders.setJobRegion(jobProvidersDto.getRegion());
        jobProviders.setJobAddress(jobProvidersDto.getAddress());
        jobProviders.setJobProviders(jobProvidersDto.getProviders());
        jobProviders.setJobStartDate(jobProvidersDto.getStartDate());
        jobProviders.setJobEndDate(jobProvidersDto.getEndDate());
        jobProviders.setJobImages(jobProvidersDto.getImage());
        jobProviders.setJobMoney(jobProvidersDto.getMoney());
        jobProviders.setJobMorning(jobProvidersDto.getMorning());
        jobProviders.setJobLunch(jobProvidersDto.getLunch());
        jobProviders.setJobDinner(jobProvidersDto.getDinner());
        jobProviders.setJobBackground(jobProvidersDto.getBackground());
        jobProviders.setJobNeed(jobProvidersDto.getNeed());

        try {
            RecruitmentEntity savedJobProviders = recruitmentRepository.save(jobProviders);
            return convertToDto(savedJobProviders);
        } catch (Exception e) {
            // 예외 처리 로직 추가
            logger.error("Error creating job providers", e);
            throw e; // 예외를 다시 던지거나 적절한 방식으로 처리
        }

    }

    private JobProvidersDto convertToDto(RecruitmentEntity jobProviders) {
        if (jobProviders == null) {
            // 예외를 throw하거나, 기본값을 설정하는 등의 처리를 수행할 수 있습니다.
            throw new IllegalArgumentException("Input JobProvidersEntity cannot be null");
        }

        JobProvidersDto jobProvidersDto = new JobProvidersDto();
        jobProvidersDto.setJob_id(jobProviders.getJobId());
        jobProvidersDto.setTitle(jobProviders.getJobTitle());
        jobProvidersDto.setContent(jobProviders.getJobContent());
        jobProvidersDto.setSecond(jobProviders.getJobSecond());
        jobProvidersDto.setThird(jobProviders.getJobThird());
        jobProvidersDto.setSchedule(jobProviders.getJobSchedule());
        jobProvidersDto.setRegion(jobProviders.getJobRegion());
        jobProvidersDto.setAddress(jobProviders.getJobAddress());
        jobProvidersDto.setProviders(jobProviders.getJobProviders());
        jobProvidersDto.setStartDate(jobProviders.getJobStartDate());
        jobProvidersDto.setEndDate(jobProviders.getJobEndDate());
        jobProvidersDto.setImage(jobProviders.getJobImages());
        jobProvidersDto.setMoney(jobProviders.getJobMoney());
        jobProvidersDto.setNeed(jobProviders.getJobNeed());
        jobProvidersDto.setBackground(jobProviders.getJobBackground());
        jobProvidersDto.setMorning(jobProviders.getJobMorning());
        jobProvidersDto.setLunch(jobProviders.getJobLunch());
        jobProvidersDto.setDinner(jobProviders.getJobDinner());
        return jobProvidersDto;
    }

    //전체 글 목록 불러오기
    public List<JobProvidersDto> getAlljobProviders() {
        return recruitmentRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public JobProvidersDto getProvidersById(int Id) {
        return recruitmentRepository.findById(Id)
                .map(this::convertToDto)
                .orElse(null);
    }
}