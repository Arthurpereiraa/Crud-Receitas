package br.edu.senaisp.receitas.util;

import br.edu.senaisp.receitas.dto.ReceitaRequestDTO;
import br.edu.senaisp.receitas.dto.ReceitaResponseDTO;
import br.edu.senaisp.receitas.model.Receita;
import org.springframework.stereotype.Component;

@Component
public class ReceitaMapper {

    public Receita toEntity(ReceitaRequestDTO dto) {
        return Receita.builder()
                .titulo(dto.titulo())
                .descricao(dto.descricao())
                .ingredientes(dto.ingredientes())
                .modoPreparo(dto.modoPreparo())
                .imagemUrl(dto.imagemUrl())
                .categoria(dto.categoria())
                .build();
    }

    public ReceitaResponseDTO toResponseDTO(Receita entity) {
        return ReceitaResponseDTO.builder()
                .id(entity.getId())
                .titulo(entity.getTitulo())
                .descricao(entity.getDescricao())
                .ingredientes(entity.getIngredientes())
                .modoPreparo(entity.getModoPreparo())
                .imagemUrl(entity.getImagemUrl())
                .categoria(entity.getCategoria())
                .build();
    }

    public void updateEntity(ReceitaRequestDTO dto, Receita entity) {
        if (dto.titulo() != null) entity.setTitulo(dto.titulo());
        if (dto.descricao() != null) entity.setDescricao(dto.descricao());
        if (dto.ingredientes() != null) entity.setIngredientes(dto.ingredientes());
        if (dto.modoPreparo() != null) entity.setModoPreparo(dto.modoPreparo());
        if (dto.imagemUrl() != null) entity.setImagemUrl(dto.imagemUrl());
        if (dto.categoria() != null) entity.setCategoria(dto.categoria());
    }
}
