package com.reservas.service;

import com.reservas.data.Reserva;
import com.reservas.data.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> buscarPorId(Long idReserva) {
        return reservaRepository.findById(idReserva);
    }

    public Reserva criarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public void deletarReserva(Long idReserva) {
        reservaRepository.deleteById(idReserva);
    }
}
