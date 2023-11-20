package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    private String userGender;
    private String userProfile;
    private String userInfo;
    private String userPrefer;
    private String userPhone;
    private String userAddress;
}
