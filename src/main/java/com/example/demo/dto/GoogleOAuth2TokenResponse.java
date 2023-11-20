package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoogleOAuth2TokenResponse {
    private String accessToken;
    private String tokenType;
    private String refreshToken;
    private Long expiresIn;
    private String scope;
    private String idToken;
}
