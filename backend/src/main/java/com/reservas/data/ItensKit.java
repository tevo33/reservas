package com.reservas.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "itens_kit")
public class ItensKit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_kit", nullable = false)
    private Kit kit;

    @ManyToOne
    @JoinColumn(name = "id_bem", nullable = false)
    private Bem bem;
}
