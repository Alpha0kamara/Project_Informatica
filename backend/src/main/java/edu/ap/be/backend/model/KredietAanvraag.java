package edu.ap.be.backend.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

import java.io.File;

@Data
@Entity
@Table(name="kredietaanvraag")
public class KredietAanvraag {

    /**
     * Default constructor of credit request.
     */
    public KredietAanvraag() {}

    /**
     * constructor of the credit request.
     * @param id the credit request.
     * @param naam project name of the credit request.
     * @param eigenVermogen equity capital of the company.
     * @param lening the amount of loan that is requested.
     * @param looptijd duration of credit request.
     * @param klantID VAT number.
     * @param leningType type of loan.
     * @param rentevoet interest rate
     * @param userID Id of the user.
     */
    public KredietAanvraag(long id, String naam, double eigenVermogen, double lening, int looptijd, String klantID, LeningType leningType, Rentevoet rentevoet, long userID) {
        this.id = id;
        this.naam = naam;
        this.eigenVermogen = eigenVermogen;
        this.lening = lening;
        this.looptijd = looptijd;
        this.klantID = klantID;
        this.userID= userID;
        this.leningType = leningType;
        this.rentevoet = rentevoet;
    }

    /**
     * This the primary key of the generated credit request.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "kredietaanvraag_id" ,unique=true, nullable = false)
    private long id;
    @OneToOne(
        mappedBy = "kredietAanvraag",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )

    /**
     * The primary key joins the column with feedback.
     */
    @PrimaryKeyJoinColumn

    /**
     *
     */
    @JsonManagedReference 
    private Feedback feedback; 
    @Column(name = "naam",nullable = false)
    private String naam;
    @Column(name = "eigenVermogen",nullable = false)
    private double eigenVermogen;
    @Column(name = "lening", nullable = false)
    private double lening;
    @Column(name = "looptijd", nullable = true)
    private int looptijd;
    @Column(name= "OndernemingsNummer", nullable = false)
    private String klantID;
    @Column(name= "userID", nullable = false)
    private long userID;
    @Column(name= "leningType", nullable = false)
    private LeningType leningType;
    @Column(name= "rentevoet", nullable = false)
    private Rentevoet rentevoet;
    @Column(name = "leningOmschrijving",nullable = false)
    private String leningOmschrijving;












}
