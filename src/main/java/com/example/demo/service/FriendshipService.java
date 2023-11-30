package com.example.demo.service;

import com.example.demo.entity.FriendshipEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.FriendshipRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public static final String ACCEPTED = "ACCEPTED";
    public static final String REQUESTED = "REQUESTED";

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
    public ServiceResult acceptFriendshipRequest(String userId, String friendId) {
        var friendship = friendshipRepository.findByUserUserIdAndFriendUserId(userId, friendId);

        if(friendship == null) {
            return new ServiceResult().fail()
                    .message(String.format("bad request, no friendships for userId(`%s`), friendId(`%s`)", userId, friendId));
        }

        if(friendship.getStatus().equals(ACCEPTED)){
            return new ServiceResult().fail()
                    .message(String.format("userId(`%s`) and friendId(`%s`) are already friend", userId, friendId));
        }

        friendship.setStatus(ACCEPTED);
        var entity = friendshipRepository.save(friendship);
        return new ServiceResult().success()
                .message(String.format("accept done, userId(`%s`) and friendId(`%s`) are now friend", userId, friendId))
                .data(entity);

    }

    /**
     * @auther WoodyK
     * @apiNote 친구 요청을 거절한다.
     * @param userId 친구 요청을 거절하는 주체의 회원 식별자
     * @param friendId 거절할 대상의 회원 식별자
     * @return
     */
    public ServiceResult rejectFriendshipRequest(String userId, String friendId) {
        /* TODO: implement later */
        return null;
    }

    /**
     * @auther WoodyK
     * @apiNote 친구 요청을 보낸다.
     * @param targetUserId 친구 요청을 받을 회원의 회원 식별자
     * @param requesterUserId 요청한 회원의 회원 식별자
     * @return
     */
    public ServiceResult requestFriendship(String requesterUserId, String targetUserId) {

        var friendship = friendshipRepository.findByUserUserIdAndFriendUserId(requesterUserId, targetUserId);

        // 친구 요청이 이미 존재하는 경우
        if (friendship != null) {
            if (friendship.getStatus().equals(REQUESTED)) {
                return new ServiceResult().fail()
                        .message(String.format("already requested, but not accepted yet, userId(`%s`), friendId(`%s`)",
                        requesterUserId, targetUserId));
            }
            else if (friendship.getStatus().equals(ACCEPTED)) {
                return new ServiceResult().fail().message(String.format("already friend, userId(`%s`), friendId(`%s`)",
                        requesterUserId, targetUserId));
            }
        }

        var entity = friendshipRepository.save(FriendshipEntity.builder()
                .user(userRepository.findByUserId(requesterUserId))
                .friend(userRepository.findByUserId(targetUserId))
                .status(REQUESTED)
                .build());

        return new ServiceResult().success()
                .message(String.format("request done, userId(`%s`) requested to userId(`%s`)", requesterUserId, targetUserId))
                .data(entity);
    }


    /**
     * @author WoodyK
     * @apiNote 친구 관계를 삭제한다.
     */
    public ServiceResult deleteFriendshipByUserIdAndFriendId(String userId, String friendId) {

        if (!userRepository.existsByUserId(userId) || !userRepository.existsByUserId(friendId)) {
            return new ServiceResult().fail()
                    .message(String.format("bad request, invalid parameter, userId(`%s`), friendId(`%s`)", userId, friendId));
        }

        friendshipRepository.deleteByUserUserIdAndFriendUserId(userId, friendId);
        friendshipRepository.deleteByUserUserIdAndFriendUserId(friendId, userId);

        return new ServiceResult().success().message("delete done");
    }

    /**
     * @author WoodyK
     * @apiNote 특정 회원의 모든 친구 관계를 조회한다.
     */
    public ServiceResult getFriendshipListByUserId(String userId) {

        if (!userRepository.existsByUserId(userId))
            return new ServiceResult().fail()
                    .message(String.format("bad request, invalid userId(`%s`)", userId));

        return new ServiceResult().success()
                .message(ServiceResult.DEFUALT_SUCCESS_MESSAGE)
                .data( friendshipRepository.findByUserUserId(userId));
    }

    /**
     * @author WoodyK
     * @apiNote 특정 회원의 친구 목록을 조회한다.
     */
    public ServiceResult getFriendList(String userId) {

        if (!userRepository.existsByUserId(userId))
            return new ServiceResult().fail()
                    .message(String.format("bad request, invalid userId(`%s`)", userId));

        var resultFriendList = new ArrayList<UserEntity>();

        resultFriendList.addAll(friendshipRepository.findByUserUserId(userId).stream()
                .filter(friendship -> friendship.getStatus().equals(ACCEPTED))
                .map(FriendshipEntity::getFriend)
                .collect(Collectors.toList()));


        resultFriendList.addAll(friendshipRepository.findByFriendUserId(userId).stream()
                .filter(friendship -> friendship.getStatus().equals(ACCEPTED))
                .map(FriendshipEntity::getUser)
                .collect(Collectors.toList()));;


        return new ServiceResult().success()
                .message(ServiceResult.DEFUALT_SUCCESS_MESSAGE)
                .data(resultFriendList);
    }

    /**
     * @auther WoodyK
     * @apiNote 특정 회원이 친구관계인지 확인한다.
     * @param userId 친구관계를 확인하려는 회원의 회원 식별자
     * @param targetId 확인 대상 회원의 회원 식별자
     * @see com.example.demo.controller.FriendshipController#(String, String)
     */
    public ServiceResult isFriend(String userId, String targetId) {

        if (!userRepository.existsByUserId(userId) || !userRepository.existsByUserId(targetId)) {
            return new ServiceResult().fail().message(
                    String.format("bad request, invalid parameter, userId(`%s`), friendId(`%s`)", userId, targetId));
        }

        return new ServiceResult().success()
                .message(ServiceResult.DEFUALT_SUCCESS_MESSAGE)
                .data(friendshipRepository.existsByUserUserIdAndFriendUserIdAndStatus(userId, targetId, ACCEPTED) ||
                        friendshipRepository.existsByUserUserIdAndFriendUserIdAndStatus(targetId, userId, ACCEPTED));
    }

    /**
     * 사용자가 보낸 친구 요청 목록을 조회한다.
     * @param userId 사용자의 회원 식별자
     * @return 보낸 친구 요청 목록
     */
    public ServiceResult getSentFriendRequests(String userId) {
        List<FriendshipEntity> sentRequests = friendshipRepository.findByUserUserIdAndStatus(userId, REQUESTED);
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
        List<FriendshipEntity> receivedRequests = friendshipRepository.findByFriendUserIdAndStatus(userId, REQUESTED);
        List<UserEntity> users = receivedRequests.stream()
                .map(FriendshipEntity::getUser)
                .collect(Collectors.toList());
        return new ServiceResult().success().data(users);
    }

}
