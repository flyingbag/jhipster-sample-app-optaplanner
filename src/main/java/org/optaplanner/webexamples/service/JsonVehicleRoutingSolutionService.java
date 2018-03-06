package org.optaplanner.webexamples.service;

import org.optaplanner.webexamples.domain.JsonVehicleRoutingSolution;
import java.util.List;

/**
 * Service Interface for managing JsonVehicleRoutingSolution.
 */
public interface JsonVehicleRoutingSolutionService {

    /**
     * Save a jsonVehicleRoutingSolution.
     *
     * @param jsonVehicleRoutingSolution the entity to save
     * @return the persisted entity
     */
    JsonVehicleRoutingSolution save(JsonVehicleRoutingSolution jsonVehicleRoutingSolution);

    /**
     * Get all the jsonVehicleRoutingSolutions.
     *
     * @return the list of entities
     */
    List<JsonVehicleRoutingSolution> findAll();

    /**
     * Get the "id" jsonVehicleRoutingSolution.
     *
     * @param id the id of the entity
     * @return the entity
     */
    JsonVehicleRoutingSolution findOne(Long id);

    /**
     * Delete the "id" jsonVehicleRoutingSolution.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
