package com.reservas.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "pessoa")
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPessoa;

    private String nome;

    @ManyToOne
    @JoinColumn(name = "id_tipo_pessoa", referencedColumnName = "idTipoPessoa")
    private TipoPessoa tipoPessoa;
}