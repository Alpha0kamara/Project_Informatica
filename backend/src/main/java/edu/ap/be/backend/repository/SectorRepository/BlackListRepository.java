package edu.ap.be.backend.repository.SectorRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.ap.be.backend.model.Sector.BlackList;

@Repository
public interface BlackListRepository extends JpaRepository<BlackList, Long> {
   
}