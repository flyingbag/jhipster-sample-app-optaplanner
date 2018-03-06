package org.optaplanner.webexamples.repository;

import org.optaplanner.webexamples.domain.JsonMessage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JsonMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JsonMessageRepository extends JpaRepository<JsonMessage, Long> {

}
