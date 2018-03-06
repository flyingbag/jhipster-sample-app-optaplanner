package org.optaplanner.webexamples.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A JsonCustomer.
 */
@Entity
@Table(name = "json_customer")
public class JsonCustomer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "demand")
    private Integer demand;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocationName() {
        return locationName;
    }

    public JsonCustomer locationName(String locationName) {
        this.locationName = locationName;
        return this;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Double getLatitude() {
        return latitude;
    }

    public JsonCustomer latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public JsonCustomer longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getDemand() {
        return demand;
    }

    public JsonCustomer demand(Integer demand) {
        this.demand = demand;
        return this;
    }

    public void setDemand(Integer demand) {
        this.demand = demand;
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
        JsonCustomer jsonCustomer = (JsonCustomer) o;
        if (jsonCustomer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jsonCustomer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JsonCustomer{" +
            "id=" + getId() +
            ", locationName='" + getLocationName() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", demand=" + getDemand() +
            "}";
    }
}
