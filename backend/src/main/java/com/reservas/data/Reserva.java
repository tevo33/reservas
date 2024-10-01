package com.reservas.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;
    
    @ManyToOne
    @JoinColumn(name = "id_pessoa")
    private Pessoa pessoa;
    
    private LocalDate dataReserva;
    private LocalDate dataValidadeReserva;
    
    @OneToMany(mappedBy = "reserva")
    private List<ItensReserva> itensReserva;
}
