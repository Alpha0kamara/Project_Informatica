package edu.ap.be.backend.model;

/**
 * Enumeration of the interest rate.
 * fixed or viable interest rate.
 */
public enum Rentevoet {
    VAST("Vaste rentevoet"), 
    VARIABEL("Variabele rentevoet");

    private String text;

    Rentevoet(String s) {
        this.text = s;
    }

    


}
