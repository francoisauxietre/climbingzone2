package com.climbing2.zone.web.rest;

import com.climbing2.zone.service.ClimberService;
import com.climbing2.zone.web.rest.errors.BadRequestAlertException;
import com.climbing2.zone.service.dto.ClimberDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.climbing2.zone.domain.Climber}.
 */
@RestController
@RequestMapping("/api")
public class ClimberResource {

    private final Logger log = LoggerFactory.getLogger(ClimberResource.class);

    private static final String ENTITY_NAME = "climber";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClimberService climberService;

    public ClimberResource(ClimberService climberService) {
        this.climberService = climberService;
    }

    /**
     * {@code POST  /climbers} : Create a new climber.
     *
     * @param climberDTO the climberDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new climberDTO, or with status {@code 400 (Bad Request)} if the climber has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/climbers")
    public ResponseEntity<ClimberDTO> createClimber(@RequestBody ClimberDTO climberDTO) throws URISyntaxException {
        log.debug("REST request to save Climber : {}", climberDTO);
        if (climberDTO.getId() != null) {
            throw new BadRequestAlertException("A new climber cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClimberDTO result = climberService.save(climberDTO);
        return ResponseEntity.created(new URI("/api/climbers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /climbers} : Updates an existing climber.
     *
     * @param climberDTO the climberDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated climberDTO,
     * or with status {@code 400 (Bad Request)} if the climberDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the climberDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/climbers")
    public ResponseEntity<ClimberDTO> updateClimber(@RequestBody ClimberDTO climberDTO) throws URISyntaxException {
        log.debug("REST request to update Climber : {}", climberDTO);
        if (climberDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClimberDTO result = climberService.save(climberDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, climberDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /climbers} : get all the climbers.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of climbers in body.
     */
    @GetMapping("/climbers")
    public ResponseEntity<List<ClimberDTO>> getAllClimbers(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Climbers");
        Page<ClimberDTO> page;
        if (eagerload) {
            page = climberService.findAllWithEagerRelationships(pageable);
        } else {
            page = climberService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /climbers/:id} : get the "id" climber.
     *
     * @param id the id of the climberDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the climberDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/climbers/{id}")
    public ResponseEntity<ClimberDTO> getClimber(@PathVariable Long id) {
        log.debug("REST request to get Climber : {}", id);
        Optional<ClimberDTO> climberDTO = climberService.findOne(id);
        return ResponseUtil.wrapOrNotFound(climberDTO);
    }

    /**
     * {@code DELETE  /climbers/:id} : delete the "id" climber.
     *
     * @param id the id of the climberDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/climbers/{id}")
    public ResponseEntity<Void> deleteClimber(@PathVariable Long id) {
        log.debug("REST request to delete Climber : {}", id);
        climberService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
