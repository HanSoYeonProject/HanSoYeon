package com.example.demo.service;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.SignInDto;
import com.example.demo.dto.SignInResponseDto;
import com.example.demo.dto.SignUpDto;
import com.example.demo.repository.UsersRepository;
import com.example.demo.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
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
}
