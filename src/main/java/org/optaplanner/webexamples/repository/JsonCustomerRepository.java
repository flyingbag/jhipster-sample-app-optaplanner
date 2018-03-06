package org.optaplanner.webexamples.repository;

import org.optaplanner.webexamples.domain.JsonCustomer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JsonCustomer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JsonCustomerRepository extends JpaRepository<JsonCustomer, Long> {

}
