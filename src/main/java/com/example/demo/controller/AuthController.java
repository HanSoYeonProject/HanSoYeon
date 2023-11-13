package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.service.ProvidersService;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsersService usersService;
    @Autowired
    private ProvidersService providersService;

    private final String clientId = "234889770604-vcqi694q1kvfblt30ajhq77gsh5s8j2t.apps.googleusercontent.com";
    private final String clientSecret = "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";
    private final String redirectUri = "http://localhost:3000/googleCallback";
    private final String tokenUri = "https://oauth2.googleapis.com/token";
    private final String userInfoUri = "https://www.googleapis.com/oauth2/v3/userinfo";

    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto signUpDto){
        try {
            usersService.registerUser(signUpDto);
            return ResponseDto.setSuccess("회원가입 성공", null);
        } catch (Exception e) {
            // 예외 처리
            return ResponseDto.setFailed("회원가입 실패: " + e.getMessage());
        }
    }

    @PostMapping("/signUp/company")
    public ResponseDto<?> signUp(@RequestBody CompanySignUpDto companySignUpDto){
        try {
            providersService.registerCompany(companySignUpDto);
            return ResponseDto.setSuccess("회원가입 성공", null);
        } catch (Exception e) {
            // 예외 처리
            return ResponseDto.setFailed("회원가입 실패: " + e.getMessage());
        }
    }


    @PostMapping("/google")
    public ResponseEntity<?> handleGoogleAuthCode(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");

        RestTemplate restTemplate = new RestTemplate();

        // Google에 액세스 토큰 요청
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("code", code);
        map.add("grant_type", "authorization_code");
        map.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        ResponseEntity<GoogleOAuth2TokenResponse> response = restTemplate.postForEntity(tokenUri, request, GoogleOAuth2TokenResponse.class);

        String accessToken = Objects.requireNonNull(response.getBody()).getAccessToken();
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(accessToken);

        HttpEntity<?> userInfoRequest = new HttpEntity<>(userInfoHeaders);
        ResponseEntity<GoogleUserInfo> userInfoResponse = restTemplate.exchange(userInfoUri, HttpMethod.GET, userInfoRequest, GoogleUserInfo.class);

        return ResponseEntity.ok().body(userInfoResponse.getBody());
    }

    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody){
        ResponseDto<SignInResponseDto> result = usersService.signIn(requestBody);
        return result;
    }

    @PostMapping("/signIn/company")
    public ResponseDto<CompanySignInResponseDto> companySignIn(@RequestBody CompanySignInDto requestBody){
        ResponseDto<CompanySignInResponseDto> result = providersService.signIn(requestBody);
        return result;
    }

    @PostMapping("/signIn/kakao")
    public ResponseDto<SignInResponseDto> kakaoSignIn(@RequestBody Map<String, String> requestBody){
        String userEmail = requestBody.get("userEmail");
        return usersService.signInWithKakaoEmail(userEmail);
    }

}
