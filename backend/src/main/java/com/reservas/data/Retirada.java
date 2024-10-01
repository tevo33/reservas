package com.reservas.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "retirada")
@AllArgsConstructor
@NoArgsConstructor
public class Retirada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRetirada;
    
    @ManyToOne
    @JoinColumn(name = "id_pessoa")
    private Pessoa pessoa;
    
    private LocalDate dataRetirada;
    private LocalDate dataDevolucao;
    private LocalDate dataLimite;
    
    @OneToMany(mappedBy = "retirada")
    private List<ItensRetirada> itensRetirada;
    
    @ManyToOne
    @JoinColumn(name = "id_motivo_retirada", referencedColumnName = "idMotivo")
    private MotivoRetirada motivoRetirada;
    
    private String observacao;
}