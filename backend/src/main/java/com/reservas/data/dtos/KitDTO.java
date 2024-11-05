package com.reservas.data.dtos;

import java.util.List;

public class KitDTO {
    private String nome;
    private List<Long> bemIds;

    // Getters and Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public List<Long> getBemIds() { return bemIds; }
    public void setBemIds(List<Long> bemIds) { this.bemIds = bemIds; }
}
