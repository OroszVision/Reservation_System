package com.example.vpab_reservation_system.Controller;


import com.example.vpab_reservation_system.dto.AdditionalDTO;
import com.example.vpab_reservation_system.model.Additional;
import com.example.vpab_reservation_system.service.AdditionalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/additional")
public class AdditionalController {
    private final AdditionalService additionalService;


    @GetMapping
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Additional>> getAllAdditionals() throws IllegalAccessException {
        List<Additional>additionals = additionalService.findAllAdditionals();
        return new ResponseEntity<>(additionals, HttpStatus.OK);
    }

    @PutMapping("/{additionalId}")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Additional> updateAdditional(@PathVariable Long additionalId, @RequestBody AdditionalDTO additional) {
        Optional<Additional> existingAdditional = additionalService.findAdditionalById(additionalId);

        if (existingAdditional.isPresent()) {
            Additional updatedTask = additionalService.updateAdditional(additionalId, additional);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{additionalId}")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void>deleteAdditional(@PathVariable Long additionalId) throws IllegalAccessException {
        Optional<Additional> additional = additionalService.findAdditionalById(additionalId);
        if(additional.isPresent()){
            additionalService.deleteAdditional(additionalId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Additional> createAdditional(@RequestBody AdditionalDTO additional) throws IllegalAccessException {
        Additional createdAdditional = additionalService.saveAdditional(additional);
        return new ResponseEntity<>(createdAdditional, HttpStatus.CREATED);
    }

    @PostMapping("/setAvailable/{id}")
    public ResponseEntity<String> setToAvailable(@PathVariable Long id) {
        try {
            additionalService.setToAvailable(id);
            return ResponseEntity.ok("Additional item with id " + id + " set to available successfully.");
        } catch (IllegalAccessException | EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/setUnavailable/{id}")
    public ResponseEntity<String> setToUnavailable(@PathVariable Long id) {
        try {
            additionalService.setToUnavailable(id);
            return ResponseEntity.ok("Additional item with id " + id + " set to unavailable successfully.");
        } catch (IllegalAccessException | EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/findAllAvailable")
    public ResponseEntity<List<Additional>> findAllAvailableAdditinals() {
        try {
            List<Additional> availableAdditionals = additionalService.findAllAvailableAdditinals();
            return ResponseEntity.ok(availableAdditionals);
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}

