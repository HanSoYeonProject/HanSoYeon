package com.example.demo.repository;

import com.example.demo.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    // 기본 CRUD 메서드들이 자동으로 제공됩니다.
}