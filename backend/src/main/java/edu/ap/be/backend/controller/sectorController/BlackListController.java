package edu.ap.be.backend.controller.sectorController;
import edu.ap.be.backend.exception.NotFoundException;
import edu.ap.be.backend.model.Sector.BlackList;
import edu.ap.be.backend.repository.SectorRepository.BlackListRepository;
import edu.ap.be.backend.repository.SectorRepository.WhiteListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import edu.ap.be.backend.response.MessageResponse;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/blacklist")
public class BlackListController
{

    @Autowired
    private BlackListRepository blackListRepository;
    @Autowired
    private WhiteListRepository whiteListRepository;


    /**
     * Return a list of all type of company's and its Nacebel Code that got blacklisted.
     * @return a list of blacklisted type of company's and its Nacebel Code.
     */
    @GetMapping("/")
    public List<BlackList> getAllBlacklist() {
        return blackListRepository.findAll();
    }

    /**
     * return a type of company that is blacklisted by his ID (NacebelCode).
     * @param blackListID is the Nacebel Code.
     * @return the type of company and its Nacebel Code.
     * @throws NotFoundException if the Nacebel Code doesn't exist.
     */
    @GetMapping("/{id}")
    public Optional<BlackList> getBlackListByID(@PathVariable(value = "id") long blackListID) throws NotFoundException {
  
        return blackListRepository.findById(blackListID);

    }

    /**
     * Create one type of company in the blacklist.
     * @param blackList the name and NacebelCode.
     * @return added type of company in the blacklist.
     */
    @PostMapping("/")
    public ResponseEntity<?> createBlackList(@Validated @RequestBody BlackList blackList) {
       if(blackListRepository.existsById(blackList.getNacbelCode()) || whiteListRepository.existsById(blackList.getNacbelCode())){
        return ResponseEntity
        .badRequest()
        .body(new MessageResponse("Error: nacbel already exists!"));

       }

     blackListRepository.save(blackList);
     return ResponseEntity.ok(blackList);
    }

    /**
     * Update an existing type of company the name and Nacebel Code by its ID.
     * @param blackListDetails updated name of the type company and the Nacebel Code.
     * @return updated blacklist.
     * @throws NotFoundException if the type of company's name or nacebel code doesn't exist.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BlackList> updateBlackList(@RequestBody BlackList blackListDetails) throws NotFoundException {
        BlackList BlackList = blackListRepository.findById(blackListDetails.getNacbelCode())
                .orElseThrow(() -> new NotFoundException("BlackList not found for this id :: " + blackListDetails));
        BlackList.setNaam(blackListDetails.getNaam());
        BlackList.setNacbelCode(blackListDetails.getNacbelCode());
        

        final BlackList updatedBlackList = blackListRepository.save(BlackList);
        blackListRepository.save(BlackList);
        return ResponseEntity.ok(updatedBlackList);
    }

    /**
     * Delete  a type of company that is in the blacklist by its ID.
     * @param blackListID is the Nacebel Code.
     * @return OK response if it got deleted.
     * @throws NotFoundException if the type of company's name and Nacebel Code doesn't exist.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlackList(@PathVariable(value = "id") long blackListID) throws NotFoundException {

        blackListRepository.deleteById(blackListID);
        return ResponseEntity.ok(HttpStatus.OK);

    }

    /**
     * Delete everything in the blacklist.
     * @return OK response if everything got deleted.
     */
    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAllBlackList(){
        blackListRepository.deleteAll();
        return ResponseEntity.ok(HttpStatus.OK);

    }

}
