package br.edu.senaisp.receitas.repository;

import br.edu.senaisp.receitas.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
}
