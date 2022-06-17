package edu.ap.be.backend.model;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import java.io.File;


@Data
@Entity
@Table(name="Contract")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private long documentId;
    @Column
    private File contract;

}
