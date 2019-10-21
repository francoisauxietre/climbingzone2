package com.climbing2.zone.service;

import com.climbing2.zone.domain.Route;
import com.climbing2.zone.repository.RouteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Route}.
 */
@Service
@Transactional
public class RouteService {

    private final Logger log = LoggerFactory.getLogger(RouteService.class);

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    /**
     * Save a route.
     *
     * @param route the entity to save.
     * @return the persisted entity.
     */
    public Route save(Route route) {
        log.debug("Request to save Route : {}", route);
        return routeRepository.save(route);
    }

    /**
     * Get all the routes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Route> findAll(Pageable pageable) {
        log.debug("Request to get all Routes");
        return routeRepository.findAll(pageable);
    }


    /**
     * Get one route by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Route> findOne(Long id) {
        log.debug("Request to get Route : {}", id);
        return routeRepository.findById(id);
    }

    /**
     * Delete the route by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Route : {}", id);
        routeRepository.deleteById(id);
    }
}
