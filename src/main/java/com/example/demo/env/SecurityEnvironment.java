package com.example.demo.env;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecurityEnvironment {

    public static String JWT_SECRET;

    @Value("${env.jwt.secret}")
    public void setJwtSecret(String jwtSecret) {
        JWT_SECRET = jwtSecret;
    }

}
