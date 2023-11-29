package com.example.demo.controller;

import com.example.demo.requestBody.DeleteBlacklistRequestBody;
import com.example.demo.service.BlacklistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@Slf4j

public class BlacklistController {

    private final BlacklistService blacklistService;

    /**
     * [POST] /api/blacklists?providerId={providerId}&userId={userId}
     * @apiNote 블랙리스트 추가
     * @param providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param userId 블랙 당한 대상의 회원 식별자
     */
    @PostMapping("/blacklists")
    public ResponseEntity<?> addBlacklist(@RequestParam("providerId") String providerId,
                                          @RequestParam("userId") String userId){

        var sr = blacklistService.addBlacklist(providerId, userId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * [DELETE] /api/blacklists/{blacklistId}
     * @apiNote 블랙리스트 식별자로 특정 블랙리스트 항목 삭제
     * @param blacklistId 블랙리스트 식별자
     */
    @DeleteMapping("/blacklists/{blacklistId}")
    public ResponseEntity<?> deleteBlacklistById(int blacklistId) {
        var sr = blacklistService.deleteBlacklistById(blacklistId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * [DELETE] /api/blacklists
     * @apiNote 기업 회원 식별자와 블랙 당한 사용자 식별자로 특정 블랙리스트 항목 삭제
     * @param reqBody.providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param reqBody.userId 블랙 당한 대상의 회원 식별자
     * @see DeleteBlacklistRequestBody
     */
    @DeleteMapping("/blacklists")
    public ResponseEntity<?> deleteBlacklistByProviderIdAndUserId(
            @RequestBody DeleteBlacklistRequestBody reqBody) {

        var sr = blacklistService.deleteBlacklistByProviderIdAndUserId(reqBody.providerId, reqBody.userId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * [GET] /api/blacklists/{blacklistId}
     * @apiNote 블랙리스트 식별자로 특정 블랙리스트 조회
     * @param blacklistId 블랙리스트 식별자
     */
    @GetMapping("/blacklist/{blacklistId}")
    public ResponseEntity<?> getBlacklist(@PathVariable("blacklistId") int blacklistId) {
        var sr = blacklistService.getBlacklist(blacklistId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * [GET] /api/blacklists/providerId?value={providerId}
     * @apiNote 기업 회원 식별자로 기업의 블랙리스트 리스트를 조회
     * @param providerId 자신이 등록한 블랙리스트 목록을 조회하고자 하는 기업 회원의 식별자
     */
    @GetMapping("/blacklists/providerId")
    public ResponseEntity<?> getBlacklistsByProviderId(@RequestParam("value") String providerId) {
        var sr = blacklistService.getBlacklistsByProviderId(providerId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * [GET] /api/blacklists/userId={userId}
     * @apiNote 특정 사용자가 블랙리스트에 한번이라도 등록되었는지 조회
     * @param userId 블랙리스트에 등록된 적이 있는지 조회하고자 하는 사용자의 식별자
     * @return 블랙리스트에 등록된 적이 있으면 true, 없으면 false
     */
    @GetMapping("/blacklists/userId")
    public ResponseEntity<?> isUserInBlacklist(@RequestParam("value") String userId) {
        var sr = blacklistService.isUserInBlacklist(userId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }
}

