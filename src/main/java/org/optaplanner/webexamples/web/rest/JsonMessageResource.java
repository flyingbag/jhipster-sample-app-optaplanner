package org.optaplanner.webexamples.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.optaplanner.webexamples.domain.JsonMessage;

import org.optaplanner.webexamples.repository.JsonMessageRepository;
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
 * REST controller for managing JsonMessage.
 */
@RestController
@RequestMapping("/api")
public class JsonMessageResource {

    private final Logger log = LoggerFactory.getLogger(JsonMessageResource.class);

    private static final String ENTITY_NAME = "jsonMessage";

    private final JsonMessageRepository jsonMessageRepository;

    public JsonMessageResource(JsonMessageRepository jsonMessageRepository) {
        this.jsonMessageRepository = jsonMessageRepository;
    }

    /**
     * POST  /json-messages : Create a new jsonMessage.
     *
     * @param jsonMessage the jsonMessage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jsonMessage, or with status 400 (Bad Request) if the jsonMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/json-messages")
    @Timed
    public ResponseEntity<JsonMessage> createJsonMessage(@RequestBody JsonMessage jsonMessage) throws URISyntaxException {
        log.debug("REST request to save JsonMessage : {}", jsonMessage);
        if (jsonMessage.getId() != null) {
            throw new BadRequestAlertException("A new jsonMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JsonMessage result = jsonMessageRepository.save(jsonMessage);
        return ResponseEntity.created(new URI("/api/json-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /json-messages : Updates an existing jsonMessage.
     *
     * @param jsonMessage the jsonMessage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jsonMessage,
     * or with status 400 (Bad Request) if the jsonMessage is not valid,
     * or with status 500 (Internal Server Error) if the jsonMessage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/json-messages")
    @Timed
    public ResponseEntity<JsonMessage> updateJsonMessage(@RequestBody JsonMessage jsonMessage) throws URISyntaxException {
        log.debug("REST request to update JsonMessage : {}", jsonMessage);
        if (jsonMessage.getId() == null) {
            return createJsonMessage(jsonMessage);
        }
        JsonMessage result = jsonMessageRepository.save(jsonMessage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jsonMessage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /json-messages : get all the jsonMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jsonMessages in body
     */
    @GetMapping("/json-messages")
    @Timed
    public List<JsonMessage> getAllJsonMessages() {
        log.debug("REST request to get all JsonMessages");
        return jsonMessageRepository.findAll();
        }

    /**
     * GET  /json-messages/:id : get the "id" jsonMessage.
     *
     * @param id the id of the jsonMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jsonMessage, or with status 404 (Not Found)
     */
    @GetMapping("/json-messages/{id}")
    @Timed
    public ResponseEntity<JsonMessage> getJsonMessage(@PathVariable Long id) {
        log.debug("REST request to get JsonMessage : {}", id);
        JsonMessage jsonMessage = jsonMessageRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jsonMessage));
    }

    /**
     * DELETE  /json-messages/:id : delete the "id" jsonMessage.
     *
     * @param id the id of the jsonMessage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/json-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteJsonMessage(@PathVariable Long id) {
        log.debug("REST request to delete JsonMessage : {}", id);
        jsonMessageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
