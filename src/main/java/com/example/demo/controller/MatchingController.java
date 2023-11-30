package com.example.demo.controller;

import com.example.demo.request.RequestRecruitmentRequestBody;
import com.example.demo.response.ResponseBuilder;
import com.example.demo.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@SuppressWarnings("all")
public class MatchingController {

    private final MatchingService matchingService;


    /**
     * [GET] /api/matchings
     * @author WoodyK
     * @apiNote 모든 매칭 조회
     * @return 모든 매칭 목록
     */
    @GetMapping("/matchings")
    public ResponseEntity<?> getAllMatchings() {
        return new ResponseBuilder()
                .serviceResult(matchingService.getAllMatchings())
                .build();
    }

    /**
     * [POST] /api/matchings
     * @author WoodyK
     * @apiNote 매칭 생성, 모집 공고 지원
     * @param reqBody
     * <br>`reqBody.recruitmentId`: 지원하려는 모집 공고 식별자<br>
     * `reqBody.userId`: 지원자의 회원 식별자
     * @see RequestRecruitmentRequestBody
     */
    @PostMapping("/matchings")
    public ResponseEntity<?> requestMatching(@RequestBody RequestRecruitmentRequestBody reqBody){
        return new ResponseBuilder()
                .serviceResult(matchingService.requestRecruitment(reqBody.getRecruitmentId(), reqBody.getUserId()))
                .build();
    }

    /**
     * [DELETE] /api/matchings
     * @author WoodyK
     * @apiNote 매칭 제거, 모집 공고 지원 취소
     * @param reqBody
     * <br>`reqBody.recruitmentId`: 지원하려는 모집 공고 식별자<br>
        `reqBody.userId`: 지원자의 회원 식별자
    * @see RequestRecruitmentRequestBody
     */

    @DeleteMapping("/matchings")
    public ResponseEntity<?> cancelMatching(@RequestBody RequestRecruitmentRequestBody reqBody){

        return new ResponseBuilder()
                .serviceResult(matchingService.cancelRecruitment(reqBody.getRecruitmentId(), reqBody.getUserId()))
                .build();
    }

    /**
     * [PUT] /api/matchings
     * @autor WoodyK
     * @param reqBody
     * <br>`reqBody.recruitmentId`: 지원하려는 모집 공고 식별자<br>
        `reqBody.userId`: 지원자의 회원 식별자
     * @see RequestRecruitmentRequestBody
     */
    @PutMapping("/matchings")
    public ResponseEntity<?> acceptMatching(@RequestBody RequestRecruitmentRequestBody reqBody){

        return new ResponseBuilder()
                .serviceResult(matchingService.acceptRecruitment(reqBody.getRecruitmentId(), reqBody.getUserId()))
                .build();
    }

    /**
     * [GET] /api/matchings/isAccepted?recruitmentId={recruitmentId}&userId={userId}
     * @author WoodyK
     * @param recruitmentId 지원하려는 모집 공고 식별자
     * @param userId 지원자의 회원 식별자
     * @return 성공적으로 수행 시, 매칭 수락 여부를 반환
     */

    @GetMapping("/matchings/isAccepted")
    public ResponseEntity<?> isAccepted(@RequestParam("recruitmentId") int recruitmentId,
                                        @RequestParam("userId") String userId){

        return new ResponseBuilder()
                .serviceResult(matchingService.isMatchingAccepted(recruitmentId, userId))
                .build();
    }

    /**
     * [GET] /api/matchings/recruitments/recruitmentId={userId}&status={status}
     * @author WoodyK
     * @apiNote 공고별 매칭 목록을 조회한다. 매칭 상태를 지정하지 않으면 모든 매칭 목록을 조회하고, 매칭 상태를 지정하면 해당 공고의 매칭 중에서
     * 대응 되는 상태의 매칭 목록을 조회한다.
     * @param recruitmentId 공고 식별자
     * @param status 매칭 상태 (Optional)
     * @return 공고별 매칭 목록
     */
    @GetMapping("/matchings/recruitments/{recruitmentId}")
    public ResponseEntity<?> getMatchingsByRecruitmentId(@PathVariable("recruitmentId") int recruitmentId,
                                                         @RequestParam(value = "status", required = false) String status) {
        return new ResponseBuilder()
                .serviceResult(matchingService.getMatchingsByRecruitmentId(recruitmentId, status))
                .build();
    }

}
