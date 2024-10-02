package com.reservas.data.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String codigo;
    private String senha;
}