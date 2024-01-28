package com.example.vpab_reservation_system.util;

import com.example.vpab_reservation_system.model.Reservation;
import com.example.vpab_reservation_system.model.Role;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static boolean isAdmin() {
        Authentication authentication = getCurrentAuthentication();
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(Role.ADMIN.name()));
    }

    public static boolean isOwner(Reservation reservation) {
        Authentication authentication = getCurrentAuthentication();
        return authentication != null && reservation != null && reservation.getUser().equals(authentication.getName());
    }

    public static Authentication getCurrentAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
