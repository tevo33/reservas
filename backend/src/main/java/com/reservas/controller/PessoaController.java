package com.reservas.controller;

import com.reservas.config.JwtTokenUtil;
import com.reservas.data.Pessoa;
import com.reservas.data.dtos.JwtResponse;
import com.reservas.data.dtos.LoginRequest;
import com.reservas.service.PessoaService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController 
{
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final PessoaService pessoaService;

    @Autowired
    public PessoaController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, PessoaService pessoaService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.pessoaService = pessoaService;
    }

    @GetMapping
    public List<Pessoa> listarTodas() {
        return pessoaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> buscarPorId(@PathVariable Long id) {
        Optional<Pessoa> pessoa = pessoaService.buscarPorId(id);
        return pessoa.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pessoa criarPessoa(@RequestBody Pessoa pessoa) {
        return pessoaService.criarPessoa(pessoa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPessoa(@PathVariable Long id) {
        pessoaService.deletarPessoa(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> verificarCodigoESenha(@RequestBody LoginRequest loginRequest) 
    {
        try 
        {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken( loginRequest.getCodigo(), loginRequest.getSenha() ) );
                            
            String token = jwtTokenUtil.generateToken(loginRequest.getCodigo());

            return ResponseEntity.ok(new JwtResponse(token));
        }
        
        catch (Exception e) 
        {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        } 
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        return ResponseEntity.ok("Logout bem-sucedido");
    }
}