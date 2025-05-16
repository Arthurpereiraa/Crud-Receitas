package br.edu.senaisp.receitas.repository;

import br.edu.senaisp.receitas.model.Receita;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReceitaRepository extends MongoRepository<Receita, String> {
}
