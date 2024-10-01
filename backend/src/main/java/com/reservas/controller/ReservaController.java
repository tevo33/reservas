package com.reservas.controller;

import com.reservas.data.ItensReserva;
import com.reservas.data.Reserva;
import com.reservas.service.ItensReservaService;
import com.reservas.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private ItensReservaService itensReservaService;

    @GetMapping
    public List<Reserva> listarTodas() {
        return reservaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> buscarPorId(@PathVariable Long id) {
        Optional<Reserva> reserva = reservaService.buscarPorId(id);
        return reserva.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reserva criarReserva(@RequestBody Reserva reserva) {
        // Salvando a reserva principal
        Reserva novaReserva = reservaService.criarReserva(reserva);

        // Salvando os itens da reserva
        for (ItensReserva item : reserva.getItensReserva()) {
            item.setReserva(novaReserva);  // Associando a reserva aos itens
            itensReservaService.salvarItensReserva(item);  // Salvando os itens
        }

        return novaReserva;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarReserva(@PathVariable Long id) {
        reservaService.deletarReserva(id);
        return ResponseEntity.noContent().build();
    }
}
