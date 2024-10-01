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

    // Salvar um novo ItensRetirada
    public ItensRetirada salvarItensRetirada(ItensRetirada itensRetirada) {
        return itensRetiradaRepository.save(itensRetirada);
    }

    // Buscar todos os itens de retirada
    public List<ItensRetirada> listarTodos() {
        return itensRetiradaRepository.findAll();
    }

    // Buscar ItensRetirada por ID
    public Optional<ItensRetirada> buscarPorId(Long id) {
        return itensRetiradaRepository.findById(id);
    }

    // Deletar ItensRetirada por ID
    public void deletarItensRetirada(Long id) {
        itensRetiradaRepository.deleteById(id);
    }
}
