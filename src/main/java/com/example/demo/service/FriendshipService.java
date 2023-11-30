package com.example.demo.service;

import com.example.demo.entity.FriendshipEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.FriendshipRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public static final String ACCEPTED = "ACCEPTED";
    public static final String PENDING = "PENDING";


    /**
     * @auther WoodyK
     * @apiNote 모든 친구 관계를 조회한다.
     */
    public ServiceResult getAllFriendships() {
        return new ServiceResult().success().data(friendshipRepository.findAll());
    }

    /**
     * @auther WoodyK
     * @apiNote 친구 요청을 수락한다.
     * @param userId 친구 요청을 수락하는 주체의 회원 식별자
     * @param friendId 수락할 대상의 회원 식별자
     * @return
     */
    public ServiceResult acceptFriendship(String userId, String friendId) {
        var friendship = friendshipRepository.findByUserUserIdAndFriendUserId(userId, friendId);

        if(friendship == null) {
            return new ServiceResult().fail().message("Bad Request, Invalid userId");
        }

        friendship.setStatus(ACCEPTED);
        friendshipRepository.save(friendship);

        return new ServiceResult().success().message("accept done");
    }

    /**
     * @auther WoodyK
     * @apiNote 친구 요청을 보낸다.
     * @param targetUserId 친구 요청을 받을 회원의 회원 식별자
     * @param requesterUserId 요청한 회원의 회원 식별자
     * @return
     */
    public ServiceResult requesstFriendship(String targetUserId, String requesterUserId) {

        var friendship = friendshipRepository.findByUserUserIdAndFriendUserId(targetUserId, requesterUserId);

        // 친구 요청이 이미 존재하는 경우
        if (friendship != null) {
            if (friendship.getStatus() == PENDING) {
                return new ServiceResult().fail().message("already requested");
            }
            else if (friendship.getStatus() == ACCEPTED) {
                return new ServiceResult().fail().message("already friend");
            }
        }

        friendshipRepository.save(FriendshipEntity.builder()
                .user(userRepository.findByUserId(targetUserId))
                .friend(userRepository.findByUserId(requesterUserId))
                .status(PENDING)
                .build());

        return new ServiceResult().success().message("request done");
    }


    /**
     * @author WoodyK
     * @apiNote 친구 관계를 삭제한다.
     */
    @Transactional
    public ServiceResult deleteFriendshipByUserIdAndFriendId(String userId, String friendId) {

        friendshipRepository.deleteByUserUserIdAndFriendUserId(userId, friendId);
        friendshipRepository.deleteByUserUserIdAndFriendUserId(friendId, userId);

        return new ServiceResult().success().message("delete done");
    }

    /**
     * @author WoodyK
     * @apiNote 특정 회원의 친구 목록을 조회한다.
     */
    public ServiceResult getFriendList(String userId) {

        /* 특정 회원의 친구 목록 조회 */
        var optUser = userRepository.findByUserId(userId);

        /* FriendId 리턴 */
        var friendshipsAsUser = friendshipRepository.findByUserUserId(userId)
                .stream()
                .filter(friendship -> ACCEPTED.equals(friendship.getStatus()))
                .map(FriendshipEntity::getFriend)
                .collect(Collectors.toList());

        var friendshipsAsFriend = friendshipRepository.findByFriendUserIdAndStatus(userId, ACCEPTED)
                .stream()
                .map(FriendshipEntity::getUser)
                .collect(Collectors.toList());

        List<UserEntity> combinedFriendList = new ArrayList<>(friendshipsAsUser);
        combinedFriendList.addAll(friendshipsAsFriend);

        return new ServiceResult().success().data(combinedFriendList);
    }

    /**
     * @auther WoodyK
     * @apiNote 특정 회원이 친구관계인지 확인한다.
     * @param userId 친구관계를 확인하려는 회원의 회원 식별자
     * @param friendId 확인 대상 회원의 회원 식별자
     */
    public ServiceResult isFriend(String userId, String friendId) {
        var friendship = friendshipRepository.findByUserUserIdAndFriendUserId(userId, friendId);

        if (friendship == null) {
            return new ServiceResult().success().data(false);
        }

        else if(friendship.getStatus().equals(ACCEPTED))
            return new ServiceResult().success().data(true);

        return new ServiceResult().success().data(false);

    }

    /**
     * 사용자가 보낸 친구 요청 목록을 조회한다.
     * @param userId 사용자의 회원 식별자
     * @return 보낸 친구 요청 목록
     */
    public ServiceResult getSentFriendRequests(String userId) {
        List<FriendshipEntity> sentRequests = friendshipRepository.findByUserUserIdAndStatus(userId, PENDING);
        List<UserEntity> users = sentRequests.stream()
                .map(FriendshipEntity::getFriend)
                .collect(Collectors.toList());
        return new ServiceResult().success().data(users);
    }

    /**
     * 사용자가 받은 친구 요청 목록을 조회한다.
     * @param userId 사용자의 회원 식별자
     * @return 받은 친구 요청 목록
     */
    public ServiceResult getReceivedFriendRequests(String userId) {
        List<FriendshipEntity> receivedRequests = friendshipRepository.findByFriendUserIdAndStatus(userId, PENDING);
        List<UserEntity> users = receivedRequests.stream()
                .map(FriendshipEntity::getUser)
                .collect(Collectors.toList());
        return new ServiceResult().success().data(users);
    }

}
