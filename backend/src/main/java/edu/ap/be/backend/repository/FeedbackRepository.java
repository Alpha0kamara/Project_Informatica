
package edu.ap.be.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.ap.be.backend.model.Feedback;
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

}