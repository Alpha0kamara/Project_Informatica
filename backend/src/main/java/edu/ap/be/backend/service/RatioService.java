package edu.ap.be.backend.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import edu.ap.be.backend.model.Feedback;
import edu.ap.be.backend.model.KredietStatus;
import edu.ap.be.backend.model.LeningType;
import edu.ap.be.backend.model.Sector.WhiteList;
import edu.ap.be.backend.model.Sector.BlackList;

@Service
/**
 * The Ratioservice calcutes the solvency, liquidity and
 * also determines the given status to be given to the feeback
 */
public class RatioService {

    private Feedback feedback;

    /**
     * formula to calculate solvency
     * @param eigenVermogen own equity
     * @param schuldenKT short term debts
     * @param schuldenLT long term debts
     * @return result solvency
     */
    public Double berekenSolvabiliteit(double eigenVermogen, double schuldenKT, double schuldenLT) {
        return eigenVermogen / (eigenVermogen+schuldenKT + schuldenLT)*100;
    }


    /**
     * formula to calculate liquidity
     * @param vlottendeActiva current assets
     * @param kortVreemdVermogen short-term debt
     * @return result liquidity
     */
    public Double berekenLiquiditeit(double vlottendeActiva, double kortVreemdVermogen) {
        return vlottendeActiva / kortVreemdVermogen;

    }

    /**
     * this method defines the description of a given status
     * @param kredietStatus status of a credit request.
     * @return a description
     */
    public String bepaalOmschrijving(KredietStatus kredietStatus) {
         if (kredietStatus == KredietStatus.GOEDGEKEURD) {
         return "Gefeliciteerd, uw aanvraag is goedgekeurd. U ontvangt zodadelijk een prijszetting.";
         }else
        if (kredietStatus == KredietStatus.INBEHANDELING) {
            return "Uw aanvraag wordt behandeld door een kredietbeoordeelaar";
        } else if (kredietStatus == KredietStatus.GEWEIGERD) {
            return "Jammer genoeg kunnen wij u geen krediet uitlenen.";

        } else if (kredietStatus == KredietStatus.VERDACHT) {
            return "U onvangt zodadelijk een reden van afkeuring.";
        }
        return null;

    }

    /**
     * this method determines the status based on the calculated liquidity and solvency.
     * @param liquiditeit liquidity of the company.
     * @param solvabiliteit solvency of the company.
     * @return the Status.
     */
    public KredietStatus bepaalStatus(double liquiditeit, double solvabiliteit){

            if (liquiditeit>=1.1 || solvabiliteit >=10) {
              
                return KredietStatus.INBEHANDELING;
            }else{
                if (liquiditeit <1.1 && solvabiliteit <10) {
          
                    return KredietStatus.GEWEIGERD;
                }
            }
    
    
    
    return null;
    
}

}
