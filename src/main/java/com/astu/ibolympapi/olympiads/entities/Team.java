package com.astu.ibolympapi.olympiads.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "teams")
public class Team implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "students", columnDefinition = "jsonb")
    private ArrayList<Long> students; // Хранение списка ID студентов в формате JSONB

    @ManyToMany(mappedBy = "teams")
    private List<Olympiad> olympiads;
}
