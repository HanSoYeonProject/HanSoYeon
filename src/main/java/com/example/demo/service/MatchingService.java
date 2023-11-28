package com.example.demo.service;

import com.example.demo.entity.RecruitmentEntity;
import com.example.demo.entity.MatchingEntity;
import com.example.demo.repository.MatchingRepository;
import com.example.demo.repository.RecruitmentRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchingService {

    private final BlacklistService blacklistService;
    private final MatchingRepository matchingRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final UserRepository userRepository;

    public static final String ACCEPTED = "ACCEPTED";
    public static final String REQUESTED = "REQUESTED";

    /**
     * @apiNote 매칭 생성, 사용자가 모집공고에 지원
     * @param userId 지원자의 회원 식별자
     */
    public ServiceResult requestRecruitment(int recruitmentId, String userId){

        var nullableUser = userRepository.findByUserId(userId);
        Optional<RecruitmentEntity> optRecruitment = recruitmentRepository.findById(recruitmentId);

        if (nullableUser == null || optRecruitment.isEmpty()) {
            return new ServiceResult().fail().message("user not found");
        }

        /* 블랙리스트에 등록된 사용자는 지원 불가 */
        if (blacklistService.isUserInBlacklist(userId).isFail()) {
            return new ServiceResult().fail().message("blacklisted user");
        }

        if (matchingRepository.existsByRecruitmentJobIdAndUserUserId(recruitmentId, userId)) {
            return new ServiceResult().fail().message("already requested");
        }

        MatchingEntity.builder()
                .recruitment(optRecruitment.get())
                .user(nullableUser)
                .status(REQUESTED)
                .build();

        return new ServiceResult().success().message("Successfully created");
    }


    /**
     * @apiNote 매칭 제거, 사용자가 모집공고에 지원 취소
     * @param userId 지원자의 회원 식별자
     */
    public ServiceResult cancelRecruitment(int recruitmentId, String userId){
        var nullableUser = userRepository.findByUserId(userId);

        if (nullableUser == null) {
            return new ServiceResult().fail().message("user not found");
        }

        var matching = matchingRepository.findByRecruitmentJobIdAndUserUserId(recruitmentId, userId);

        if (matching != null)
            matchingRepository.delete(matching);

        return new ServiceResult().success().message("Successfully deleted");
    }


    /**
     * @apiNote 매칭 수락
     * @param userId 수락할 지원자의 회원 식별자
     *
     */
    public ServiceResult acceptRecruitment(int recruitmentId, String userId){

        var nullableUser = userRepository.findByUserId(userId);
        var optRecruitment = recruitmentRepository.findById(recruitmentId);

        if (nullableUser == null || optRecruitment.isEmpty()) {
            return new ServiceResult().fail().message("Invalid user or recruitment");
        }

        var matching = matchingRepository.findByRecruitmentJobIdAndUserUserId(recruitmentId, userId);

        if (matching == null){
            return new ServiceResult().fail().message("Matching not found");
        }

        matching.setStatus(ACCEPTED);
        matchingRepository.save(matching);

        return new ServiceResult().success().message("Successfully accepted");
    }

    /**
     * @apiNote 매칭 승인 여부 확인
     * @param recruitmentId 모집 공고 식별자
     * @param userId 회원 식별자
     */
    public ServiceResult isMatchingAccepted(int recruitmentId, String userId){
        var matching = matchingRepository.findByRecruitmentJobIdAndUserUserId(recruitmentId, userId);
        return
                new ServiceResult().success()
                        .message("Successfully checked")
                        .data(matching.getStatus().equals(ACCEPTED));
    }

}
