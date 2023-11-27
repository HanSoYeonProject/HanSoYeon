package com.example.demo.service;

import com.example.demo.entity.BlacklistEntity;
import com.example.demo.repository.BlacklistRepository;
import com.example.demo.repository.ProvidersRepository;
import com.example.demo.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BlacklistService {

    private final BlacklistRepository blacklistRepository;
    private final UsersRepository usersRepository;
    private final ProvidersRepository providersRepository;

    /**
     * @apiNote 블랙리스트 추가
     * @param providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param userId 블랙 당한 대상의 회원 식별자
     */
    public ServiceResult addBlacklist(String providerId, String userId) {
        var provider = providersRepository.findByProviderId(providerId);
        var user = usersRepository.findByUserId(userId);

        if (provider == null && user == null)
            return new ServiceResult().fail().message("Bad Request, Invalid userId or providerId");

        blacklistRepository.save(BlacklistEntity.builder()
                .user(user)
                .provider(provider)
                .build()
        );

        return new ServiceResult().success().message("Successfully added blacklist" );
    }

    /**
     * @apiNote 블랙리스트 식별자로 특정 블랙리스트 항목 삭제
     * @param blacklistId 블랙리스트 식별자
     */
    public ServiceResult deleteBlacklistById(int blacklistId){

        blacklistRepository.deleteById(blacklistId);

        return new ServiceResult().success().message("Successfully deleted blacklist" );
    }

    /**
     * @apiNote 기업 회원 식별자와 블랙 당한 사용자 식별자로 특정 블랙리스트 항목 삭제
     * @param providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param userId 블랙 당한 대상의 회원 식별자
     */

    public ServiceResult deleteBlacklistByProviderIdAndUserId(String providerId, String userId){

        blacklistRepository.deleteByProviderProviderIdAndUserUserId(providerId, userId);

        return new ServiceResult().success().message("Successfully deleted blacklist" );
    }



    /**
     * @apiNote 블랙리스트 식별자로 특정 블랙리스트 조회
     * @param blacklistId 블랙리스트 식별자
     */
    public ServiceResult getBlacklist(int blacklistId) {
        BlacklistEntity blacklistEntity = blacklistRepository.findById(blacklistId);

        return blacklistEntity == null ?
                new ServiceResult().success().message("Blacklist not found"):
                new ServiceResult().success().message("Successfully found blacklist").data(blacklistEntity);
    }

    /**
     * @apiNote 기업 회원 식별자로 기업의 블랙리스트 리스트를 조회
     * @param providerId 자신이 등록한 블랙리스트 목록을 조회하고자 하는 기업 회원의 식별자
     */
    public ServiceResult getBlacklistsByProviderId(String providerId) {
        /* TODO : 파라미터 유효성 검사 */

        List<BlacklistEntity> blacklistEntities = blacklistRepository.findByProviderProviderId(providerId);

        return blacklistEntities == null ?
                new ServiceResult().success().message("Blacklist not exist"):
                new ServiceResult().success().message("Successfully found blacklist").data(blacklistEntities);
    }

    /**
     * @apiNote 특정 회원이 특정 기업의 블랙리스트에 포함되어 있는지 확인
     * @param providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param userId 블랙 당한 대상의 회원 식별자
     */
    public ServiceResult isUserInBlacklistOfProvider(String providerId, String userId){
        /* TODO : 파라미터 유효성 검사 */

        return new ServiceResult()
                .success()
                .message("Successfully found blacklist")
                .data(blacklistRepository.existsByProviderProviderIdAndUserUserId(providerId, userId));
    }

    /**
     * @apiNote 특정 회원이 전체 블랙리스트 중 한건이라도 포함되어 있는지 확인
     * @param userId 대상 회원 식별자
     */

    public ServiceResult isUserInBlacklist(String userId){
        /* TODO : 파라미터 유효성 검사 */

        return new ServiceResult()
                .success()
                .message("Successfully found blacklist")
                .data(blacklistRepository.existsByUserUserId(userId));
    }

}