package com.example.demo.repository;

import com.example.demo.entity.JobprovidersEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitmentRepository extends JpaRepository<JobprovidersEntity, Long> {
    // 여기에 필요한 메서드 추가 (예: findByJobTitle, deleteById 등)

    // 예시: 제목을 기반으로 JobprovidersEntity 검색
    // List<JobprovidersEntity> findByJobTitle(String title);
}