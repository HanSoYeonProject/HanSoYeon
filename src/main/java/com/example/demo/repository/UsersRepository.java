package com.example.demo.repository;

import com.example.demo.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, String> {
    public boolean existsByUserIdAndUserPassword(String userId, String userPassword);
    public UsersEntity findByUserId(String userId);
}
