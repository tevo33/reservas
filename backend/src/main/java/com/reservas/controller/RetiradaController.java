package com.reservas.controller;

import com.reservas.data.Bem;
import com.reservas.data.ItensRetirada;
import com.reservas.data.Pessoa;
import com.reservas.data.Retirada;
import com.reservas.data.dtos.ItensRetiradaDTO;
import com.reservas.data.dtos.RetiradaDTO;
import com.reservas.service.BemService;
import com.reservas.service.ItensRetiradaService;
import com.reservas.service.PessoaService;
import com.reservas.service.RetiradaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/retiradas")
public class RetiradaController {

    @Autowired
    private RetiradaService retiradaService;

    @Autowired
    private ItensRetiradaService itensRetiradaService;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private BemService bemService;

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
    public ResponseEntity<Retirada> criarRetirada(@RequestBody RetiradaDTO retiradaDTO) {
        // Buscar a Pessoa pelo ID
        Optional<Pessoa> pessoaOpt = pessoaService.buscarPorId(retiradaDTO.getPessoaId());
        if (!pessoaOpt.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
    
        Retirada retirada = new Retirada();
        retirada.setDataRetirada(retiradaDTO.getData());
        retirada.setDataDevolucao(retiradaDTO.getDataDevolucao());
        retirada.setObservacao(retiradaDTO.getObservacao());
        retirada.setMotivoRetirada(retiradaDTO.getMotivoRetirada());
        retirada.setPessoa(pessoaOpt.get());
    
        // Salvar a retirada para gerar o ID
        Retirada novaRetirada = retiradaService.criarRetirada(retirada);
    
        // Processar os itens de retirada
        List<ItensRetirada> itens = new ArrayList<>();
        for (ItensRetiradaDTO itemDTO : retiradaDTO.getItensRetirada()) {
            Optional<Bem> bemOpt = bemService.buscarPorId(itemDTO.getBemId());
            if (!bemOpt.isPresent()) {
                return ResponseEntity.badRequest().build();
            }
    
            ItensRetirada item = new ItensRetirada();
            item.setRetirada(novaRetirada);
            item.setBem(bemOpt.get());
            item.setQuantidadeBem(itemDTO.getQuantidade());
            itensRetiradaService.salvarItensRetirada(item);
            itens.add(item);
        }
    
        novaRetirada.setItensRetirada(itens);
        return ResponseEntity.ok(novaRetirada);
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRetirada(@PathVariable Long id) {
        retiradaService.deletarRetirada(id);
        return ResponseEntity.noContent().build();
    }
}
