package com.example.demo.service;

import com.example.demo.entity.BlacklistEntity;
import com.example.demo.repository.BlacklistRepository;
import com.example.demo.repository.ProvidersRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BlacklistService {

    private final BlacklistRepository blacklistRepository;
    private final UserRepository userRepository;
    private final ProvidersRepository providersRepository;


    public ServiceResult getAllBlacklists() {
        return new ServiceResult().success().data(blacklistRepository.findAll());
    }

    /**
     * @apiNote 블랙리스트 추가
     * @param providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param userId 블랙 당한 대상의 회원 식별자
     */
    public ServiceResult addBlacklist(String providerId, String userId) {
        var provider = providersRepository.findByProviderId(providerId);
        var user = userRepository.findByUserId(userId);

        if (provider == null || user == null)
            return new ServiceResult().fail().message("Bad Request, Invalid userId or providerId");

        if(blacklistRepository.existsByProviderProviderIdAndUserUserId(providerId, userId))
            return new ServiceResult().success().message("Already exist blacklist");

        blacklistRepository.save(BlacklistEntity.builder()
                .user(user)
                .provider(provider)
                .build()
        );

        return new ServiceResult().success().message("Successfully added blacklist" );
    }

    /**
     * [DELETE] /api/blacklists/{blacklistId}
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
     * @author WoodyK
     * @see com.example.demo.controller.BlacklistController#getBlacklistByBlacklistId(int)
     * @return BlacklistEntity
     */
    public ServiceResult getBlacklistByBlacklistId(int blacklistId) {
        BlacklistEntity blacklistEntity = blacklistRepository.findById(blacklistId);
        if (blacklistEntity == null)
            return new ServiceResult().fail()
                    .message(String.format("bad request, invalid blacklistId(`%d`)", blacklistId));

        return new ServiceResult().success()
                .message(ServiceResult.DEFUALT_SUCCESS_MESSAGE)
                .data(blacklistEntity);
    }

    /**
     * @apiNote 기업 회원 식별자로 기업의 블랙리스트 리스트에 등록된 회원 리스트 조회
     * @param providerId 자신이 등록한 블랙리스트 목록을 조회하고자 하는 기업 회원의 식별자
     * @see com.example.demo.controller.BlacklistController#getBlacklistsByProviderId(String)
     * @return UserEntity List
     */
    public ServiceResult getBlacklistUserListByProviderId(String providerId) {

        List<BlacklistEntity> blacklistEntities = blacklistRepository.findByProviderProviderId(providerId);

        if (blacklistEntities == null)
            return new ServiceResult().fail().message(String.format("bad request, invalid providerId(`%s`)", providerId));

        var UserEntityList =
                blacklistEntities.stream()
                        .map(BlacklistEntity::getUser)
                        .collect(Collectors.toList());

        return new ServiceResult()
                .success()
                .message(ServiceResult.DEFUALT_SUCCESS_MESSAGE)
                .data(UserEntityList);
    }

    /**
     * @apiNote 특정 회원이 특정 기업의 블랙리스트에 포함되어 있는지 확인
     * @param providerId 블랙을 수행하는 주체의 회원 식별자(기업 회원)
     * @param userId 블랙 당한 대상의 회원 식별자
     */
    public ServiceResult isUserInBlacklistOfProvider(String providerId, String userId){
        var nullabeProvider = providersRepository.findByProviderId(providerId);
        var nullabeUser = userRepository.findByUserId(userId);

        if (nullabeProvider == null || nullabeUser == null)
            return new ServiceResult().fail().message("Bad Request, Invalid userId or providerId");

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
        var nullabeUser = userRepository.findByUserId(userId);

        if (nullabeUser == null)
            return new ServiceResult().fail().message("Bad Request, Invalid userId");

        return new ServiceResult()
                .success()
                .message(String.format("user(`%s`) is in blacklist", userId))
                .data(blacklistRepository.existsByUserUserId(userId));
    }

    /**
     * userId를 받아 해당 사용자가 포함된 블랙리스트 목록을 반환
     * @param userId 대상 사용자의 식별자
     */
    public ServiceResult getBlacklistsByUserId(String userId) {
        List<BlacklistEntity> blacklists = blacklistRepository.findByUserUserId(userId);

        if (blacklists.isEmpty())
            return new ServiceResult().fail().message("No blacklists found for the user");

        return new ServiceResult().success().data(blacklists);
    }

}