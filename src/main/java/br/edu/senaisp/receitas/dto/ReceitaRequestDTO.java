package br.edu.senaisp.receitas.dto;

import br.edu.senaisp.receitas.model.CategoriaReceita;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record ReceitaRequestDTO(

        @NotBlank(message = "Título é obrigatório")
        @Size(max = 100)
        @Schema(description = "Título da receita", example = "Bolo de Chocolate", requiredMode = Schema.RequiredMode.REQUIRED)
        String titulo,

        @NotBlank(message = "Descrição é obrigatória")
        @Schema(description = "Descrição detalhada", example = "Bolo fofinho com cobertura...", requiredMode = Schema.RequiredMode.REQUIRED)
        String descricao,

        @NotBlank(message = "Ingredientes são obrigatórios")
        @Schema(description = "Ingredientes separados por vírgula", example = "Farinha, Ovos, Chocolate", requiredMode = Schema.RequiredMode.REQUIRED)
        String ingredientes,

        @NotBlank(message = "Modo de preparo é obrigatório")
        @Schema(description = "Passo a passo", example = "Misture os ingredientes...", requiredMode = Schema.RequiredMode.REQUIRED)
        String modoPreparo,

        @Size(max = 255)
        @Schema(description = "URL da imagem (opcional)", example = "https://exemplo.com/bolo.jpg")
        String imagemUrl,

        @NotNull(message = "Categoria é obrigatória")
        @Schema(description = "Categoria da receita", example = "DOCE", requiredMode = Schema.RequiredMode.REQUIRED)
        CategoriaReceita categoria
) {}
