package com.reservas.controller;

import com.reservas.data.ItensRetirada;
import com.reservas.data.Retirada;
import com.reservas.service.ItensRetiradaService;
import com.reservas.service.RetiradaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/retiradas")
public class RetiradaController {

    @Autowired
    private RetiradaService retiradaService;

    @Autowired
    private ItensRetiradaService itensRetiradaService;

    @GetMapping
    public List<Retirada> listarTodas() {
        return retiradaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Retirada> buscarPorId(@PathVariable Long id) {
        Optional<Retirada> retirada = retiradaService.buscarPorId(id);
        return retirada.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Retirada criarRetirada(@RequestBody Retirada retirada) {
        Retirada novaRetirada = retiradaService.criarRetirada(retirada);

        for (ItensRetirada item : retirada.getItensRetirada()) {
            item.setRetirada(novaRetirada);
            itensRetiradaService.salvarItensRetirada(item);
        }

        return novaRetirada;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRetirada(@PathVariable Long id) {
        retiradaService.deletarRetirada(id);
        return ResponseEntity.noContent().build();
    }
}
