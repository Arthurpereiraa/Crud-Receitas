package br.edu.senaisp.receitas.dto;

import br.edu.senaisp.receitas.model.CategoriaReceita;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ReceitaResponseDTO(

        @Schema(description = "ID único da receita", example = "1")
        Long id,

        @Schema(description = "Título da receita", example = "Bolo de Chocolate")
        String titulo,

        @Schema(description = "Descrição detalhada", example = "Bolo fofinho com cobertura...")
        String descricao,

        @Schema(description = "Ingredientes", example = "Farinha, Ovos, Chocolate")
        String ingredientes,

        @Schema(description = "Modo de preparo", example = "Misture os ingredientes...")
        String modoPreparo,

        @Schema(description = "URL da imagem", example = "https://exemplo.com/bolo.jpg")
        String imagemUrl,

        @Schema(description = "Categoria da receita", example = "DOCE")
        CategoriaReceita categoria

) {}
