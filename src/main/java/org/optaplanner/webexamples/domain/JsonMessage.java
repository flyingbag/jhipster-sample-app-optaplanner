package org.optaplanner.webexamples.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A JsonMessage.
 */
@Entity
@Table(name = "json_message")
public class JsonMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public JsonMessage text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
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
        JsonMessage jsonMessage = (JsonMessage) o;
        if (jsonMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jsonMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JsonMessage{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
