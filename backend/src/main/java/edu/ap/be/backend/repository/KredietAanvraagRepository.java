package edu.ap.be.backend.repository;

import edu.ap.be.backend.model.KredietAanvraag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface KredietAanvraagRepository extends JpaRepository<KredietAanvraag,Long> {
   /* List<KredietAanvraag> findByStatusEquals(int status);*/
}
