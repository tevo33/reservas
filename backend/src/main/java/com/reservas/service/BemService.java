package com.reservas.service;

import com.reservas.data.Bem;
import com.reservas.data.repository.BemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BemService {

    @Autowired
    private BemRepository bemRepository;

    public List<Bem> listarTodos() {
        return bemRepository.findAll();
    }

    public Optional<Bem> buscarPorId(Long idBem) {
        return bemRepository.findById(idBem);
    }

    @Transactional
    public Bem criarBem(Bem bem) {
        return bemRepository.save(bem);
    }

    @Transactional
    public Bem atualizarBem(Long idBem, Bem bemAtualizado) {
        Optional<Bem> bemExistente = bemRepository.findById(idBem);
        if (bemExistente.isPresent()) {
            Bem bem = bemExistente.get();
            bem.setDescricao(bemAtualizado.getDescricao());
            bem.setPermiteReserva(bemAtualizado.getPermiteReserva());
            bem.setStatusBem(bemAtualizado.getStatusBem());
            bem.setTipoBem(bemAtualizado.getTipoBem());
            return bemRepository.save(bem);
        } else {
            throw new RuntimeException("Bem não encontrado");
        }
    }

    @Transactional
    public void deletarBem(Long idBem) {
        bemRepository.deleteById(idBem);
    }
}
