package com.reservas.service;

import com.reservas.data.Kit;
import com.reservas.data.dtos.KitDTO;
import com.reservas.data.Bem;
import com.reservas.data.ItensKit;
import com.reservas.data.repository.BemRepository;
import com.reservas.data.repository.KitRepository;
import com.reservas.data.repository.ItensKitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KitService {

    @Autowired
    private KitRepository kitRepository;

    @Autowired
    private BemRepository bemRepository;

@Transactional
public Kit criarKit(KitDTO kitDTO) {
    Kit kit = new Kit();
    kit.setNome(kitDTO.getNome());

    List<ItensKit> itensKitList = new ArrayList<>();

    for (Long bemId : kitDTO.getBemIds()) {
        Bem bem = bemRepository.findById(bemId)
            .orElseThrow(() -> new RuntimeException("Bem não encontrado"));

        ItensKit itensKit = new ItensKit();
        itensKit.setBem(bem);
        itensKit.setKit(kit);

        itensKitList.add(itensKit);
    }

    kit.setItens(itensKitList);

    return kitRepository.save(kit);
}

    public List<Kit> listarTodos() {
        return kitRepository.findAll();
    }

    public Optional<Kit> buscarPorId(Long id) {
        return kitRepository.findById(id);
    }

    @Transactional
    public Kit atualizarKit(Long id, Kit kitAtualizado) {
        Kit kitExistente = kitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kit não encontrado"));

        kitExistente.setNome(kitAtualizado.getNome());
        kitExistente.getItens().clear();
        kitExistente.getItens().addAll(kitAtualizado.getItens());

        for (ItensKit item : kitExistente.getItens()) {
            item.setKit(kitExistente);
            if (item.getBem() != null && item.getBem().getIdBem() != null) {
                item.setBem(bemRepository.findById(item.getBem().getIdBem())
                                         .orElseThrow(() -> new RuntimeException("Bem não encontrado")));
            }
        }

        return kitRepository.save(kitExistente);
    }

    public void deletarKit(Long id) {
        kitRepository.deleteById(id);
    }
}
