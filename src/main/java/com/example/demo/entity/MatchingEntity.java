package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "matchings")
public class MatchingEntity {
    @Id
    @Column(name = "matching_id")
    public int matchingId;

    @OneToOne
    @JoinColumn(name = "recruitment_id", referencedColumnName = "job_id")
    RecruitmentEntity recruitment;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    UserEntity user;
    @Column(name = "status")
    public String status;
}
