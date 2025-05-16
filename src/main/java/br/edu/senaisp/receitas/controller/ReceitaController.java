package br.edu.senaisp.receitas.controller;

import br.edu.senaisp.receitas.dto.ReceitaRequestDTO;
import br.edu.senaisp.receitas.dto.ReceitaResponseDTO;
import br.edu.senaisp.receitas.service.ReceitaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/receitas")
@RequiredArgsConstructor
@Tag(name = "Receitas", description = "API para gerenciamento de receitas doces e salgadas")
public class ReceitaController {

    private final ReceitaService service;

    @PostMapping
    @Operation(summary = "Criar receita", description = "Cadastro de nova receita doce ou salgada")
    @ApiResponse(responseCode = "201", description = "Receita criada com sucesso")
    public ResponseEntity<ReceitaResponseDTO> criar(
            @Valid @RequestBody ReceitaRequestDTO dto
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarReceita(dto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar receita por ID")
    @ApiResponse(responseCode = "200", description = "Receita encontrada")
    @ApiResponse(responseCode = "404", description = "Receita não encontrada")
    public ResponseEntity<ReceitaResponseDTO> buscarPorId(
            @Parameter(description = "ID da receita", example = "605c72ef4f1a2563a8f1b234")
            @PathVariable String id
    ) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping
    @Operation(summary = "Listar receitas", description = "Listagem paginada de receitas")
    public ResponseEntity<Page<ReceitaResponseDTO>> listar(
            @Parameter(description = "Parâmetros de paginação")
            @PageableDefault(size = 10, sort = "titulo") Pageable pageable
    ) {
        return ResponseEntity.ok(service.listarReceitas(pageable));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar receita")
    @ApiResponse(responseCode = "200", description = "Receita atualizada")
    @ApiResponse(responseCode = "404", description = "Receita não encontrada")
    public ResponseEntity<ReceitaResponseDTO> atualizar(
            @PathVariable String id,
            @Valid @RequestBody ReceitaRequestDTO dto
    ) {
        return ResponseEntity.ok(service.atualizarReceita(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Excluir receita")
    @ApiResponse(responseCode = "204", description = "Receita excluída")
    @ApiResponse(responseCode = "404", description = "Receita não encontrada")
    public void excluir(@PathVariable String id) {
        service.excluirReceita(id);
    }
}
