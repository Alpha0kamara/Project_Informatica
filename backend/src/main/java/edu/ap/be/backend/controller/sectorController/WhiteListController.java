package edu.ap.be.backend.controller.sectorController;
import edu.ap.be.backend.exception.NotFoundException;
import edu.ap.be.backend.model.Sector.WhiteList;
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
@RequestMapping("/api/whitelist")
public class WhiteListController
{

    @Autowired
    private WhiteListRepository whiteListRepository;
    @Autowired
    private BlackListRepository blackListRepository;

    /**
     * Return a list of all type of company's and its Nacebel Code that got whitelisted.
     * @return a list of whitelisted type of company's and its Nacebel Code.
     */
    @GetMapping("/")
    public List<WhiteList> getAllWhiteLists() {
        return whiteListRepository.findAll();
    }

    /**
     * return a type of company that is whitelisted by his ID (NacebelCode).
     * @param whiteListID is the Nacebel Code.
     * @return the type of company and its Nacebel Code.
     * @throws NotFoundException if the Nacebel Code doesn't exist.
     */
    @GetMapping("/{id}")
    public Optional<WhiteList> getWhiteListByID(@PathVariable(value = "id") long whiteListID) throws NotFoundException {
  
        return whiteListRepository.findById(whiteListID);

    }


    /**
     * Create one type of company in the whitelist.
     * @param whiteList the name and NacebelCode.
     * @return added type of company in the whitelist.
     */
    @PostMapping("/")
    public ResponseEntity<?> createWhiteList(@Validated @RequestBody WhiteList whiteList) {
       if(blackListRepository.existsById(whiteList.getNacbelCode()) || whiteListRepository.existsById(whiteList.getNacbelCode())){
        return ResponseEntity
        .badRequest()
        .body(new MessageResponse("Error: nacbel already exists!"));

       }

     whiteListRepository.save(whiteList);
     return ResponseEntity.ok(whiteList);
    }


    /**
     * Delete  a type of company that is in the whitelist by its ID.
     * @param whiteListID is the Nacebel Code.
     * @return OK response if it got deleted.
     * @throws NotFoundException if the type of company's name and Nacebel Code doesn't exist.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWhiteList(@PathVariable(value = "id") long whiteListID) throws NotFoundException {

        whiteListRepository.deleteById(whiteListID);
        return ResponseEntity.ok(HttpStatus.OK);

    }

}
