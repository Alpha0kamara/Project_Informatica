package edu.ap.be.backend.controller;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.ap.be.backend.model.Feedback;
import edu.ap.be.backend.model.KredietStatus;
import edu.ap.be.backend.model.LeningType;
import edu.ap.be.backend.model.Sector.BlackList;
import edu.ap.be.backend.model.Sector.WhiteList;
import edu.ap.be.backend.repository.FeedbackRepository;
import edu.ap.be.backend.repository.KredietAanvraagRepository;
import edu.ap.be.backend.service.KredietAanvraagService;
import edu.ap.be.backend.service.RatioService;
import edu.ap.be.backend.repository.SectorRepository.*;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository repo;
    @Autowired
    private KredietAanvraagRepository krepo;

    @Autowired
    private RatioService ratioService;
    @Autowired
    private JaarrekeningController jaarrekeningController;
    @Autowired
    private KredietAanvraagService kredietAanvraagService;
    @Autowired
    private BlackListRepository blackListRepository;
    @Autowired
    private WhiteListRepository whiteListRepository;


    /**
     * Returns every Feedback instance connected to a credit request.
     * @return A list of all feedback entities.
     */
    @GetMapping("/")
    public List<Feedback> getAllFeedback() {
        return repo.findAll();
    }

    /**
     * Returns a specific Feedback instance if it exists.
     * @param documentId the id of the feedback instance you are looking for.
     * @return The Feedback instance you are looking for if it exists.
     */
    @GetMapping("/{id}")
    public Optional<Feedback> getFeedbackById(@PathVariable(value = "id") long documentId) {

        return repo.findById(documentId);

    }

    /**
     * Posts a body of feedback with a few checks that are broken down in the service layers. Before the post happens it checks
     * if the body meets the proper requirements for a credit request. Then it checks if it's a suspicious credit request.
     * Finally there is a check that looks if the nacbelcode of the vat is in the whitelist or blacklist & a check that makes sure that the rentability & solvability are withing acceptable range.
     * @param feedback A body of feedback.
     * @return response with an OK body if the feedback request is successfully posted.
     */
    @PostMapping("/")
    public ResponseEntity<Feedback> addFeedback(@Validated @RequestBody @Nullable Feedback feedback)
            throws JsonMappingException, JsonProcessingException {
        String ondernemingsNr = krepo.getById(feedback.getDocumentId()).getKlantID();
        double eigenInbreng = krepo.getById(feedback.getDocumentId()).getEigenVermogen();
        double teLenenBedrag = krepo.getById(feedback.getDocumentId()).getLening();
        LeningType leningType = krepo.getById(feedback.getDocumentId()).getLeningType();
        List<WhiteList> whiteLists = whiteListRepository.findAll();
        List <BlackList> blackLists = blackListRepository.findAll();


        feedback.setStatus(kredietAanvraagService.slechteAanvraagCheck(leningType,eigenInbreng, teLenenBedrag));
        if (feedback.getStatus() != KredietStatus.GEWEIGERD) {
            feedback.setStatus(kredietAanvraagService.verdachtCheck(leningType, teLenenBedrag));
            if (feedback.getStatus() != KredietStatus.VERDACHT) {
                feedback.setStatus(kredietAanvraagService.sectorCheck(jaarrekeningController.getNacbelCode(ondernemingsNr), whiteLists, blackLists));
                if(feedback.getStatus() != KredietStatus.GOEDGEKEURD && feedback.getStatus() != KredietStatus.GEWEIGERD){
                    feedback.setStatus(ratioService.bepaalStatus(jaarrekeningController.getLiquiditeit(ondernemingsNr),
                jaarrekeningController.getSolvabiliteit(ondernemingsNr)));
                }
            }
        }

        feedback.setOmschrijving(ratioService.bepaalOmschrijving(feedback.getStatus()));
        repo.save(feedback);

        return ResponseEntity.ok(feedback);

    }


    /**
     * Updates a specific Feedback instance with the given Feedback body.
     * @param f Feedback body given by the user
     * @return OK when the feedback instance is successfully updated.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedbackById(@RequestBody Feedback f)
            throws JsonMappingException, JsonProcessingException {
        // String ondernemingsNr = krepo.getById(f.getDocumentId()).getKlantID();
        Feedback feedback = repo.getById(f.getDocumentId());

        // feedback.setStatus(ratioService.bepaalStatus(jaarrekeningController.getLiquiditeit(ondernemingsNr),
        // jaarrekeningController.getSolvabiliteit(ondernemingsNr)));
        feedback.setStatus(f.getStatus());
        feedback.setOmschrijving(f.getOmschrijving());
        repo.save(feedback);

        return ResponseEntity.ok(feedback);

    }

}
