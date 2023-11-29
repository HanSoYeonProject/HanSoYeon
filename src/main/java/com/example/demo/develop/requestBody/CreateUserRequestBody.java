package com.example.demo.develop.requestBody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequestBody {
    String userId;
    String userPassword;
    String userName;
    String userEmail;
    String userAddress;
    String userGender;
    String userInfo;
    String userPhone;
    String userPrefer;
    String userProfile;
}
