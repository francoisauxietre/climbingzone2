package com.climbing2.zone.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Route.
 */
@Entity
@Table(name = "route")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Route implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "physique")
    private Integer physique;

    @Column(name = "technique")
    private Integer technique;

    @Column(name = "tactique")
    private Integer tactique;

    @Column(name = "mental")
    private Integer mental;

    @Column(name = "niveau")
    private String niveau;

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

    public Route name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getLatitude() {
        return latitude;
    }

    public Route latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public Route longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Integer getPhysique() {
        return physique;
    }

    public Route physique(Integer physique) {
        this.physique = physique;
        return this;
    }

    public void setPhysique(Integer physique) {
        this.physique = physique;
    }

    public Integer getTechnique() {
        return technique;
    }

    public Route technique(Integer technique) {
        this.technique = technique;
        return this;
    }

    public void setTechnique(Integer technique) {
        this.technique = technique;
    }

    public Integer getTactique() {
        return tactique;
    }

    public Route tactique(Integer tactique) {
        this.tactique = tactique;
        return this;
    }

    public void setTactique(Integer tactique) {
        this.tactique = tactique;
    }

    public Integer getMental() {
        return mental;
    }

    public Route mental(Integer mental) {
        this.mental = mental;
        return this;
    }

    public void setMental(Integer mental) {
        this.mental = mental;
    }

    public String getNiveau() {
        return niveau;
    }

    public Route niveau(String niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Route)) {
            return false;
        }
        return id != null && id.equals(((Route) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Route{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", physique=" + getPhysique() +
            ", technique=" + getTechnique() +
            ", tactique=" + getTactique() +
            ", mental=" + getMental() +
            ", niveau='" + getNiveau() + "'" +
            "}";
    }
}
