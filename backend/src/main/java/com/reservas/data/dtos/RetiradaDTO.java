package com.reservas.data.dtos;

import java.time.LocalDate;
import java.util.List;

import com.reservas.data.MotivoRetirada;

public class RetiradaDTO {
    private LocalDate data;
    private LocalDate dataDevolucao;
    private String observacao;
    private MotivoRetirada motivoRetirada;
    private Long pessoaId;
    private List<ItensRetiradaDTO> itensRetirada;

    // Getters e Setters
    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
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

    public MotivoRetirada getMotivoRetirada() {
        return motivoRetirada;
    }

    public void setMotivoRetirada(MotivoRetirada motivoRetirada) {
        this.motivoRetirada = motivoRetirada;
    }

    public Long getPessoaId() {
        return pessoaId;
    }

    public void setPessoaId(Long pessoaId) {
        this.pessoaId = pessoaId;
    }

    public List<ItensRetiradaDTO> getItensRetirada() {
        return itensRetirada;
    }

    public void setItensRetirada(List<ItensRetiradaDTO> itensRetirada) {
        this.itensRetirada = itensRetirada;
    }
}
