package edu.ap.be.backend.model.Sector;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name="WhiteList")
public class WhiteList {


    /**
     * Default constructor for whitelist.
     */
    public WhiteList(){}


    /**
     * Constructor with the given params for whitelist.
     * @param nacbelcode nacebelCode of the type company.
     * @param naam type of company's name.
     */
    public WhiteList(Long nacbelcode, String naam){
        this.nacbelCode= nacbelcode;
        this.naam= naam;
    }
    @Id
    private Long nacbelCode;
    @Column(nullable = false)
    private String naam;
}