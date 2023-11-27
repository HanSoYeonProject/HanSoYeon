package com.example.demo.entity;

import com.example.demo.dto.SignUpDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UsersEntity {
    @Id
    private String userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userGender;
    private String userProfile;
    private String userInfo;
    private String userPrefer;
    private String userPhone;
    private String userAddress;

    public UsersEntity(SignUpDto dto) {
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
