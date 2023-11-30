package com.example.demo.controller;

import com.example.demo.request.RequestFriendshipRequestBody;
import com.example.demo.response.ResponseBuilder;
import com.example.demo.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FriendshipController {

    private final FriendshipService friendshipService;

    /**
     * [GET] /api/friendships
     * @apiNote 모든 친구 관계를 조회한다.
     * @author WoodyK
     * @since JDK 11
     *
     * @return
     */
    @GetMapping("/friendships")
    public ResponseEntity<?> getFriends() {

        return new ResponseBuilder()
                .serviceResult(friendshipService.getAllFriendships())
                .build();
    }

    /**
     * [POST] /api/friendships
     * @apiNote 친구 요청을 보낸다.
     * @author WoodyK
     * @since JDK 11
     * @param reqBody <br>`reqBody.userId`: 친구 요청을 보내는 사용자의 회원 아이디(친구 요청을 보내는 주체)
     *                <br>`reqBody.friendId`: 친구 요청을 보낼 대상의 회원 아이디
     * @return 친구 추가 결과에 따른 ResponseEntitiy
     */
    @PostMapping("/friendships")
    public ResponseEntity<?> addFriend(@RequestBody RequestFriendshipRequestBody reqBody) {

        return new ResponseBuilder()
                .serviceResult(friendshipService.requestFriendship(reqBody.getUserId(), reqBody.getFriendId()))
                .build();
    }

    /**
     * [PUT] /api/friendships
     * @author WoodyK
     * @param reqBody
     * <br>`reqBody.userId`: 친구 요청을 수락하는 사용자의 회원 아이디(친구 요청을 수락하는 주체)
     * <br>`reqBody.friendId`: 친구 요청을 수락할 대상의 회원 아이디
     * @apiNote 친구 요청을 수락한다.
     */
    @PutMapping("/friendships")
    public ResponseEntity<?> acceptFriend(@RequestBody RequestFriendshipRequestBody reqBody) {

        return new ResponseBuilder()
                .serviceResult(friendshipService.acceptFriendshipRequest(reqBody.getUserId(), reqBody.getFriendId()))
                .build();
    }

    /**
     * [DELETE] /api/friendships?userId={userId}&friendId={friendId}
     * @author WoodyK
     * @apiNote 친구 관계를 삭제한다
     * @param userId 친구를 삭제하려는 사용자의 회원 아이디
     * @param friendId 삭제하려는 친구의 회원 아이디
     * @return 친구 삭제 결과에 따른 ResponseEntity
     */
    @DeleteMapping("/friendships")
    public ResponseEntity<?> deleteFriend(@RequestParam("userId") String userId,
                                          @RequestParam("friendId") String friendId) {

        return new ResponseBuilder()
                .serviceResult(friendshipService.deleteFriendshipByUserIdAndFriendId(userId, friendId))
                .build();
    }


    /**
     * [GET] /api/friendships?userId={userId}
     * @author WoodyK
     * @apiNote 친구 목록 조회
     * @param userId 친구 목록을 조회하려는 사용자의 회원 아이디
     * @return 친구 목록 조회 결과에 따른 ResponseEntity
     */
    @GetMapping("/friendships/friends")
    public ResponseEntity<?> getFriends(@RequestParam("userId") String userId) {

        return new ResponseBuilder()
                .serviceResult(friendshipService.getFriendList(userId))
                .build();
    }

    /**
     * [GET] /api/friendships/isFriend?userId={userId}&targetId={targetId}
     * @apiNote 친구 여부 확인
     * @author WoodyK
     * @param userId 친구관계를 확인하려는 사용자의 회원 아이디
     * @param targetId 확인하고 싶은 대상의 회원 아이디
     */
    @GetMapping("/friendships/isFriend")
    public ResponseEntity<?> isFriend(@RequestParam("userId") String userId,
                                      @RequestParam("targetId") String targetId) {

        return new ResponseBuilder()
                .serviceResult(friendshipService.isFriend(userId, targetId))
                .build();
    }


}
