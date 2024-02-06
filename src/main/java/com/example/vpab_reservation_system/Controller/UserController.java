package com.example.vpab_reservation_system.Controller;

import com.example.vpab_reservation_system.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/{userId}/promote")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public void promote(@PathVariable Long userId){
        try {
            userService.promoteToAdmin(userId);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/{userId}/demote")
    public void demote(@PathVariable Long userId){

        try{
            userService.demoteToUser(userId);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
