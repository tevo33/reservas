package com.reservas.config;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.reservas.data.Pessoa;

public class CustomUserDetails implements UserDetails {

    private Pessoa user;

    public CustomUserDetails(Pessoa user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() 
    {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getSenha();
    }

    @Override
    public String getUsername() {
        return user.getNome();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
}