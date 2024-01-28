package com.example.vpab_reservation_system.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdditionalDTO {
    private String name;
    private double price;
    private boolean available;


}
