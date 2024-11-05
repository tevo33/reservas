package com.reservas.data.dtos;

public class ItensRetiradaDTO {
    private Long bemId;
    private int quantidade;

    // Getters e Setters
    public Long getBemId() {
        return bemId;
    }

    public void setBemId(Long bemId) {
        this.bemId = bemId;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
