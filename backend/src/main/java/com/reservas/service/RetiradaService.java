package com.reservas.service;

import com.reservas.data.Retirada;
import com.reservas.data.repository.RetiradaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RetiradaService {

    @Autowired
    private RetiradaRepository retiradaRepository;

    public List<Retirada> listarTodas() {
        return retiradaRepository.findAll();
    }

    public Optional<Retirada> buscarPorId(Long idRetirada) {
        return retiradaRepository.findById(idRetirada);
    }

    public Retirada criarRetirada(Retirada retirada) {
        return retiradaRepository.save(retirada);
    }
    public Retirada atualizarRetirada(Retirada retirada) {
        return retiradaRepository.save(retirada);
    }
    public void deletarRetirada(Long idRetirada) {
        retiradaRepository.deleteById(idRetirada);
    }
}
