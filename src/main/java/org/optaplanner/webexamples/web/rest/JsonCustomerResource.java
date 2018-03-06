package org.optaplanner.webexamples.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.optaplanner.webexamples.domain.JsonCustomer;

import org.optaplanner.webexamples.repository.JsonCustomerRepository;
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
 * REST controller for managing JsonCustomer.
 */
@RestController
@RequestMapping("/api")
public class JsonCustomerResource {

    private final Logger log = LoggerFactory.getLogger(JsonCustomerResource.class);

    private static final String ENTITY_NAME = "jsonCustomer";

    private final JsonCustomerRepository jsonCustomerRepository;

    public JsonCustomerResource(JsonCustomerRepository jsonCustomerRepository) {
        this.jsonCustomerRepository = jsonCustomerRepository;
    }

    /**
     * POST  /json-customers : Create a new jsonCustomer.
     *
     * @param jsonCustomer the jsonCustomer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jsonCustomer, or with status 400 (Bad Request) if the jsonCustomer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/json-customers")
    @Timed
    public ResponseEntity<JsonCustomer> createJsonCustomer(@RequestBody JsonCustomer jsonCustomer) throws URISyntaxException {
        log.debug("REST request to save JsonCustomer : {}", jsonCustomer);
        if (jsonCustomer.getId() != null) {
            throw new BadRequestAlertException("A new jsonCustomer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JsonCustomer result = jsonCustomerRepository.save(jsonCustomer);
        return ResponseEntity.created(new URI("/api/json-customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /json-customers : Updates an existing jsonCustomer.
     *
     * @param jsonCustomer the jsonCustomer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jsonCustomer,
     * or with status 400 (Bad Request) if the jsonCustomer is not valid,
     * or with status 500 (Internal Server Error) if the jsonCustomer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/json-customers")
    @Timed
    public ResponseEntity<JsonCustomer> updateJsonCustomer(@RequestBody JsonCustomer jsonCustomer) throws URISyntaxException {
        log.debug("REST request to update JsonCustomer : {}", jsonCustomer);
        if (jsonCustomer.getId() == null) {
            return createJsonCustomer(jsonCustomer);
        }
        JsonCustomer result = jsonCustomerRepository.save(jsonCustomer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jsonCustomer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /json-customers : get all the jsonCustomers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jsonCustomers in body
     */
    @GetMapping("/json-customers")
    @Timed
    public List<JsonCustomer> getAllJsonCustomers() {
        log.debug("REST request to get all JsonCustomers");
        return jsonCustomerRepository.findAll();
        }

    /**
     * GET  /json-customers/:id : get the "id" jsonCustomer.
     *
     * @param id the id of the jsonCustomer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jsonCustomer, or with status 404 (Not Found)
     */
    @GetMapping("/json-customers/{id}")
    @Timed
    public ResponseEntity<JsonCustomer> getJsonCustomer(@PathVariable Long id) {
        log.debug("REST request to get JsonCustomer : {}", id);
        JsonCustomer jsonCustomer = jsonCustomerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jsonCustomer));
    }

    /**
     * DELETE  /json-customers/:id : delete the "id" jsonCustomer.
     *
     * @param id the id of the jsonCustomer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/json-customers/{id}")
    @Timed
    public ResponseEntity<Void> deleteJsonCustomer(@PathVariable Long id) {
        log.debug("REST request to delete JsonCustomer : {}", id);
        jsonCustomerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
