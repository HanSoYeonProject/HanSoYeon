package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.entity.UserEntity;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(SignUpDto signUpDto) {
        UserEntity userEntity = new UserEntity(signUpDto);
        userEntity.setUserPassword(passwordEncoder.encode(signUpDto.getUserPassword()));
        userRepository.save(userEntity);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto){
        String userId = dto.getUserId();
        String userPassword = dto.getUserPassword();

        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserId(userId);
            if(userEntity == null){
                return ResponseDto.setFailed("로그인 실패");
            }
            if(!passwordEncoder.matches(userPassword, userEntity.getUserPassword())){
                return ResponseDto.setFailed("로그인 실패");
            }
        }catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 오류");
        }
        userEntity.setUserPassword("");

        String token = tokenProvider.create(userId);
        int exprTime = 3600000;
        String userType = "member";

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity, userType);
        return ResponseDto.setSuccess("로그인 성공", signInResponseDto);
    }

    public ResponseDto<SignInResponseDto> signInWithKakaoEmail(String userEmail){
        UserEntity userEntity = userRepository.findByUserEmail(userEmail);
        if(userEntity == null){
            return ResponseDto.setFailed("사용자를 찾을 수 없습니다.");
        }

        String token = tokenProvider.create(userEntity.getUserId());
        int exprTime = 3600000;
        String userType = "member";

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity, userType);
        return ResponseDto.setSuccess("로그인 성공", signInResponseDto);
    }

    public UserEntity getUserById(String userId) {
        return userRepository.findByUserId(userId);
    }

    public boolean verifyUserPassword(String userId, String userPassword) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity != null) {
            return passwordEncoder.matches(userPassword, userEntity.getUserPassword());
        }
        return false;
    }

    public ResponseEntity<?> updateUserInfo(String userId, UserUpdateDto userUpdateDto) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity != null) {
            userEntity.setUserInfo(userUpdateDto.getUserInfo());
            userEntity.setUserAddress(userUpdateDto.getUserAddress());
            userEntity.setUserPrefer(userUpdateDto.getUserPrefer());
            userEntity.setUserGender(userUpdateDto.getUserGender());
            userEntity.setUserPhone(userUpdateDto.getUserPhone());
            userEntity.setUserProfile(userUpdateDto.getUserProfile());

            userRepository.save(userEntity);
            return ResponseEntity.ok("User information updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<?> deleteUser(String userId) {
        UserEntity user = userRepository.findByUserId(userId);
        if (user != null) {
            userRepository.delete(user);
            return ResponseEntity.ok().body("user deleted successfully");
        }
        return ResponseEntity.badRequest().body("user not found");
    }

    public List<UserEntity> searchUsers(String search) {
        return userRepository.findByUserIdContaining(search);
    }
}
