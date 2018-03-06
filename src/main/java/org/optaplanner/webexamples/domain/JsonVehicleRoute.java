package org.optaplanner.webexamples.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A JsonVehicleRoute.
 */
@Entity
@Table(name = "json_vehicle_route")
public class JsonVehicleRoute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "depot_location_name")
    private String depotLocationName;

    @Column(name = "depot_latitude")
    private Double depotLatitude;

    @Column(name = "depot_longitude")
    private Double depotLongitude;

    @Column(name = "hex_color")
    private String hexColor;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "demand_total")
    private Integer demandTotal;

    @OneToMany(mappedBy = "vehicleRoute")
    @JsonIgnore
    private Set<JsonCustomer> customers = new HashSet<>();

    @ManyToOne
    private JsonVehicleRoutingSolution vehicleRoutingSolution;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepotLocationName() {
        return depotLocationName;
    }

    public JsonVehicleRoute depotLocationName(String depotLocationName) {
        this.depotLocationName = depotLocationName;
        return this;
    }

    public void setDepotLocationName(String depotLocationName) {
        this.depotLocationName = depotLocationName;
    }

    public Double getDepotLatitude() {
        return depotLatitude;
    }

    public JsonVehicleRoute depotLatitude(Double depotLatitude) {
        this.depotLatitude = depotLatitude;
        return this;
    }

    public void setDepotLatitude(Double depotLatitude) {
        this.depotLatitude = depotLatitude;
    }

    public Double getDepotLongitude() {
        return depotLongitude;
    }

    public JsonVehicleRoute depotLongitude(Double depotLongitude) {
        this.depotLongitude = depotLongitude;
        return this;
    }

    public void setDepotLongitude(Double depotLongitude) {
        this.depotLongitude = depotLongitude;
    }

    public String getHexColor() {
        return hexColor;
    }

    public JsonVehicleRoute hexColor(String hexColor) {
        this.hexColor = hexColor;
        return this;
    }

    public void setHexColor(String hexColor) {
        this.hexColor = hexColor;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public JsonVehicleRoute capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getDemandTotal() {
        return demandTotal;
    }

    public JsonVehicleRoute demandTotal(Integer demandTotal) {
        this.demandTotal = demandTotal;
        return this;
    }

    public void setDemandTotal(Integer demandTotal) {
        this.demandTotal = demandTotal;
    }

    public Set<JsonCustomer> getCustomers() {
        return customers;
    }

    public JsonVehicleRoute customers(Set<JsonCustomer> jsonCustomers) {
        this.customers = jsonCustomers;
        return this;
    }

    public JsonVehicleRoute addCustomer(JsonCustomer jsonCustomer) {
        this.customers.add(jsonCustomer);
        jsonCustomer.setVehicleRoute(this);
        return this;
    }

    public JsonVehicleRoute removeCustomer(JsonCustomer jsonCustomer) {
        this.customers.remove(jsonCustomer);
        jsonCustomer.setVehicleRoute(null);
        return this;
    }

    public void setCustomers(Set<JsonCustomer> jsonCustomers) {
        this.customers = jsonCustomers;
    }

    public JsonVehicleRoutingSolution getVehicleRoutingSolution() {
        return vehicleRoutingSolution;
    }

    public JsonVehicleRoute vehicleRoutingSolution(JsonVehicleRoutingSolution jsonVehicleRoutingSolution) {
        this.vehicleRoutingSolution = jsonVehicleRoutingSolution;
        return this;
    }

    public void setVehicleRoutingSolution(JsonVehicleRoutingSolution jsonVehicleRoutingSolution) {
        this.vehicleRoutingSolution = jsonVehicleRoutingSolution;
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
        JsonVehicleRoute jsonVehicleRoute = (JsonVehicleRoute) o;
        if (jsonVehicleRoute.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jsonVehicleRoute.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JsonVehicleRoute{" +
            "id=" + getId() +
            ", depotLocationName='" + getDepotLocationName() + "'" +
            ", depotLatitude=" + getDepotLatitude() +
            ", depotLongitude=" + getDepotLongitude() +
            ", hexColor='" + getHexColor() + "'" +
            ", capacity=" + getCapacity() +
            ", demandTotal=" + getDemandTotal() +
            "}";
    }
}
