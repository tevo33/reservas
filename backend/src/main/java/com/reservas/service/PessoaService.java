package com.reservas.service;

import com.reservas.data.Pessoa;
import com.reservas.data.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<Pessoa> listarTodas() {
        return pessoaRepository.findAll();
    }

    public Optional<Pessoa> buscarPorId(Long idPessoa) {
        return pessoaRepository.findById(idPessoa);
    }

    public Optional<Pessoa> buscarPorCodigo(String nome) {
        return pessoaRepository.findByCodigo(nome);
    }

    public Pessoa criarPessoa(Pessoa pessoa) {
        String senhaCriptografada = passwordEncoder.encode(pessoa.getSenha());
        pessoa.setSenha(senhaCriptografada);
        return pessoaRepository.save(pessoa);
    }

    public void deletarPessoa(Long idPessoa) {
        pessoaRepository.deleteById(idPessoa);
    }

    public boolean validarSenha(String senhaDigitada, String senhaArmazenada) {
        return passwordEncoder.matches(senhaDigitada, senhaArmazenada);
    }

    public Optional<Pessoa> verificarCodigoESenha(String codigo, String senhaDigitada) {
        Optional<Pessoa> pessoa = pessoaRepository.findByCodigo(codigo);
        if (pessoa.isPresent()) {
            if (passwordEncoder.matches(senhaDigitada, pessoa.get().getSenha())) {
                return pessoa;
            }
        }
        return Optional.empty();
    }
}
