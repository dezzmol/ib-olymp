package com.astu.ibolympapi.student.entity;

import com.astu.ibolympapi.team.entity.Team;
import com.astu.ibolympapi.user.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "students")
@RequiredArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id", foreignKey = @ForeignKey(name = "team_id"))
    private Team team;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true, foreignKey = @ForeignKey(name = "user_id"))
    private User user;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name = "university", length = 255)
    private String university;

    @Column(name = "is_captain")
    private Boolean isCaptain;

    @Column(name = "other_contacts_data", columnDefinition = "TEXT")
    private String otherContactsData;
}
