package com.example.vpab_reservation_system.dto;

import com.example.vpab_reservation_system.model.Reservation;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UserDetailsResponseDTO {
    private Long id;
    private String username;
    private List<Reservation> reservations;
}
