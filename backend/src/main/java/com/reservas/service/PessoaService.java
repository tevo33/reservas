package com.reservas.service;

import com.reservas.data.Pessoa;
import com.reservas.data.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public List<Pessoa> listarTodas() {
        return pessoaRepository.findAll();
    }

    public Optional<Pessoa> buscarPorId(Long idPessoa) {
        return pessoaRepository.findById(idPessoa);
    }

    public Pessoa criarPessoa(Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    public void deletarPessoa(Long idPessoa) {
        pessoaRepository.deleteById(idPessoa);
    }

    public Optional<Pessoa> verificarCodigoESenha(String codigo, String senha) {
        Optional<Pessoa> pessoa = pessoaRepository.findByCodigo(codigo);
        if (pessoa.isPresent() && pessoa.get().getSenha().equals(senha)) {
            return pessoa;
        }
        return Optional.empty();
    }
}
