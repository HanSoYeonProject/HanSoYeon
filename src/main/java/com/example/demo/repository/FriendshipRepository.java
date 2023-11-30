package com.example.demo.repository;

import com.example.demo.entity.FriendshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<FriendshipEntity, Integer>{
    List<FriendshipEntity> findByUserUserId(String userId);
    List<FriendshipEntity> findByFriendUserId(String userId);
    FriendshipEntity findByUserUserIdAndFriendUserId(String userId, String friendUserId);
    boolean existsByUserUserIdAndFriendUserId(String userId, String friendUserId);
    boolean existsByUserUserIdAndFriendUserIdAndStatus(String userId, String friendUserId, String Status);
    void deleteByUserUserIdAndFriendUserId(String userId, String friendId);

    // 사용자가 보낸 친구 요청을 조회
    List<FriendshipEntity> findByUserUserIdAndStatus(String userId, String status);

    // 사용자가 받은 친구 요청을 조회
    List<FriendshipEntity> findByFriendUserIdAndStatus(String friendId, String status);

}
