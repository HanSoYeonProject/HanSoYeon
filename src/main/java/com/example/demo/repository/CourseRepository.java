package com.example.demo.repository;

import com.example.demo.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Integer> {
    void deleteByCosTitleAndCosUserId(String cosTitle, String cosUserId);
    boolean existsByCosTitleAndCosUserId(String cosTitle, String userId);
    List<CourseEntity> findByCosUserId(String cosUserId);
}
