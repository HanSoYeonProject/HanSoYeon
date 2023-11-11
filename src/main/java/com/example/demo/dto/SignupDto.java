package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {
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
}
