package edu.ap.be.backend.security.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.ap.be.backend.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;


/**
 * To get more data we create an implemantation of UserDetails interface.
 */
public class UserDetailsImp implements UserDetails {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String email;
    @JsonIgnore
    private String password;
    private GrantedAuthority authority;

    /**
     * constructor for the UserDetails implementation.
     * @param id
     * @param email or username from the user
     * @param password from the user
     * @param authority is used role.
     */
    public UserDetailsImp(Long id, String email, String password,
                         GrantedAuthority authority) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authority = authority;
    }

    public static UserDetailsImp build(User user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getRole().toString());


        return new UserDetailsImp(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authority);
    }



    public GrantedAuthority getAuthority() {
        return authority;
    }

    public String getEmail(){
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return null;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImp user = (UserDetailsImp) o;
        return Objects.equals(id, user.id);
    }

    public Long getId() {
        return id;
    }
}
