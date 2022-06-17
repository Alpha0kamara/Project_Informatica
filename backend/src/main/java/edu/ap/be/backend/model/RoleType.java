package edu.ap.be.backend.model;

/**
 * Enumeration of the different role types.
 * Administrator, customer, office worker, credit reporting officer,
 * compliance officer, systainbility officer and commercial executive are the role types.
 */
public enum RoleType {
    ADMINISTRATOR,
    KLANT,
    KANTOORMEDEWERKER,
    KREDIETBEOORDELAAR,
    COMPLIANCEMEDEWERKER,
    SYSTAINABILITYMEDEWERKER,
    COMMERCIELEDIRECTIE;

    public RoleType fromValue(String name) {
        return RoleType.valueOf(name.toUpperCase());
    }
}
