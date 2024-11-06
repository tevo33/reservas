package com.reservas.controller;

import com.reservas.data.Bem;
import com.reservas.data.ItensRetirada;
import com.reservas.data.Pessoa;
import com.reservas.data.Retirada;
import com.reservas.data.dtos.DevolucaoDTO;
import com.reservas.data.dtos.ItensRetiradaDTO;
import com.reservas.data.dtos.RetiradaDTO;
import com.reservas.service.BemService;
import com.reservas.service.ItensRetiradaService;
import com.reservas.service.PessoaService;
import com.reservas.service.RetiradaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
        Optional<Pessoa> pessoaOpt = pessoaService.buscarPorId(retiradaDTO.getPessoaId());

        if (!pessoaOpt.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Retirada retirada = new Retirada();
        retirada.setDataRetirada(retiradaDTO.getData());
        retirada.setDataLimite(retiradaDTO.getDataDevolucao());
        retirada.setDataDevolucao(null);  // Ainda não devolvido
        retirada.setObservacao(retiradaDTO.getObservacao());
        retirada.setMotivoRetirada(retiradaDTO.getMotivoRetirada());
        retirada.setPessoa(pessoaOpt.get());

        Retirada novaRetirada = retiradaService.criarRetirada(retirada);

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

            // Atualizar a quantidade do bem
            // bemService.decrementarQuantidade(itemDTO.getBemId(), itemDTO.getQuantidade());
        }

        novaRetirada.setItensRetirada(itens);
        return ResponseEntity.ok(novaRetirada);
    }

    @PutMapping("/devolver")
    public ResponseEntity<Retirada> devolver(@RequestBody DevolucaoDTO devolucaoDTO) {
        Optional<Retirada> retiradaOpt = retiradaService.buscarPorId(devolucaoDTO.getRetiradaId());

        if (!retiradaOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Retirada retirada = retiradaOpt.get();

        // Verificar se já foi devolvido
        if (retirada.getDataDevolucao() != null) {
            return ResponseEntity.badRequest().body(null);
        }

        retirada.setDataDevolucao(devolucaoDTO.getDataDevolucao());
        // retirada.setObservacao(devolucaoDTO.getObservacao());

        // Atualizar a quantidade dos bens
        // for (ItensRetirada item : retirada.getItensRetirada()) {
        //     bemService.incrementarQuantidade(item.getBem().getIdBem(), item.getQuantidadeBem());
        // }

        retiradaService.atualizarRetirada(retirada);

        return ResponseEntity.ok(retirada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRetirada(@PathVariable Long id) {
        retiradaService.deletarRetirada(id);
        return ResponseEntity.noContent().build();
    }
}
