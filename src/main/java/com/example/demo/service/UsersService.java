package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.repository.UsersRepository;
import com.example.demo.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.entity.UsersEntity;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(SignUpDto signUpDto) {
        UsersEntity usersEntity = new UsersEntity(signUpDto);
        usersEntity.setUserPassword(passwordEncoder.encode(signUpDto.getUserPassword()));
        usersRepository.save(usersEntity);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto){
        String userId = dto.getUserId();
        String userPassword = dto.getUserPassword();

        UsersEntity usersEntity = null;
        try {
            usersEntity = usersRepository.findByUserId(userId);
            if(usersEntity == null){
                return ResponseDto.setFailed("로그인 실패");
            }
            if(!passwordEncoder.matches(userPassword, usersEntity.getUserPassword())){
                return ResponseDto.setFailed("로그인 실패");
            }
        }catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 오류");
        }
        usersEntity.setUserPassword("");

        String token = tokenProvider.create(userId);
        int exprTime = 3600000;
        String userType = "member";

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, usersEntity, userType);
        return ResponseDto.setSuccess("로그인 성공", signInResponseDto);
    }

    public ResponseDto<SignInResponseDto> signInWithKakaoEmail(String userEmail){
        UsersEntity usersEntity = usersRepository.findByUserEmail(userEmail);
        if(usersEntity == null){
            return ResponseDto.setFailed("사용자를 찾을 수 없습니다.");
        }

        String token = tokenProvider.create(usersEntity.getUserId());
        int exprTime = 3600000;
        String userType = "member";

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, usersEntity, userType);
        return ResponseDto.setSuccess("로그인 성공", signInResponseDto);
    }

    public UsersEntity getUserById(String userId) {
        return usersRepository.findByUserId(userId);
    }

    public boolean verifyUserPassword(String userId, String userPassword) {
        UsersEntity userEntity = usersRepository.findByUserId(userId);
        if (userEntity != null) {
            return passwordEncoder.matches(userPassword, userEntity.getUserPassword());
        }
        return false;
    }

    public ResponseEntity<?> updateUserInfo(String userId, UserUpdateDto userUpdateDto) {
        UsersEntity userEntity = usersRepository.findByUserId(userId);
        if (userEntity != null) {
            // Update user information
            userEntity.setUserInfo(userUpdateDto.getUserInfo());
            userEntity.setUserAddress(userUpdateDto.getUserAddress());
            userEntity.setUserPrefer(userUpdateDto.getUserPrefer());
            userEntity.setUserGender(userUpdateDto.getUserGender());
            userEntity.setUserPhone(userUpdateDto.getUserPhone());

            usersRepository.save(userEntity);
            return ResponseEntity.ok("User information updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }


}
