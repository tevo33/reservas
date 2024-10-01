package com.reservas;

import com.reservas.data.Bem;
import com.reservas.data.StatusBem;
import com.reservas.data.TipoBem;
import com.reservas.service.BemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReservasBackendApplication implements CommandLineRunner {

    @Autowired
    private BemService bemService;

    public static void main(String[] args) {
        SpringApplication.run(ReservasBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Testando conexão e operações de banco de dados...");

        // Criando um novo Bem com enums
        Bem novoBem = new Bem();
        novoBem.setDescricao("Projetor");
        novoBem.setPermiteReserva(true);
        novoBem.setStatusBem(StatusBem.DISPONIVEL); 
        novoBem.setTipoBem(TipoBem.EQUIPAMENTO);
        Bem bemSalvo = bemService.criarBem(novoBem);

        System.out.println("Bem salvo: " + bemSalvo.getDescricao());

        // Recuperando o Bem pelo ID
        Bem bemRecuperado = bemService.buscarPorId(bemSalvo.getIdBem()).orElse(null);
        if (bemRecuperado != null) {
            System.out.println("Bem recuperado do banco de dados: " + bemRecuperado.getDescricao());
        } else {
            System.out.println("Erro: Bem não encontrado.");
        }
    }
}
