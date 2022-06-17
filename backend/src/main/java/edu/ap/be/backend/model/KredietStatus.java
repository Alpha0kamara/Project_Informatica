
package edu.ap.be.backend.model;

/**
 * enumeration of the status of the credit request.
 */
public enum KredietStatus {
    /**
     * Approved, Denied, pending and suspicious are the four status.
     */
    GOEDGEKEURD("Goedgekeurd"),
    GEWEIGERD ("Geweigerd"),
    INBEHANDELING ("In behandeling"),
    VERDACHT("Verdacht");

    private String text;

    KredietStatus(String s) {
        this.text = s;
    }
    public String getText(){
        return text;
    }

    public KredietStatus fromValue(String name) {
        return KredietStatus.valueOf(name.toUpperCase());
    }
}
