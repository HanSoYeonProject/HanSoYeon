package com.example.demo.entity;

import com.example.demo.dto.SignUpDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @Column(name = "user_id")
    private String userId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_email")
    private String userEmail;
    @JsonIgnore
    @Column(name = "user_password")
    private String userPassword;
    @Column(name = "user_gender")
    private String userGender;
    @Column(name = "user_profile")
    private String userProfile;
    @Column(name = "user_info")
    private String userInfo;
    @Column(name = "user_prefer")
    private String userPrefer;
    @Column(name = "user_phone")
    private String userPhone;
    @Column(name = "user_address")
    private String userAddress;

    public UserEntity(SignUpDto dto) {
        this.userId = dto.getUserId();
        this.userName = dto.getUserName();
        this.userEmail = dto.getUserEmail();
        this.userPassword = dto.getUserPassword();
        this.userGender = dto.getUserGender();
        this.userProfile = dto.getUserProfile() != null && !dto.getUserProfile().isEmpty()
                ? dto.getUserProfile()
                : "hansoyeon/src/imgs/default_profile.png";
        this.userInfo = dto.getUserInfo();
        this.userPrefer = dto.getUserPrefer();
        this.userPhone = dto.getUserPhone();
        this.userAddress = dto.getUserAddress();
    }
}
