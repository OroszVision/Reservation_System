package com.example.vpab_reservation_system.dto;

import com.example.vpab_reservation_system.model.Role;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDTO {
    private Long id;
    private String username;
    private Role role;
}
