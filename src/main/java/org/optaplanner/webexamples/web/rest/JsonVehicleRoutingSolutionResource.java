package org.optaplanner.webexamples.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.optaplanner.webexamples.domain.JsonMessage;
import org.optaplanner.webexamples.domain.JsonVehicleRoutingSolution;
import org.optaplanner.webexamples.service.JsonVehicleRoutingSolutionService;
import org.optaplanner.webexamples.web.rest.errors.BadRequestAlertException;
import org.optaplanner.webexamples.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JsonVehicleRoutingSolution.
 */
@RestController
@RequestMapping("/api")
public class JsonVehicleRoutingSolutionResource {

    private final Logger log = LoggerFactory.getLogger(JsonVehicleRoutingSolutionResource.class);

    private static final String ENTITY_NAME = "jsonVehicleRoutingSolution";

    private final JsonVehicleRoutingSolutionService jsonVehicleRoutingSolutionService;

    public JsonVehicleRoutingSolutionResource(JsonVehicleRoutingSolutionService jsonVehicleRoutingSolutionService) {
        this.jsonVehicleRoutingSolutionService = jsonVehicleRoutingSolutionService;
    }

    /**
     * POST  /json-vehicle-routing-solutions : Create a new jsonVehicleRoutingSolution.
     *
     * @param jsonVehicleRoutingSolution the jsonVehicleRoutingSolution to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jsonVehicleRoutingSolution, or with status 400 (Bad Request) if the jsonVehicleRoutingSolution has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/json-vehicle-routing-solutions")
    @Timed
    public ResponseEntity<JsonVehicleRoutingSolution> createJsonVehicleRoutingSolution(@RequestBody JsonVehicleRoutingSolution jsonVehicleRoutingSolution) throws URISyntaxException {
        log.debug("REST request to save JsonVehicleRoutingSolution : {}", jsonVehicleRoutingSolution);
        if (jsonVehicleRoutingSolution.getId() != null) {
            throw new BadRequestAlertException("A new jsonVehicleRoutingSolution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JsonVehicleRoutingSolution result = jsonVehicleRoutingSolutionService.save(jsonVehicleRoutingSolution);
        return ResponseEntity.created(new URI("/api/json-vehicle-routing-solutions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /json-vehicle-routing-solutions : Updates an existing jsonVehicleRoutingSolution.
     *
     * @param jsonVehicleRoutingSolution the jsonVehicleRoutingSolution to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jsonVehicleRoutingSolution,
     * or with status 400 (Bad Request) if the jsonVehicleRoutingSolution is not valid,
     * or with status 500 (Internal Server Error) if the jsonVehicleRoutingSolution couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/json-vehicle-routing-solutions")
    @Timed
    public ResponseEntity<JsonVehicleRoutingSolution> updateJsonVehicleRoutingSolution(@RequestBody JsonVehicleRoutingSolution jsonVehicleRoutingSolution) throws URISyntaxException {
        log.debug("REST request to update JsonVehicleRoutingSolution : {}", jsonVehicleRoutingSolution);
        if (jsonVehicleRoutingSolution.getId() == null) {
            return createJsonVehicleRoutingSolution(jsonVehicleRoutingSolution);
        }
        JsonVehicleRoutingSolution result = jsonVehicleRoutingSolutionService.save(jsonVehicleRoutingSolution);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jsonVehicleRoutingSolution.getId().toString()))
            .body(result);
    }

    /**
     * GET  /json-vehicle-routing-solutions : get all the jsonVehicleRoutingSolutions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jsonVehicleRoutingSolutions in body
     */
    @GetMapping("/json-vehicle-routing-solutions")
    @Timed
    public List<JsonVehicleRoutingSolution> getAllJsonVehicleRoutingSolutions() {
        log.debug("REST request to get all JsonVehicleRoutingSolutions");
        return jsonVehicleRoutingSolutionService.findAll();
        }

    /**
     * GET  /json-vehicle-routing-solutions/:id : get the "id" jsonVehicleRoutingSolution.
     *
     * @param id the id of the jsonVehicleRoutingSolution to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jsonVehicleRoutingSolution, or with status 404 (Not Found)
     */
    @GetMapping("/json-vehicle-routing-solutions/{id}")
    @Timed
    public ResponseEntity<JsonVehicleRoutingSolution> getJsonVehicleRoutingSolution(@PathVariable Long id) {
        log.debug("REST request to get JsonVehicleRoutingSolution : {}", id);
        JsonVehicleRoutingSolution jsonVehicleRoutingSolution = jsonVehicleRoutingSolutionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jsonVehicleRoutingSolution));
    }

    /**
     * DELETE  /json-vehicle-routing-solutions/:id : delete the "id" jsonVehicleRoutingSolution.
     *
     * @param id the id of the jsonVehicleRoutingSolution to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/json-vehicle-routing-solutions/{id}")
    @Timed
    public ResponseEntity<Void> deleteJsonVehicleRoutingSolution(@PathVariable Long id) {
        log.debug("REST request to delete JsonVehicleRoutingSolution : {}", id);
        jsonVehicleRoutingSolutionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /solution : get the "id" jsonVehicleRoutingSolution.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the jsonVehicleRoutingSolution, or with status 404 (Not Found)
     */
    @GetMapping("/solution")
    @Timed
    public ResponseEntity<JsonVehicleRoutingSolution> getSolution() {
        log.debug("REST request to get JsonVehicleRoutingSolution");
        JsonVehicleRoutingSolution jsonVehicleRoutingSolution = jsonVehicleRoutingSolutionService.getSolution();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jsonVehicleRoutingSolution));
    }

    /**
     * POST  /solution/solve
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new jsonMessage, or with status 400 (Bad Request) if the jsonVehicleRoutingSolution has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solution/solve")
    @Timed
    public ResponseEntity<JsonMessage> solve() throws URISyntaxException {
        log.debug("REST request to solve a Solution.");
        JsonMessage result = jsonVehicleRoutingSolutionService.solve();
        return ResponseEntity.created(new URI("/api/solution/solve/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /solution/terminateEarly
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new jsonMessage, or with status 400 (Bad Request) if the jsonVehicleRoutingSolution has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solution/terminateEarly")
    @Timed
    public ResponseEntity<JsonMessage> terminateEarly() throws URISyntaxException {
        log.debug("REST request to solve a Solution early.");
        JsonMessage result = jsonVehicleRoutingSolutionService.terminateEarly();
        return ResponseEntity.created(new URI("/api/solution/solve/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}
