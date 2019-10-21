package com.climbing2.zone.service.mapper;

import com.climbing2.zone.domain.*;
import com.climbing2.zone.service.dto.ClimberDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Climber} and its DTO {@link ClimberDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClimberMapper extends EntityMapper<ClimberDTO, Climber> {


    @Mapping(target = "removeFriends", ignore = true)

    default Climber fromId(Long id) {
        if (id == null) {
            return null;
        }
        Climber climber = new Climber();
        climber.setId(id);
        return climber;
    }
}
