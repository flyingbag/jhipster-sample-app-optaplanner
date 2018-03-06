package org.optaplanner.webexamples.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.optaplanner.webexamples.domain.JsonVehicleRoute;

import org.optaplanner.webexamples.repository.JsonVehicleRouteRepository;
import org.optaplanner.webexamples.web.rest.errors.BadRequestAlertException;
import org.optaplanner.webexamples.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JsonVehicleRoute.
 */
@RestController
@RequestMapping("/api")
public class JsonVehicleRouteResource {

    private final Logger log = LoggerFactory.getLogger(JsonVehicleRouteResource.class);

    private static final String ENTITY_NAME = "jsonVehicleRoute";

    private final JsonVehicleRouteRepository jsonVehicleRouteRepository;

    public JsonVehicleRouteResource(JsonVehicleRouteRepository jsonVehicleRouteRepository) {
        this.jsonVehicleRouteRepository = jsonVehicleRouteRepository;
    }

    /**
     * POST  /json-vehicle-routes : Create a new jsonVehicleRoute.
     *
     * @param jsonVehicleRoute the jsonVehicleRoute to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jsonVehicleRoute, or with status 400 (Bad Request) if the jsonVehicleRoute has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/json-vehicle-routes")
    @Timed
    public ResponseEntity<JsonVehicleRoute> createJsonVehicleRoute(@RequestBody JsonVehicleRoute jsonVehicleRoute) throws URISyntaxException {
        log.debug("REST request to save JsonVehicleRoute : {}", jsonVehicleRoute);
        if (jsonVehicleRoute.getId() != null) {
            throw new BadRequestAlertException("A new jsonVehicleRoute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JsonVehicleRoute result = jsonVehicleRouteRepository.save(jsonVehicleRoute);
        return ResponseEntity.created(new URI("/api/json-vehicle-routes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /json-vehicle-routes : Updates an existing jsonVehicleRoute.
     *
     * @param jsonVehicleRoute the jsonVehicleRoute to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jsonVehicleRoute,
     * or with status 400 (Bad Request) if the jsonVehicleRoute is not valid,
     * or with status 500 (Internal Server Error) if the jsonVehicleRoute couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/json-vehicle-routes")
    @Timed
    public ResponseEntity<JsonVehicleRoute> updateJsonVehicleRoute(@RequestBody JsonVehicleRoute jsonVehicleRoute) throws URISyntaxException {
        log.debug("REST request to update JsonVehicleRoute : {}", jsonVehicleRoute);
        if (jsonVehicleRoute.getId() == null) {
            return createJsonVehicleRoute(jsonVehicleRoute);
        }
        JsonVehicleRoute result = jsonVehicleRouteRepository.save(jsonVehicleRoute);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jsonVehicleRoute.getId().toString()))
            .body(result);
    }

    /**
     * GET  /json-vehicle-routes : get all the jsonVehicleRoutes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jsonVehicleRoutes in body
     */
    @GetMapping("/json-vehicle-routes")
    @Timed
    public List<JsonVehicleRoute> getAllJsonVehicleRoutes() {
        log.debug("REST request to get all JsonVehicleRoutes");
        return jsonVehicleRouteRepository.findAll();
        }

    /**
     * GET  /json-vehicle-routes/:id : get the "id" jsonVehicleRoute.
     *
     * @param id the id of the jsonVehicleRoute to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jsonVehicleRoute, or with status 404 (Not Found)
     */
    @GetMapping("/json-vehicle-routes/{id}")
    @Timed
    public ResponseEntity<JsonVehicleRoute> getJsonVehicleRoute(@PathVariable Long id) {
        log.debug("REST request to get JsonVehicleRoute : {}", id);
        JsonVehicleRoute jsonVehicleRoute = jsonVehicleRouteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jsonVehicleRoute));
    }

    /**
     * DELETE  /json-vehicle-routes/:id : delete the "id" jsonVehicleRoute.
     *
     * @param id the id of the jsonVehicleRoute to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/json-vehicle-routes/{id}")
    @Timed
    public ResponseEntity<Void> deleteJsonVehicleRoute(@PathVariable Long id) {
        log.debug("REST request to delete JsonVehicleRoute : {}", id);
        jsonVehicleRouteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
