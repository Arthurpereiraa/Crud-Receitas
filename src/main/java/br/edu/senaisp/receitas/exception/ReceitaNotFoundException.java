package br.edu.senaisp.receitas.exception;

public class ReceitaNotFoundException extends RuntimeException {
    public ReceitaNotFoundException(Long id) {
        super("Receita não encontrada com ID: " + id);
    }
}
