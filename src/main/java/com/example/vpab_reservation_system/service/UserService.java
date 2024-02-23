package com.example.vpab_reservation_system.service;

import com.example.vpab_reservation_system.dto.UserDetailsResponseDTO;
import com.example.vpab_reservation_system.model.Reservation;
import com.example.vpab_reservation_system.model.Role;
import com.example.vpab_reservation_system.model.User;
import com.example.vpab_reservation_system.repository.ReservationRepository;
import com.example.vpab_reservation_system.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.example.vpab_reservation_system.util.SecurityUtil.isAdmin;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;


    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @Transactional
    public void promoteToAdmin(Long id) throws IllegalAccessException {
        if (isAdmin()) {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setRole(Role.ADMIN);
                userRepository.save(user);
            } else {
                throw new EntityNotFoundException("User not found with id: " + id);
            }
        } else {
            throw new IllegalAccessException("Only ADMIN can promote users to admin.");
        }
    }

    @Transactional
    public void demoteToUser(Long id) throws IllegalAccessException {
        if (isAdmin()) {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setRole(Role.USER);
                userRepository.save(user);
            } else {
                throw new EntityNotFoundException("User not found with id " + id);
            }
        } else {
            throw new IllegalAccessException("Only ADMIN can demote users to regular users.");
        }
    }

    public UserDetailsResponseDTO getUserDetailsById(Long userId) throws IllegalAccessException {
        if (isAdmin()) {
            Optional<User> userOptional = userRepository.findUserDetailsById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                List<Reservation> reservations = reservationRepository.findReservationByUserId(userId);
                return UserDetailsResponseDTO.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .reservations(reservations)
                        .build();
            } else {
                throw new EntityNotFoundException("User not found by id: " + userId);
            }
        } else {
            throw new IllegalAccessException("Only admins are allowed to access this method.");
        }
    }

}
