package br.edu.senaisp.receitas.service.impl;

import br.edu.senaisp.receitas.dto.ReceitaRequestDTO;
import br.edu.senaisp.receitas.dto.ReceitaResponseDTO;
import br.edu.senaisp.receitas.exception.ReceitaNotFoundException;
import br.edu.senaisp.receitas.model.Receita;
import br.edu.senaisp.receitas.repository.ReceitaRepository;
import br.edu.senaisp.receitas.service.ReceitaService;
import br.edu.senaisp.receitas.util.ReceitaMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReceitaServiceImpl implements ReceitaService {

    private final ReceitaRepository repository;
    private final ReceitaMapper mapper;

    @Override
    @Transactional
    @CacheEvict(value = "receitas", allEntries = true)
    public ReceitaResponseDTO criarReceita(ReceitaRequestDTO dto) {
        log.info("Criando nova receita: {}", dto.titulo());
        Receita receita = mapper.toEntity(dto);
        receita = repository.save(receita);
        return mapper.toResponseDTO(receita);
    }

    @Override
    @Transactional(readOnly = true)
    public ReceitaResponseDTO buscarPorId(Long id) {
        log.debug("Buscando receita por ID: {}", id);
        return repository.findById(id)
                .map(mapper::toResponseDTO)
                .orElseThrow(() -> new ReceitaNotFoundException(id));
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "receitas")
    public Page<ReceitaResponseDTO> listarReceitas(Pageable pageable) {
        log.info("Listando receitas - página: {}", pageable.getPageNumber());
        return repository.findAll(pageable)
                .map(mapper::toResponseDTO);
    }

    @Override
    @Transactional
    @CacheEvict(value = "receitas", allEntries = true)
    public ReceitaResponseDTO atualizarReceita(Long id, ReceitaRequestDTO dto) {
        log.info("Atualizando receita ID: {}", id);
        return repository.findById(id)
                .map(existing -> {
                    mapper.updateEntity(dto, existing);
                    repository.save(existing);
                    return mapper.toResponseDTO(existing);
                })
                .orElseThrow(() -> new ReceitaNotFoundException(id));
    }

    @Override
    @Transactional
    @CacheEvict(value = "receitas", allEntries = true)
    public void excluirReceita(Long id) {
        log.warn("Excluindo receita ID: {}", id);
        Receita receita = repository.findById(id)
                .orElseThrow(() -> new ReceitaNotFoundException(id));
        repository.delete(receita);
    }
}
