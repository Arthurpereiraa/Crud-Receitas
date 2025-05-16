package br.edu.senaisp.receitas.exception;

public class ReceitaNotFoundException extends RuntimeException {
    public ReceitaNotFoundException(String id) {
        super("Receita não encontrada com ID: " + id);
    }
}
