package edu.ap.be.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    /**
     * The ID is auto generated.
     */

    @Enumerated(EnumType.STRING)
    private RoleType role;
    /**
     * Type role from the created enumeration.
     */

    @OneToMany(mappedBy = "role")
    /**
     * The reason of usage for the OneToMany is that ONE role can have different users.
     */
    @JsonManagedReference
    private List<User> users;


    public Role(RoleType role) {
        this.role = role;
    }

    public Role(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void add(RoleType role){
        this.role = role;
    }

}
