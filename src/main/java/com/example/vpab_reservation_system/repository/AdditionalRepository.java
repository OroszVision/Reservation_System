package com.example.vpab_reservation_system.repository;

import com.example.vpab_reservation_system.model.Additional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdditionalRepository extends JpaRepository<Additional, Long> {
    List<Additional> findByAvailableTrue();
}