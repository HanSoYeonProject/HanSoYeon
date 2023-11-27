package com.example.demo.repository;

import com.example.demo.entity.MatchingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingRepository extends JpaRepository<MatchingEntity, Integer> {
    boolean existsByRecruitmentJobIdAndUserUserId(int recruitmentId, String userId);

    MatchingEntity findByRecruitmentJobIdAndUserUserId(int recruitmentId, String userId);

}
