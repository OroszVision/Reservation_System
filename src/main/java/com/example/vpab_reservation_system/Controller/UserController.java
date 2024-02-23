package com.example.vpab_reservation_system.Controller;

import com.example.vpab_reservation_system.dto.UserDetailsResponseDTO;
import com.example.vpab_reservation_system.model.User;
import com.example.vpab_reservation_system.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<User>> getUsers(){
            List<User> users = userService.getUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<UserDetailsResponseDTO> getUserDetailsById(@PathVariable Long userId) throws IllegalAccessException {
        UserDetailsResponseDTO user = userService.getUserDetailsById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

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
