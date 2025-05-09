package br.edu.senaisp.receitas.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Categoria da receita")
public enum CategoriaReceita {
    DOCE,
    SALGADO
}
