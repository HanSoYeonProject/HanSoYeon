package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.ProvidersEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.security.TokenProvider;
import com.example.demo.service.ProvidersService;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
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

    @Autowired
    TokenProvider tokenProvider;

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

    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        // Bearer 토큰에서 실제 토큰을 추출합니다.
        String jwtToken = token.split(" ")[1];

        // TokenProvider를 사용하여 토큰에서 이메일을 추출합니다.
        String userId = tokenProvider.getIdFromToken(jwtToken);

        UsersEntity user = usersService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/currentCompany")
    public ResponseEntity<?> getCurrentCompany(@RequestHeader("Authorization") String token) {
        // Bearer 토큰에서 실제 토큰을 추출합니다.
        String jwtToken = token.split(" ")[1];

        // TokenProvider를 사용하여 토큰에서 이메일을 추출합니다.
        String providerId = tokenProvider.getIdFromToken(jwtToken);

        ProvidersEntity user = providersService.getUserById(providerId);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/verifyPassword")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token"); // 토큰 가져오기

        // 토큰 값이 null이거나 비어 있으면 오류 응답을 반환합니다.
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body("Token is missing or empty: " + token);
        }

        String jwtToken = null;
        if (token.contains(" ")) {
            jwtToken = token.split(" ")[1];
        } else {
            jwtToken = token;
        }


        String userId = tokenProvider.getIdFromToken(jwtToken); // 토큰에서 이메일 주소 추출
        String userPassword = request.get("userPassword");

        boolean isValid = usersService.verifyUserPassword(userId, userPassword);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verifyPasswordCompany")
    public ResponseEntity<?> verifyPasswordCompany(@RequestBody Map<String, String> request) {
        String token = request.get("token"); // 토큰 가져오기

        // 토큰 값이 null이거나 비어 있으면 오류 응답을 반환합니다.
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body("Token is missing or empty: " + token);
        }

        String jwtToken = null;
        if (token.contains(" ")) {
            jwtToken = token.split(" ")[1];
        } else {
            jwtToken = token;
        }

        String providerId = tokenProvider.getIdFromToken(jwtToken); // 토큰에서 이메일 주소 추출
        String providerPassword = request.get("providerPassword");

        boolean isValid = providersService.verifyProviderPassword(providerId, providerPassword);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verifyToken")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String tokenHeader) {
        // Bearer 토큰에서 실제 토큰을 추출
        String token = tokenHeader.split(" ")[1];

        try {
            // 토큰 검증 로직
            if (tokenProvider.validate(token) != null) {
                String id = tokenProvider.getIdFromToken(token);
                UsersEntity user = usersService.getUserById(id);

                return ResponseEntity.ok().body(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error verifying token");
        }
    }

    @PostMapping("/updateUserInfo")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserUpdateDto userUpdateDto,
                                            @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.split(" ")[1];
        String userId = tokenProvider.getIdFromToken(token);

        return usersService.updateUserInfo(userId, userUpdateDto);
    }

    @PostMapping("/updateCompanyInfo")
    public ResponseEntity<?> updateCompanyInfo(@RequestBody CompanyUpdateDto companyUpdateDto,
                                               @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.split(" ")[1];
        String providerId = tokenProvider.getIdFromToken(token);

        return providersService.updateCompanyInfo(providerId, companyUpdateDto);
    }

    @GetMapping("/allCompanies")
    public ResponseEntity<?> getAllCompanies() {
        List<ProvidersEntity> companies = providersService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @DeleteMapping("/deleteProvider/{providerId}")
    public ResponseEntity<?> deleteProvider(@PathVariable String providerId) {
        return providersService.deleteProvider(providerId);
    }

    @PostMapping("/approveProvider")
    public ResponseEntity<?> approveProvider(@RequestBody Map<String, String> request) {
        String providerId = request.get("providerId");
        return providersService.approveProvider(providerId);
    }

    @PostMapping("/revokeProviderApproval")
    public ResponseEntity<?> revokeProviderApproval(@RequestBody Map<String, String> request) {
        String providerId = request.get("providerId");
        return providersService.revokeProviderApproval(providerId);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<?> getAllMembers() {
        List<UsersEntity> companies = usersService.getAllUsers();
        return ResponseEntity.ok(companies);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        return usersService.deleteUser(userId);
    }

}
