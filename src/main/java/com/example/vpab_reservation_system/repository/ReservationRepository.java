package com.example.vpab_reservation_system.repository;

import com.example.vpab_reservation_system.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findReservationByName(String name);

    List<Reservation> findReservationByUserId(Long userId);
}