package com.climbing2.zone.service;

import com.climbing2.zone.domain.Climber;
import com.climbing2.zone.repository.ClimberRepository;
import com.climbing2.zone.service.dto.ClimberDTO;
import com.climbing2.zone.service.mapper.ClimberMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Climber}.
 */
@Service
@Transactional
public class ClimberService {

    private final Logger log = LoggerFactory.getLogger(ClimberService.class);

    private final ClimberRepository climberRepository;

    private final ClimberMapper climberMapper;

    public ClimberService(ClimberRepository climberRepository, ClimberMapper climberMapper) {
        this.climberRepository = climberRepository;
        this.climberMapper = climberMapper;
    }

    /**
     * Save a climber.
     *
     * @param climberDTO the entity to save.
     * @return the persisted entity.
     */
    public ClimberDTO save(ClimberDTO climberDTO) {
        log.debug("Request to save Climber : {}", climberDTO);
        Climber climber = climberMapper.toEntity(climberDTO);
        climber = climberRepository.save(climber);
        return climberMapper.toDto(climber);
    }

    /**
     * Get all the climbers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ClimberDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Climbers");
        return climberRepository.findAll(pageable)
            .map(climberMapper::toDto);
    }

    /**
     * Get all the climbers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ClimberDTO> findAllWithEagerRelationships(Pageable pageable) {
        return climberRepository.findAllWithEagerRelationships(pageable).map(climberMapper::toDto);
    }
    

    /**
     * Get one climber by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ClimberDTO> findOne(Long id) {
        log.debug("Request to get Climber : {}", id);
        return climberRepository.findOneWithEagerRelationships(id)
            .map(climberMapper::toDto);
    }

    /**
     * Delete the climber by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Climber : {}", id);
        climberRepository.deleteById(id);
    }
}
