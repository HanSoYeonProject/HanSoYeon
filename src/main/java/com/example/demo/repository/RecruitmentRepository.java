package com.example.demo.repository;

import com.example.demo.entity.RecruitmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentRepository extends JpaRepository<RecruitmentEntity, Integer> {
    // 모든 공지사항 조회
    List<RecruitmentEntity> findAll();
    List<RecruitmentEntity> findByJobProviders(String jobProviders);
}