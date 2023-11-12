package com.example.demo.repository;

import com.example.demo.entity.ProvidersEntity;
import com.example.demo.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvidersRepository extends JpaRepository<ProvidersEntity, String> {
    public ProvidersEntity findByProviderId(String providerId);
}
