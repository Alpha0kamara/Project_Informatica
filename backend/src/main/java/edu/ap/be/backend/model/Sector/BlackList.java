package edu.ap.be.backend.model.Sector;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name="BlackList")
public class BlackList {

    /**
     * Default constructor for blacklist
     */
    public BlackList(){}

    /**
     * Constructor with the given params for blacklist
     * @param id is the Nacebel code.
     * @param naam type of company's name.
     */
    public BlackList (long id, String naam){
        this.nacbelCode = id;
        this.naam = naam;


    }
    @Id
    private Long nacbelCode;
    @Column(nullable = false)
    private String naam;
}