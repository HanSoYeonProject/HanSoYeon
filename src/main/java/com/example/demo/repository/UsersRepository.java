package com.example.demo.repository;

import com.example.demo.entity.UsersEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository {
    public UsersEntity findByUserEmail(String userEmail);
}
