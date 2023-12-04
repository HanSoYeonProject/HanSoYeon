package com.example.demo.repository;

import com.example.demo.entity.MatchingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchingRepository extends JpaRepository<MatchingEntity, Integer> {
    boolean existsByRecruitmentJobIdAndUserUserId(int recruitmentId, String userId);

    MatchingEntity findByRecruitmentJobIdAndUserUserId(int recruitmentId, String userId);

    List<MatchingEntity> findAllByRecruitmentJobId(int recruitmentId);

    List<MatchingEntity> findAllByRecruitmentJobIdAndStatus(int recruitmentId, String status);

    List<MatchingEntity> findAllByUserUserId(String userId);

    void deleteAllByRecruitmentJobId(int recruitmentId);
}
