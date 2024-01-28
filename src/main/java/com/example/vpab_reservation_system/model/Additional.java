package com.example.vpab_reservation_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "additional")
public class Additional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private double price;

    private boolean available;

    @ManyToMany(mappedBy = "additionals")
    @JsonIgnore
    private Set<Reservation> reservations;
}
