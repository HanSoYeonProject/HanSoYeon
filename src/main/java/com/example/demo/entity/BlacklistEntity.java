package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "blacklists")
public class BlacklistEntity {

    @Id
    @Column(name = "blacklist_id")
    public int blackListId;

    @Column(name = "provider_id")
    public String providerId;

    @Column(name = "user_id")
    public String userId;

}
