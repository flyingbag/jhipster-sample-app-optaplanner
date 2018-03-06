package org.optaplanner.webexamples.repository;

import org.optaplanner.webexamples.domain.JsonVehicleRoute;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JsonVehicleRoute entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JsonVehicleRouteRepository extends JpaRepository<JsonVehicleRoute, Long> {

}
