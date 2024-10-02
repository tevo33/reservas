package com.reservas.service;

import com.reservas.data.ItensReserva;
import com.reservas.data.repository.ItensReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItensReservaService {

    @Autowired
    private ItensReservaRepository itensReservaRepository;

    public ItensReserva salvarItensReserva(ItensReserva itensReserva) {
        return itensReservaRepository.save(itensReserva);
    }

    public List<ItensReserva> listarTodos() {
        return itensReservaRepository.findAll();
    }

    public Optional<ItensReserva> buscarPorId(Long id) {
        return itensReservaRepository.findById(id);
    }

    public void deletarItensReserva(Long id) {
        itensReservaRepository.deleteById(id);
    }
}
