package org.optaplanner.webexamples.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A JsonVehicleRoutingSolution.
 */
@Entity
@Table(name = "json_vehicle_routing_solution")
public class JsonVehicleRoutingSolution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "feasible")
    private Boolean feasible;

    @Column(name = "distance")
    private String distance;

    @OneToMany(mappedBy = "vehicleRoutingSolution")
    @JsonIgnore
    private Set<JsonCustomer> customerLists = new HashSet<>();

    @OneToMany(mappedBy = "vehicleRoutingSolution")
    @JsonIgnore
    private Set<JsonVehicleRoute> vehicleRouteLists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public JsonVehicleRoutingSolution name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isFeasible() {
        return feasible;
    }

    public JsonVehicleRoutingSolution feasible(Boolean feasible) {
        this.feasible = feasible;
        return this;
    }

    public void setFeasible(Boolean feasible) {
        this.feasible = feasible;
    }

    public String getDistance() {
        return distance;
    }

    public JsonVehicleRoutingSolution distance(String distance) {
        this.distance = distance;
        return this;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public Set<JsonCustomer> getCustomerLists() {
        return customerLists;
    }

    public JsonVehicleRoutingSolution customerLists(Set<JsonCustomer> jsonCustomers) {
        this.customerLists = jsonCustomers;
        return this;
    }

    public JsonVehicleRoutingSolution addCustomerList(JsonCustomer jsonCustomer) {
        this.customerLists.add(jsonCustomer);
        return this;
    }

    public JsonVehicleRoutingSolution removeCustomerList(JsonCustomer jsonCustomer) {
        this.customerLists.remove(jsonCustomer);
        return this;
    }

    public void setCustomerLists(Set<JsonCustomer> jsonCustomers) {
        this.customerLists = jsonCustomers;
    }

    public Set<JsonVehicleRoute> getVehicleRouteLists() {
        return vehicleRouteLists;
    }

    public JsonVehicleRoutingSolution vehicleRouteLists(Set<JsonVehicleRoute> jsonVehicleRoutes) {
        this.vehicleRouteLists = jsonVehicleRoutes;
        return this;
    }

    public JsonVehicleRoutingSolution addVehicleRouteList(JsonVehicleRoute jsonVehicleRoute) {
        this.vehicleRouteLists.add(jsonVehicleRoute);
        return this;
    }

    public JsonVehicleRoutingSolution removeVehicleRouteList(JsonVehicleRoute jsonVehicleRoute) {
        this.vehicleRouteLists.remove(jsonVehicleRoute);
        return this;
    }

    public void setVehicleRouteLists(Set<JsonVehicleRoute> jsonVehicleRoutes) {
        this.vehicleRouteLists = jsonVehicleRoutes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        JsonVehicleRoutingSolution jsonVehicleRoutingSolution = (JsonVehicleRoutingSolution) o;
        if (jsonVehicleRoutingSolution.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jsonVehicleRoutingSolution.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JsonVehicleRoutingSolution{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", feasible='" + isFeasible() + "'" +
            ", distance='" + getDistance() + "'" +
            "}";
    }
}
