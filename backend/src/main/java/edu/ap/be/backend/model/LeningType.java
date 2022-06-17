package edu.ap.be.backend.model;

/**
 * Enumeration of the loan type.
 * Car loan, Property, Bussines Lending, Inventories, Weight Transport, Rent, Ownership,
 * Bussines property, Cash rate, Material.
 */
public enum LeningType {
    AUTOLENING("auto lening"),
    VASTGOED ("Vastgoed"),
    ZAKELIJKELENING ("Zakelijke lening"),
    INVENTARIS("Inventaris & winkelinrichting"),
    ZWAARTRANSPORT("Machines/zwaar transport"),
    HUUR("Verbouwing bedrijfspand(huur)"),
    EIGENDOM("Verbouwing bedrijfspand(eigendom)"),
    BEDRIJFSPAND("Aanschaf bedrijfspand"),
    KASKREDIET("Kaskrediet"),
    MATERIEEL("Aankoop van materieel");

    private String text;

    LeningType(String s) {
        this.text = s;
    }

}
