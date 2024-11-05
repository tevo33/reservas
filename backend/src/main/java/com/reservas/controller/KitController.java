package com.reservas.controller;

import com.reservas.data.Kit;
import com.reservas.data.dtos.KitDTO;
import com.reservas.service.KitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kits")
public class KitController {

    @Autowired
    private KitService kitService;

    @GetMapping
    public List<Kit> listarTodos() {
        return kitService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kit> buscarPorId(@PathVariable Long id) {
        Optional<Kit> kit = kitService.buscarPorId(id);
        return kit.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Kit> criarKit(@RequestBody KitDTO kitDTO) {
        try {
            Kit kitCriado = kitService.criarKit(kitDTO);
            return ResponseEntity.ok(kitCriado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kit> atualizarKit(@PathVariable Long id, @RequestBody Kit kitAtualizado) {
        try {
            Kit kitAtualizadoResult = kitService.atualizarKit(id, kitAtualizado);
            return ResponseEntity.ok(kitAtualizadoResult);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarKit(@PathVariable Long id) {
        kitService.deletarKit(id);
        return ResponseEntity.noContent().build();
    }
}
