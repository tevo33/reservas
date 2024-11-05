package com.reservas.data.repository;

import com.reservas.data.ItensKit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItensKitRepository extends JpaRepository<ItensKit, Long> {
}
