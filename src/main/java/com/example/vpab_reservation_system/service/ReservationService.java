package com.example.vpab_reservation_system.service;

import com.example.vpab_reservation_system.dto.ReservationDTO;
import com.example.vpab_reservation_system.model.Additional;
import com.example.vpab_reservation_system.model.Reservation;
import com.example.vpab_reservation_system.model.User;
import com.example.vpab_reservation_system.repository.AdditionalRepository;
import com.example.vpab_reservation_system.repository.ReservationRepository;
import com.example.vpab_reservation_system.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.vpab_reservation_system.util.SecurityUtil.isAdmin;
import static com.example.vpab_reservation_system.util.SecurityUtil.isOwner;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final AdditionalRepository additionalRepository;

    public List<Reservation> findAllReservations() {
        if (isAdmin()) {
            return reservationRepository.findAll();
        } else {
            throw new RuntimeException("Permission denied");
        }
    }

    public List<Reservation> findReservationsOfUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();

            Optional<User> userOptional = userRepository.findUserByUsername(username);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Long userId = user.getId();
                return reservationRepository.findReservationByUserId(userId);
            } else {
                // Handle the case where the user is not found
                throw new RuntimeException("User not found for username: " + username);
            }
        } else {
            // Handle the case where there is no authenticated user
            throw new RuntimeException("No authenticated user found");
        }
    }

    public List<Reservation> findReservationsOfUser(Long id){
        if (isAdmin()) {

            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Long userId = user.getId();
                return reservationRepository.findReservationByUserId(userId);
            } else {

                throw new RuntimeException("User not found for id: " + id);
            }
        } else {
            throw new RuntimeException("No authenticated user found");
        }
    }


    public Optional<Reservation> findReservationById(Long id) {
        return Optional.ofNullable(reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found by id: " + id)));
    }

    public Reservation saveReservation(ReservationDTO reservationDTO, Principal principal) throws IllegalAccessException {
        if (principal instanceof Authentication authentication) {
            String username = authentication.getName();

            User user = userRepository.findUserByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException("User not found by username: " + username));

            Set<Long> ids = reservationDTO.getAdditionalIds();
            Set<Additional> additionals = ids.stream()
                    .map(id -> additionalRepository.findById(id)
                            .orElseThrow(() -> new EntityNotFoundException("Additional not found by id:" + id)))
                    .collect(Collectors.toSet());

            Reservation reservation = new Reservation();
            reservation.setName(reservationDTO.getName());
            reservation.setArrival(reservationDTO.getArrival());
            reservation.setDeparture(reservationDTO.getDeparture());
            reservation.setAdditionals(additionals);
            reservation.setUser(user);

            return reservationRepository.save(reservation);
        } else {
            throw new IllegalAccessException("Not Authenticated User");
        }
    }

    @Transactional
    public Reservation updateReservation(Long id, ReservationDTO updateReservation) throws IllegalAccessException {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found by id: " + id));

        if (isAdmin() || isOwner(existingReservation)) {
            BeanUtils.copyProperties(updateReservation, existingReservation, "id", "reservation");
            return reservationRepository.save(existingReservation);
        } else {
            throw new IllegalAccessException("Permission denied");
        }
    }

    public void deleteReservation(Long id) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (isAdmin() || existingReservation.getUser().getId().equals(getUserId(authentication))) {
            reservationRepository.deleteById(id);
        }else {
            throw new RuntimeException("Permission denied");
        }
    }

    private Long getUserId(Authentication authentication) {
        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            String username = userDetails.getUsername();

            // Retrieve the User entity from the repository using the username
            User user = userRepository.findUserByUsername(username).orElse(null);

            // Check if the user is not null and has a valid ID
            if (user != null && user.getId() != null) {
                return user.getId();
            }
        }
        return null;
    }
}
