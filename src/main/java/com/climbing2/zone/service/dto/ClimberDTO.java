package com.climbing2.zone.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link com.climbing2.zone.domain.Climber} entity.
 */
public class ClimberDTO implements Serializable {

    private Long id;

    private String firstName;

    private String lastName;

    private LocalDate birth;


    private Set<ClimberDTO> friends = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirth() {
        return birth;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }

    public Set<ClimberDTO> getFriends() {
        return friends;
    }

    public void setFriends(Set<ClimberDTO> climbers) {
        this.friends = climbers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClimberDTO climberDTO = (ClimberDTO) o;
        if (climberDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), climberDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClimberDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birth='" + getBirth() + "'" +
            "}";
    }
}
