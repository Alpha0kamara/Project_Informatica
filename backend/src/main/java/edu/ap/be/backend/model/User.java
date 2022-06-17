package edu.ap.be.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users", uniqueConstraints = @UniqueConstraint(columnNames = "id"))
@Data

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = edu.ap.be.backend.model.Role.class)
    @JoinColumn(name = "role")
    /**
     * role joins the users table
     */
    @JsonBackReference
    private Role role;
  
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "firstName")
    private String firstName;
    @Column
    private Boolean isActief = true;
    @Column(name="klantScore")
    private int klantScore;
    /**
     * klantScore is the rating of a user how trusted he is as a customer
     */


    /**
     * constructor for the user
     * @param email or username of the user
     * @param password the password of the user
     * @param firstName of the user
     * @param lastName of the user
     */
    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;

    }

    public User() {

    }
}