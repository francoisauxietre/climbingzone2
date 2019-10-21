package com.climbing2.zone.repository;

import com.climbing2.zone.domain.Climber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Climber entity.
 */
@Repository
public interface ClimberRepository extends JpaRepository<Climber, Long> {

    @Query(value = "select distinct climber from Climber climber left join fetch climber.friends",
        countQuery = "select count(distinct climber) from Climber climber")
    Page<Climber> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct climber from Climber climber left join fetch climber.friends")
    List<Climber> findAllWithEagerRelationships();

    @Query("select climber from Climber climber left join fetch climber.friends where climber.id =:id")
    Optional<Climber> findOneWithEagerRelationships(@Param("id") Long id);

}
