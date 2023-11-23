package com.example.demo.repository;

import com.example.demo.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Integer> {
    void deleteByCosTitle(String cosTitle);
    boolean existsByCosTitleAndCosUserId(String cosTitle, String userId);
}