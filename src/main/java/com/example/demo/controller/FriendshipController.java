package com.example.demo.controller;

import com.example.demo.requestBody.RequestFriendshipRequestBody;
import com.example.demo.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FriendshipController {

    private final FriendshipService friendshipService;

    @GetMapping("/friends")
    public ResponseEntity<?> getFriends() {
        var sr = friendshipService.getAllFriendships();

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * @apiNote 친구 요청을 보낸다.
     * @author WoodyK
     * @since JDK 11
     * @param reqBody.userId 친구를 추가하려는 사용자의 회원 아이디
     * @param reqBody.friendId 추가하려는 친구의 회원 아이디
     * @return 친구 추가 결과에 따른 ResponseEntitiy
     */
    @PostMapping("/friends")
    public ResponseEntity<?> addFriend(@RequestBody RequestFriendshipRequestBody reqBody) {
        var sr = friendshipService.requesstFriendship(reqBody.getUserId(),
                reqBody.getFriendId());

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * [PUT] /api/friends
     * @param reqBody `reqBody.userId`: 친구 요청을 수락하는 사용자의 회원 아이디(친구 요청을 수락하는 주체)
     *                `reqBody.friendId`: 친구 요청을 수락할 대상의 회원 아이디
     * @apiNote 친구 요청을 수락한다.
     */
    @PutMapping("/friends")
    public ResponseEntity<?> acceptFriend(@RequestBody RequestFriendshipRequestBody reqBody) {
        var sr = friendshipService.acceptFriendship(reqBody.getUserId(),
                reqBody.getFriendId());

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }

    /**
     * [DELETE] /api/friends?userId={userId}&friendId={friendId}
     * @apiNote 친구 관계를 삭제한다
     * @param userId 친구를 삭제하려는 사용자의 회원 아이디
     * @param friendId 삭제하려는 친구의 회원 아이디
     * @return 친구 삭제 결과에 따른 ResponseEntity
     */
    @DeleteMapping("/friends")
    public ResponseEntity<?> deleteFriend(@RequestParam("userId") String userId, @RequestParam("friendId") String friendId) {
        var sr = friendshipService.deleteFriendshipByUserIdAndFriendId(userId, friendId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }


    /**
     * [GET] /api/friends/{userId}
     * @apiNote 친구 목록 조회
     * @param userId 친구 목록을 조회하려는 사용자의 회원 아이디
     * @return 친구 목록 조회 결과에 따른 ResponseEntity
     */
    @GetMapping("/friends/{userId}")
    public ResponseEntity<?> getFriends(@PathVariable("userId") String userId) {
        var sr = friendshipService.getFriendList(userId);

        return sr.isSuccess() ?
                ResponseEntity.ok(sr.data) :
                ResponseEntity.badRequest().body(sr.message);
    }


}
