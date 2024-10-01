package com.reservas.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "bem")
@AllArgsConstructor
@NoArgsConstructor
public class Bem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBem;

    private String descricao;

    private Boolean permiteReserva;

    @Enumerated(EnumType.STRING)  // Armazena o valor do enum como String no banco
    private StatusBem statusBem;

    @Enumerated(EnumType.STRING)  // Armazena o valor do enum como String no banco
    private TipoBem tipoBem;
}

