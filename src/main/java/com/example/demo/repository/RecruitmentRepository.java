package com.example.demo.repository;

import com.example.demo.entity.JobProvidersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentRepository extends JpaRepository<JobProvidersEntity, Integer> {
    // 모든 공지사항 조회
    List<JobProvidersEntity> findAll();
}