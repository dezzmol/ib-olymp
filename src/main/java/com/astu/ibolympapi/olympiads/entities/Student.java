package com.astu.ibolympapi.olympiads.entities;

import com.astu.ibolympapi.user.entities.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id", foreignKey = @ForeignKey(name = "team_id"))
    private Team team;

    @ManyToOne
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
