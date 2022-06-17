package edu.ap.be.backend.model;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="feedbackaanvraag")
@NoArgsConstructor


public class Feedback {

    
    public Feedback(Long id, String omschrijving, KredietStatus status) {
        this.documentId = id;
        this.omschrijving = omschrijving;
        this.status = status;
    }
    /**
     * The id of the generated Feedback. This is the primary key.
     */
    @Id
    @Column(name = "feedback_id")
    private long documentId ;
    /**
     * Description given to the status of the credit request.
     */
    @Column
    private String omschrijving;
    /**
     * The status of a credit request.
     */
    @Column
    private KredietStatus status;
    /**
     * A unidirectional one-to-one relationship with CreditRequest(=parent).
     */

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id",nullable=false )
    @JsonBackReference
    private KredietAanvraag kredietAanvraag;

}