package com.reservas.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "itens_reserva")
public class ItensReserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "id_reserva")
    private Reserva reserva;
    
    @ManyToOne
    @JoinColumn(name = "id_bem")
    private Bem bem;
    
    private Integer quantidadeBem;
}
