package com.example.vpab_reservation_system.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
public class ReservationDTO {
    private String name;
    private LocalDate arrival;
    private LocalDate departure;
    @Getter
    private Set<Long> additionalIds;


}
