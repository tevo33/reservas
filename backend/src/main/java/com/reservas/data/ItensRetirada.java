package com.reservas.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "itens_retirada")
public class ItensRetirada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "id_retirada")
    private Retirada retirada;
    
    @ManyToOne
    @JoinColumn(name = "id_bem")
    private Bem bem;
    
    private Integer quantidadeBem;
}
