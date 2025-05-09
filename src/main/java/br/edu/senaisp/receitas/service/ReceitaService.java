package br.edu.senaisp.receitas.service;

import br.edu.senaisp.receitas.dto.ReceitaRequestDTO;
import br.edu.senaisp.receitas.dto.ReceitaResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReceitaService {
    ReceitaResponseDTO criarReceita(ReceitaRequestDTO dto);
    ReceitaResponseDTO buscarPorId(Long id);
    Page<ReceitaResponseDTO> listarReceitas(Pageable pageable);
    ReceitaResponseDTO atualizarReceita(Long id, ReceitaRequestDTO dto);
    void excluirReceita(Long id);
}
