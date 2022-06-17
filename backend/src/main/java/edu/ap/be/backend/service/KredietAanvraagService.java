package edu.ap.be.backend.service;

import org.springframework.stereotype.Service;

import edu.ap.be.backend.model.KredietStatus;
import edu.ap.be.backend.model.LeningType;
import edu.ap.be.backend.model.Sector.WhiteList;
import edu.ap.be.backend.model.Sector.BlackList;
import java.util.List;

@Service
public class KredietAanvraagService {
    /**
     * This method will check on the credit request when the status should be denied
     * by using an if statement and comparing the allowing min/max value.
     * @param leningType type of the loan.
     * @param eigenInbreng own equity.
     * @param lening the amount of loan.
     * @return the DENIED status.
     */
    public KredietStatus slechteAanvraagCheck(LeningType leningType, double eigenInbreng, double lening) {
        if (eigenInbreng / lening < 0.1 && eigenInbreng / lening < 1) {
            return KredietStatus.GEWEIGERD;
        } else {
            if (leningType == LeningType.AUTOLENING && lening < 10000) {
                return KredietStatus.GEWEIGERD;
            } else {
                if (leningType == LeningType.ZAKELIJKELENING && lening < 10000) {
                    return KredietStatus.GEWEIGERD;
                } else {
                    if (leningType == LeningType.KASKREDIET && lening < 10000) {
                        return KredietStatus.GEWEIGERD;
                    } else {
                        if (leningType == LeningType.BEDRIJFSPAND && lening < 50000) {
                            return KredietStatus.GEWEIGERD;
                        } else {
                            if (leningType == LeningType.EIGENDOM && lening < 20000) {
                                return KredietStatus.GEWEIGERD;
                            } else {
                                if (leningType == LeningType.HUUR && lening < 20000) {
                                    return KredietStatus.GEWEIGERD;
                                } else {
                                    if (leningType == LeningType.VASTGOED && lening < 100000) {
                                        return KredietStatus.GEWEIGERD;
                                    } else {
                                        if (leningType == LeningType.INVENTARIS && lening < 10000) {
                                            return KredietStatus.GEWEIGERD;
                                        } else {
                                            if (leningType == LeningType.ZWAARTRANSPORT && lening < 300000) {
                                                return KredietStatus.GEWEIGERD;
                                            } else {
                                                if (leningType == LeningType.MATERIEEL && lening < 10000) {
                                                    return KredietStatus.GEWEIGERD;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }

        return null;

    }

    /**
     * This method will check on the credit request when the status should be suspicious
     *  by using an if statement and comparing the allowing min/max value.
     * @param leningType type of the loan.
     * @param lening the amount of loan
     * @return the SUSPICIOUS status.
     */
    public KredietStatus verdachtCheck(LeningType leningType, double lening) {
        if (leningType == LeningType.AUTOLENING && lening > 300000) {
            return KredietStatus.VERDACHT;
        } else {
            if (leningType == LeningType.ZAKELIJKELENING && lening > 100000) {
                return KredietStatus.VERDACHT;
            } else {
                if (leningType == LeningType.KASKREDIET && lening > 100000) {
                    return KredietStatus.VERDACHT;
                } else {
                    if (leningType == LeningType.BEDRIJFSPAND && lening > 2000000) {
                        return KredietStatus.VERDACHT;
                    } else {
                        if (leningType == LeningType.EIGENDOM && lening > 500000) {
                            return KredietStatus.VERDACHT;
                        } else {
                            if (leningType == LeningType.HUUR && lening > 500000) {
                                return KredietStatus.VERDACHT;
                            } else {
                                if (leningType == LeningType.VASTGOED && lening > 3000000) {
                                    return KredietStatus.VERDACHT;
                                } else {
                                    if (leningType == LeningType.INVENTARIS && lening > 200000) {
                                        return KredietStatus.VERDACHT;
                                    } else {
                                        if (leningType == LeningType.ZWAARTRANSPORT && lening > 300000) {
                                            return KredietStatus.VERDACHT;
                                        } else {
                                            if (leningType == LeningType.MATERIEEL && lening > 50000) {
                                                return KredietStatus.VERDACHT;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }

        return null;
    }

    /**
     * This method will check if the customers are in the blacklist or whitelist.
     * the customers that are whitelisted will get the APPROVED status.
     * the customers that are blacklisted will get the DENIED status.
     * @param nacbelCode of the type of company.
     * @param whiteLists a list of type company's that are in the whitelist.
     * @param blackLists a list of type company's that are in the whitelist.
     * @return a STATUS APPROVED, DENIED OR NULL.
     */
    public KredietStatus sectorCheck(double nacbelCode, List<WhiteList> whiteLists, List<BlackList> blackLists) {

        boolean isWhiteList = false;
        boolean isBlackList = false;
        for (WhiteList whitelist : whiteLists) {
            if (whitelist.getNacbelCode() == nacbelCode) {
                isWhiteList = true;
            }
        }
        for (BlackList blacklist : blackLists) {
            if (blacklist.getNacbelCode() == nacbelCode) {
                isBlackList = true;
            }
        }

        if (isWhiteList) {
            return KredietStatus.GOEDGEKEURD;
        } else if (isBlackList) {

            return KredietStatus.GEWEIGERD;
        }
        return null;
    }
}
