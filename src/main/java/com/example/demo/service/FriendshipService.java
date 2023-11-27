package com.example.demo.service;

import com.example.demo.entity.FriendshipEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.FriendshipRepository;
import com.example.demo.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UsersRepository usersRepository;

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
                .user(usersRepository.findByUserId(targetUserId))
                .friend(usersRepository.findByUserId(requesterUserId))
                .build());

        return new ServiceResult().success().message("request done");
    }


    /**
     * @author WoodyK
     * @apiNote 친구 관계를 삭제한다.
     */
    public ServiceResult deleteFriendshipByUserIdAndFriendId(String userId, String friendId) {

        friendshipRepository.deleteByUserUserIdAndFriendUserId(userId, friendId);

        return new ServiceResult().success().message("delete done");
    }

    /**
     * @author WoodyK
     * @apiNote 특정 회원의 친구 목록을 조회한다.
     */
    public ServiceResult getFriendList(String userId) {

        /* 특정 회원의 친구 목록 조회 */
        var optUser = usersRepository.findByUserId(userId);

        /* FriendId 리턴 */
        if (optUser == null)
            return new ServiceResult().fail().message("Bad Request, Invalid userId");

        var friendshipList = friendshipRepository.findByUserUserId(userId);

        /* 친구 객체 리스트로 리턴 */
        List<UsersEntity> friendList =
                friendshipList.stream()
                        .map(friendshipEntity -> friendshipEntity.getFriend())
                        .collect(Collectors.toList());

        return new ServiceResult().success().data(friendList);
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

}
