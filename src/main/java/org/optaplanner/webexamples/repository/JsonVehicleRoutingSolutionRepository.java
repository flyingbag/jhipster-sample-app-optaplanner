package org.optaplanner.webexamples.repository;

import org.optaplanner.webexamples.domain.JsonVehicleRoutingSolution;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JsonVehicleRoutingSolution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JsonVehicleRoutingSolutionRepository extends JpaRepository<JsonVehicleRoutingSolution, Long> {

}
