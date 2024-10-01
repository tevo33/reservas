package com.reservas.data;

import jakarta.persistence.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "motivo_retirada")
@AllArgsConstructor
@NoArgsConstructor
public class MotivoRetirada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMotivo;

    @Column(nullable = false, unique = true)
    private String motivo;
}