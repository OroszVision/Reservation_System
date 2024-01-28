package com.example.vpab_reservation_system.service;

import com.example.vpab_reservation_system.model.Role;
import com.example.vpab_reservation_system.model.User;
import com.example.vpab_reservation_system.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.example.vpab_reservation_system.util.SecurityUtil.isAdmin;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void promoteToAdmin(Long id) {
        if (isAdmin()) {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setRole(Role.ADMIN);
                userRepository.save(user);
            } else {
                throw new RuntimeException("User not found with id: " + id);
            }
        } else {
            throw new RuntimeException("Only ADMIN can promote users to admin.");
        }
    }

    @Transactional
    public void demoteToUser(Long id) {
        if (isAdmin()) {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setRole(Role.USER);
                userRepository.save(user);
            } else {
                throw new RuntimeException("User not found with id " + id);
            }
        } else {
            throw new RuntimeException("Only ADMIN can demote users to regular users.");
        }
    }

}
