package com.reservas.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// Importações adicionais
import org.springframework.stereotype.Service;

import com.reservas.data.Pessoa;
import com.reservas.data.repository.PessoaRepository;

@Service 
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PessoaRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
    {
        Pessoa user = userRepository.findByCodigo(username).get();
        
        if (user == null) 
        {
            throw new UsernameNotFoundException("Usuário não encontrado");
        }

        return new CustomUserDetails(user);
    }
}
