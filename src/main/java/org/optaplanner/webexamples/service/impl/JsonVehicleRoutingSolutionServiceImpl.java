package org.optaplanner.webexamples.service.impl;

import org.optaplanner.webexamples.service.JsonVehicleRoutingSolutionService;
import org.optaplanner.webexamples.domain.JsonVehicleRoutingSolution;
import org.optaplanner.webexamples.repository.JsonVehicleRoutingSolutionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing JsonVehicleRoutingSolution.
 */
@Service
@Transactional
public class JsonVehicleRoutingSolutionServiceImpl implements JsonVehicleRoutingSolutionService {

    private final Logger log = LoggerFactory.getLogger(JsonVehicleRoutingSolutionServiceImpl.class);

    private final JsonVehicleRoutingSolutionRepository jsonVehicleRoutingSolutionRepository;

    public JsonVehicleRoutingSolutionServiceImpl(JsonVehicleRoutingSolutionRepository jsonVehicleRoutingSolutionRepository) {
        this.jsonVehicleRoutingSolutionRepository = jsonVehicleRoutingSolutionRepository;
    }

    /**
     * Save a jsonVehicleRoutingSolution.
     *
     * @param jsonVehicleRoutingSolution the entity to save
     * @return the persisted entity
     */
    @Override
    public JsonVehicleRoutingSolution save(JsonVehicleRoutingSolution jsonVehicleRoutingSolution) {
        log.debug("Request to save JsonVehicleRoutingSolution : {}", jsonVehicleRoutingSolution);
        return jsonVehicleRoutingSolutionRepository.save(jsonVehicleRoutingSolution);
    }

    /**
     * Get all the jsonVehicleRoutingSolutions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<JsonVehicleRoutingSolution> findAll() {
        log.debug("Request to get all JsonVehicleRoutingSolutions");
        return jsonVehicleRoutingSolutionRepository.findAll();
    }

    /**
     * Get one jsonVehicleRoutingSolution by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public JsonVehicleRoutingSolution findOne(Long id) {
        log.debug("Request to get JsonVehicleRoutingSolution : {}", id);
        return jsonVehicleRoutingSolutionRepository.findOne(id);
    }

    /**
     * Delete the jsonVehicleRoutingSolution by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete JsonVehicleRoutingSolution : {}", id);
        jsonVehicleRoutingSolutionRepository.delete(id);
    }
}
