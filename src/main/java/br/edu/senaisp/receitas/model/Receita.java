package br.edu.senaisp.receitas.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "receitas")
public class Receita {

    @Id
    @Schema(description = "ID único da receita", example = "605c72ef4f1a2563a8f1b234")
    private String id;

    @NotBlank(message = "Título é obrigatório")
    @Size(max = 100, message = "Título deve ter no máximo 100 caracteres")
    @Schema(description = "Título da receita", example = "Bolo de Chocolate")
    private String titulo;

    @NotBlank(message = "Descrição é obrigatória")
    @Schema(description = "Descrição detalhada da receita", example = "Bolo fofinho com cobertura de chocolate")
    private String descricao;

    @NotBlank(message = "Ingredientes são obrigatórios")
    @Schema(description = "Lista de ingredientes separados por vírgula", example = "Farinha, Ovos, Chocolate")
    private String ingredientes;

    @NotBlank(message = "Modo de preparo é obrigatório")
    @Schema(description = "Passo a passo do preparo", example = "Misture todos os ingredientes...")
    private String modoPreparo;

    @Size(max = 255, message = "URL da imagem deve ter no máximo 255 caracteres")
    @Schema(description = "URL da imagem da receita", example = "https://exemplo.com/bolo.jpg")
    private String imagemUrl;

    @NotNull(message = "Categoria é obrigatória")
    @Schema(description = "Categoria da receita", example = "DOCE")
    private CategoriaReceita categoria;
}
