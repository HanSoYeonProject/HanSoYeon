package com.example.demo.develop;

import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ServiceResult;
import com.example.demo.env.SecurityEnvironment;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * @auther WoodyK
 * @apiNote This class is for developing. not for production.
 */
@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class DevelopService {
    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * @auhtor WoodyK
     * @apiNote This method is for creating user
     */
    public ServiceResult createUser(String userId, String userPassword,
                                    String userName, String userEmail,
                                    String userAddress, String userGender,
                                    String userInfo, String userPhone,
                                    String userPrefer, String userProfile) {

        if (userId == null || userPassword == null || userEmail == null){
            return new ServiceResult().fail().message("Bad Request, required parameter is null");
        }

        var User = UserEntity.builder()
                .userId(userId)
                .userPassword(passwordEncoder.encode(userPassword))
                .userName(userName)
                .userEmail(userEmail)
                .userAddress(userAddress)
                .userGender(userGender)
                .userInfo(userInfo)
                .userPhone(userPhone)
                .userPrefer(userPrefer)
                .userProfile(userProfile).build();

        userRepository.save(User);

        return new ServiceResult().success().message("User created successfully");
    }

    /**
     * @author WoodyK
     * @apiNote This method is for issuing access token by user id, just for developing
     */
    public ServiceResult issueAccessTokenByUserId(String userId){
        var nullableUser = userRepository.findByUserId(userId);

        if (nullableUser == null)
            return new ServiceResult().fail().message("User not found");

        Date exprTime = Date.from(Instant.now().plus(30, ChronoUnit.DAYS));

        String accessToken = Jwts.builder()
                        .signWith(SignatureAlgorithm.HS512, SecurityEnvironment.JWT_SECRET)
                        .setSubject(nullableUser.getUserEmail()).setIssuedAt(new Date()).setExpiration(exprTime)
                        .compact();

        return new ServiceResult().success().message("Token issued successfully").data(accessToken);
    }
}
