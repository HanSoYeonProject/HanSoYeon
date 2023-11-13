package com.example.demo.repository;

import com.example.demo.entity.AnnouncementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Integer> {
    // 모든 공지사항 조회
    List<AnnouncementEntity> findAll();
}