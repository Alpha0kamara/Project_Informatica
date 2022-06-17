package edu.ap.be.backend.payload;

import javax.validation.constraints.NotBlank;

/**
 * Login request class that is used for the authentication to login with its params.
 */
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
