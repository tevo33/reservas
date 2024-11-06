package com.reservas.data.dtos;

import java.time.LocalDate;
import java.util.List;

public class DevolucaoDTO {
    private Long retiradaId;
    private LocalDate dataDevolucao;
    private String observacao;
    private List<ItensRetiradaDTO> itensRetirada;

    // Getters e Setters

    public Long getRetiradaId() {
        return retiradaId;
    }

    public void setRetiradaId(Long retiradaId) {
        this.retiradaId = retiradaId;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public List<ItensRetiradaDTO> getItensRetirada() {
        return itensRetirada;
    }

    public void setItensRetirada(List<ItensRetiradaDTO> itensRetirada) {
        this.itensRetirada = itensRetirada;
    }
}
