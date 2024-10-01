package com.reservas.controller;

import com.reservas.data.Bem;
import com.reservas.service.BemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bens")
public class BemController {

    @Autowired
    private BemService bemService;

    // Listar todos os bens
    @GetMapping
    public List<Bem> listarTodos() {
        return bemService.listarTodos();
    }

    // Buscar bem por ID
    @GetMapping("/{id}")
    public ResponseEntity<Bem> buscarPorId(@PathVariable Long id) {
        Optional<Bem> bem = bemService.buscarPorId(id);
        return bem.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Criar um novo bem
    @PostMapping
    public Bem criarBem(@RequestBody Bem bem) {
        return bemService.criarBem(bem);
    }

    // Atualizar um bem existente
    @PutMapping("/{id}")
    public ResponseEntity<Bem> atualizarBem(@PathVariable Long id, @RequestBody Bem bemAtualizado) {
        try {
            return ResponseEntity.ok(bemService.atualizarBem(id, bemAtualizado));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar um bem
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarBem(@PathVariable Long id) {
        bemService.deletarBem(id);
        return ResponseEntity.noContent().build();
    }
}
