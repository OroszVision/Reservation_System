package com.example.vpab_reservation_system.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDTO {
    private Long id;
    private String username;
    private String role;

}
