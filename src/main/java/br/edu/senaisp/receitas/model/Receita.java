package br.edu.senaisp.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "receitas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único da receita", example = "1")
    private Long id;

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
    @Enumerated(EnumType.STRING)
    @Schema(description = "Categoria da receita", example = "DOCE")
    private CategoriaReceita categoria;
}
