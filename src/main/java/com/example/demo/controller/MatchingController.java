package com.example.demo.controller;

import com.example.demo.RequestBody.RequestRecruitmentRequestBody;
import com.example.demo.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MatchingController {

    private final MatchingService matchingService;

    /**
     * [POST] /matching
     * @apiNote 매칭 생성, 모집 공고 지원
     * @param reqBody - `reqBody.recruitmentId`: 지원하려는 모집 공고 식별자
        `reqBody.userId`: 지원자의 회원 식별자
     * @see RequestRecruitmentRequestBody
     */
    @PostMapping("/matching")
    public ResponseEntity<?> matching(RequestRecruitmentRequestBody reqBody){
        var sr = matchingService.requestRecruitment(reqBody.getRecruitmentId(), reqBody.getUserId());

        return sr.isSuccess() ?
                ResponseEntity.ok().body(sr.getMessage()) :
                ResponseEntity.badRequest().body(sr.getMessage());
    }

    /**
     * [DELETE] /matching
     * @apiNote 매칭 제거, 모집 공고 지원 취소
     * @param reqBody `reqBody.recruitmentId`: 지원하려는 모집 공고 식별자
        `reqBody.userId`: 지원자의 회원 식별자
    * @see RequestRecruitmentRequestBody
     */

    @DeleteMapping("/matching")
    public ResponseEntity<?> cancelMatching(RequestRecruitmentRequestBody reqBody){
        var sr = matchingService.cancelRecruitment(reqBody.getRecruitmentId(), reqBody.getUserId());

        return sr.isSuccess() ?
                ResponseEntity.ok().body(sr.getMessage()) :
                ResponseEntity.badRequest().body(sr.getMessage());
    }

    /**
     * [PUT] /matching
     * @param reqBody `reqBody.recruitmentId`: 지원하려는 모집 공고 식별자
        `reqBody.userId`: 지원자의 회원 식별자
     * @see RequestRecruitmentRequestBody
     */
    @PutMapping("/matching")
    public ResponseEntity<?> acceptMatching(RequestRecruitmentRequestBody reqBody){
        var sr = matchingService.acceptRecruitment(reqBody.getRecruitmentId(), reqBody.getUserId());

        return sr.isSuccess() ?
                ResponseEntity.ok().body(sr.getMessage()) :
                ResponseEntity.badRequest().body(sr.getMessage());
    }

    /**
     * [GET] /matching/isAccepted?recruitmentId={recruitmentId}&userId={userId}
     * @param recruitmentId 지원하려는 모집 공고 식별자
     * @param userId 지원자의 회원 식별자
     * @return 성공적으로 수행 시, 매칭 수락 여부를 반환
     */

    @GetMapping("/matching/isAccepted")
    public ResponseEntity<?> isAccepted(@RequestParam("recruitmentId") int recruitmentId, @RequestParam("userId") String userId){
        var sr = matchingService.isMatchingAccepted(recruitmentId, userId);

        return sr.isSuccess() ?
                ResponseEntity.ok().body(sr.getData()) :
                ResponseEntity.badRequest().body(sr.getMessage());
    }
}
