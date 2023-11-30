package com.example.demo.develop;

import com.example.demo.develop.requestBody.CreateUserRequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @auther WoodyK
 * @apiNote This class is for developing. not for production.
 */
@RestController
@RequiredArgsConstructor
public class DevelopController {
    private final DevelopService developService;

    /**
     * [POST] /dev/users
     * @apiNote This method is for creating user for developing
     * @author WoodyK
     * @param reqBody
     * <br>`reqBody.userId`: user's id
     * <br>`reqBody.userPassword`: user's password
     * <br>`reqBody.userName`: user's name
     * <br>`reqBody.userEmail`: user's email
     * <br>`reqBody.userAddress`: user's address
     * <br>`reqBody.getUserGender`: user's gender
     * <br>`reqBody.getUserInfo`: user's info
     * <br>`reqBody.getUserPhone`: user's phone
     * <br>`reqBody.getUserPrefer`: user's prefer
     * <br>`reqBody.getUserProfile`: user's profile
     * @return
     */
    @PostMapping("/dev/users")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequestBody reqBody) {
        var sr =  developService.createUser(
                reqBody.getUserId(), reqBody.getUserPassword(),
                reqBody.getUserName(), reqBody.getUserEmail(),
                reqBody.getUserAddress(), reqBody.getUserGender(),
                reqBody.getUserInfo(), reqBody.getUserPhone(),
                reqBody.getUserPrefer(), reqBody.getUserProfile());

        return sr.isSuccess() ? ResponseEntity.ok(sr.getMessage()) :
                ResponseEntity.badRequest().body(sr.getMessage());
    }

    /**
     * [POST] /dev/accessToken?userId={userId}
     * @author WoodyK
     * @apiNote This method is for issuing access token by user id
     * @param userId target user's id
     * @return user's access token
     */
    @PostMapping("/dev/accessToken")
    public ResponseEntity<?> issueAccessTokenByUserId(@RequestParam("userId") String userId) {
        var sr = developService.issueAccessTokenByUserId(userId);

        return sr.isSuccess() ? ResponseEntity.ok(sr.getData()) :
                ResponseEntity.badRequest().body(sr.getMessage());
    }

}
