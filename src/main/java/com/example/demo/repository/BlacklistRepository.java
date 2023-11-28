package com.example.demo.repository;

import com.example.demo.entity.BlacklistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlacklistRepository extends JpaRepository<BlacklistEntity, Integer> {
    BlacklistEntity findById(int blacklistId);
    List<BlacklistEntity> findByProviderProviderId(String providerId);

    boolean existsByProviderProviderIdAndUserUserId(String providerId, String userId);
    void deleteByProviderProviderIdAndUserUserId(String providerId, String userId);
    void deleteById(int blacklistId);
    boolean existsByUserUserId(String userId);
}
