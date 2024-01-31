package com.example.vpab_reservation_system.Controller;

import com.example.vpab_reservation_system.dto.ReservationDTO;
import com.example.vpab_reservation_system.model.Reservation;
import com.example.vpab_reservation_system.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController("reservationRestController")
@RequestMapping("/api/v1/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/admin/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Reservation>> getAllReservationsForAdmin() {
        List<Reservation> reservations = reservationService.findAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/admin/user/{userId}/reservations")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Reservation>> getReservationsOfUserById(@PathVariable Long userId) {
        List<Reservation> reservations = reservationService.findReservationsOfUser(userId);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Reservation>> getReservationsForUser() {
        List<Reservation> reservations = reservationService.findReservationsOfUser();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        return reservationService.findReservationById(id)
                .map(reservation -> new ResponseEntity<>(reservation, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Reservation> createReservation(
            @RequestBody ReservationDTO reservationDTO,
            Principal principal
    ) {
        try {
            Reservation createdReservation = reservationService.saveReservation(reservationDTO, principal);
            return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody ReservationDTO updateReservation) {
        try {
            Reservation updatedReservation = reservationService.updateReservation(id, updateReservation);
            return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationService.findReservationById(id);

        if(reservation.isPresent()){
            reservationService.deleteReservation(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT
            );
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

