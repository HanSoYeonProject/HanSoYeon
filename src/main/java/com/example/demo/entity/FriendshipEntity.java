package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "friendships")
public class FriendshipEntity {

    @Id
    @Column(name="friendship_id")
    int friendshipId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    UserEntity user;

    @OneToOne
    @JoinColumn(name = "friend_id", referencedColumnName = "user_id")
    UserEntity friend;

    @Column(name = "status")
    String status;
}
