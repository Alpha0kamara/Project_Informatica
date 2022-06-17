package edu.ap.be.backend.controller;
import edu.ap.be.backend.exception.NotFoundException;
import edu.ap.be.backend.model.KredietAanvraag;
import edu.ap.be.backend.repository.KredietAanvraagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/kredietaanvragen")
public class KredietAanvraagController
{

    @Autowired
    private KredietAanvraagRepository kredietAanvraagRepository;


    /**
     * Returns all credit requests that are created.
     * @return a list of ALL credit requests
     */
    @GetMapping("/")
    public List<KredietAanvraag> getAllKredietAanvragen() {
        return kredietAanvraagRepository.findAll();
    }

    /**
     * Return a credit request by using his ID.
     * @param kredietID the ID of the credit request instance you are looking for.
     * @return the credit request instance you are looking for IF it exists.
     * @throws NotFoundException if it doesnt exists
     */
    @GetMapping("/{id}")
    public Optional<KredietAanvraag> getKredietAanvraagByID(@PathVariable(value = "id") long kredietID) throws NotFoundException {
  
        return kredietAanvraagRepository.findById(kredietID);

    }


    /**
     * Return a list of credit requests created by a User.
     * @param userID the ID of an existing user.
     * @return a list of credit request from the user.
     * @throws NotFoundException if the user doesn't exists.
     */
    @GetMapping("/user/{id}")
    public List<KredietAanvraag> getKredietAanvraagByUserID(@PathVariable(value = "id") long userID) throws NotFoundException {

        List<KredietAanvraag> kredieten = new ArrayList<>();
        List<KredietAanvraag> allKredietList = kredietAanvraagRepository.findAll();
        for (KredietAanvraag kr : allKredietList) {
            if (kr.getUserID() == userID) {
                kredieten.add(kr);
            }
        }

        return kredieten;

    }

    /**
     * Create a credit request by calling the class KredietAanvraag and filling the right values.
     * @param kredietAanvraag is a class in the model directory.
     * @return a created credit request.
     */
    @PostMapping("/")
    public ResponseEntity<KredietAanvraag> createKredietAanvraag(@Validated @RequestBody KredietAanvraag kredietAanvraag) {
     kredietAanvraagRepository.save(kredietAanvraag);
     return ResponseEntity.ok(kredietAanvraag);
    }


    /**
     * Update an existing credit request by searching its ID and changing the values.
     * @param kredietDetails details of the updated credit request.
     * @return updated details of the credit request.
     * @throws NotFoundException if the ID is not found.
     */
    @PutMapping("/{id}")
    public ResponseEntity<KredietAanvraag> updateKredietAanvraag(@RequestBody KredietAanvraag kredietDetails) throws NotFoundException {
        KredietAanvraag kredietAanvraag = kredietAanvraagRepository.findById(kredietDetails.getId())
                .orElseThrow(() -> new NotFoundException("KredietAanvraag not found for this id :: " + kredietDetails));
        kredietAanvraag.setNaam(kredietDetails.getNaam());
        kredietAanvraag.setLening(kredietDetails.getLening());
        kredietAanvraag.setKlantID(kredietDetails.getKlantID());
        kredietAanvraag.setEigenVermogen(kredietDetails.getEigenVermogen());
        kredietAanvraag.setLeningType(kredietDetails.getLeningType());
        kredietAanvraag.setRentevoet(kredietDetails.getRentevoet());
        kredietAanvraag.setLooptijd(kredietDetails.getLooptijd());
        kredietAanvraag.setLeningOmschrijving(kredietDetails.getLeningOmschrijving());

        final KredietAanvraag updatedKredietAanvraag = kredietAanvraagRepository.save(kredietAanvraag);
        kredietAanvraagRepository.save(kredietAanvraag);
        return ResponseEntity.ok(updatedKredietAanvraag);
    }

    /**
     * Delete a credit request by his ID.
     * @param kredietID the id of a credit request.
     * @return OK when the credit request got deleted.
     * @throws NotFoundException if the ID doesn't exist.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKredietAanvraag(@PathVariable(value = "id") long kredietID) throws NotFoundException {

        kredietAanvraagRepository.deleteById(kredietID);
        return ResponseEntity.ok(HttpStatus.OK);

    }

    /**
     * Deletes all existing credit requests.
     * @return OK if all credit requests got deleted.
     */
    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAllFeedback(){
        kredietAanvraagRepository.deleteAll();
        return ResponseEntity.ok(HttpStatus.OK);

    }

}
