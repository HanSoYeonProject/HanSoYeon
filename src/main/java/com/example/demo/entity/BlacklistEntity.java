package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Data
@Table(name = "blacklists")
public class BlacklistEntity {
    @Id
    @Column(name = "blacklist_id")
    public int blacklistId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    UserEntity user;

    @ManyToOne
    @JoinColumn(name = "provider_id", referencedColumnName = "provider_id")
    ProviderEntity provider;

}
