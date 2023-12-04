package com.example.demo.controller;

import com.example.demo.request.DeleteBlacklistRequestBody;
import com.example.demo.response.ResponseBuilder;
import com.example.demo.service.BlacklistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@SuppressWarnings("all")
public class BlacklistController {

    private final BlacklistService blacklistService;

    /**
     * [GET] /api/blacklists
     * @author WoodyK
     * @apiNote 모든 블랙리스트 조회
     */
    @GetMapping("/api/blacklists")
    public ResponseEntity<?> getAllBlacklists() {

        return new ResponseBuilder()
                .serviceResult(blacklistService.getAllBlacklists())
                .build();
    }

    /**
     * [POST] /api/blacklists?providerId={providerId}&userId={userId}
     * @author WoodyK
     * @apiNote 블랙리스트 추가
     * @param providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param userId 블랙 당한 대상의 회원 식별자
     */
    @PostMapping("/api/blacklists")
    public ResponseEntity<?> addBlacklist(@RequestParam("providerId") String providerId,
                                          @RequestParam("userId") String userId){

        return new ResponseBuilder()
                .serviceResult(blacklistService.addBlacklist(providerId, userId))
                .build();
    }

    /**
     * [DELETE] /api/blacklists/{blacklistId}
     * @author WoodyK
     * @apiNote 블랙리스트 식별자로 특정 블랙리스트 항목 삭제
     * @param blacklistId 블랙리스트 식별자
     */
    @DeleteMapping("/api/blacklists/{blacklistId}")
    public ResponseEntity<?> deleteBlacklistById(@PathVariable("blacklistId") int blacklistId) {

        return new ResponseBuilder()
                .serviceResult(blacklistService.deleteBlacklistById(blacklistId))
                .build();
    }

    /**
     * [DELETE] /api/blacklists
     * @author WoodyK
     * @apiNote 기업 회원 식별자와 블랙 당한 사용자 식별자로 특정 블랙리스트 항목 삭제
     * @param reqBody.providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param reqBody.userId 블랙 당한 대상의 회원 식별자
     * @see DeleteBlacklistRequestBody
     */
    @DeleteMapping("/api/blacklists")
    public ResponseEntity<?> deleteBlacklistByProviderIdAndUserId(
            @RequestBody DeleteBlacklistRequestBody reqBody) {

        return new ResponseBuilder()
                .serviceResult(blacklistService.deleteBlacklistByProviderIdAndUserId(reqBody.providerId, reqBody.userId))
                .build();
    }

    /**
     * [GET] /api/blacklists/{blacklistId}
     * @author WoodyK
     * @apiNote 블랙리스트 식별자로 특정 블랙리스트 조회
     * @param blacklistId 블랙리스트 식별자
     */
    @GetMapping("/api/blacklists/{blacklistId}")
    public ResponseEntity<?> getBlacklistByBlacklistId(@PathVariable("blacklistId") int blacklistId) {

        return new ResponseBuilder()
                .serviceResult(blacklistService.getBlacklistByBlacklistId(blacklistId))
                .build();
    }

    /**
     * [GET] /api/blacklists/users?providerId={providerId}
     * @author WoodyK
     * @apiNote 기업 회원 식별자로 기업의 블랙리스트 리스트를 조회
     * @param providerId 자신이 등록한 블랙리스트 목록을 조회하고자 하는 기업 회원의 식별자
     * @see com.example.demo.service.BlacklistService#getBlacklistUserListByProviderId(String)
     */
    @GetMapping("/api/blacklists/users")
    public ResponseEntity<?> getBlacklistsByProviderId(@RequestParam("providerId") String providerId) {

        return new ResponseBuilder()
                .serviceResult(blacklistService.getBlacklistUserListByProviderId(providerId))
                .build();
    }

    /**
     * [GET] /api/blacklists/isUserInBlacklist?userId={userId}
     * @author WoodyK
     * @apiNote 특정 사용자가 블랙리스트에 한번이라도 등록되었는지 조회
     * @param userId 블랙리스트에 등록된 적이 있는지 조회하고자 하는 사용자의 식별자
     * @return 블랙리스트에 등록된 적이 있으면 true, 없으면 false
     */
    @GetMapping("/api/blacklists/isUserInBlacklist")
    public ResponseEntity<?> isUserInBlacklist(@RequestParam("userId") String userId) {

        return new ResponseBuilder()
                .serviceResult(blacklistService.isUserInBlacklist(userId))
                .build();
    }

    @GetMapping("/api/blacklists/user/{userId}")
    public ResponseEntity<?> getBlacklistsByUserId(@PathVariable("userId") String userId) {
        return new ResponseBuilder()
                .serviceResult(blacklistService.getBlacklistsByUserId(userId))
                .build();
    }
}

