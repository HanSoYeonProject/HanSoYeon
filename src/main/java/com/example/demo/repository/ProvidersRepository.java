package com.example.demo.repository;

import com.example.demo.entity.ProviderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvidersRepository extends JpaRepository<ProviderEntity, String> {
    public ProviderEntity findByProviderId(String providerId);
}
