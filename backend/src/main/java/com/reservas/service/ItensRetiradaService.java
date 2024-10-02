package com.reservas.service;

import com.reservas.data.ItensRetirada;
import com.reservas.data.repository.ItensRetiradaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItensRetiradaService {

    @Autowired
    private ItensRetiradaRepository itensRetiradaRepository;

    public ItensRetirada salvarItensRetirada(ItensRetirada itensRetirada) {
        return itensRetiradaRepository.save(itensRetirada);
    }

    public List<ItensRetirada> listarTodos() {
        return itensRetiradaRepository.findAll();
    }

    public Optional<ItensRetirada> buscarPorId(Long id) {
        return itensRetiradaRepository.findById(id);
    }

    public void deletarItensRetirada(Long id) {
        itensRetiradaRepository.deleteById(id);
    }
}
