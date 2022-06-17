package edu.ap.be.backend.controller;

import edu.ap.be.backend.exception.NotFoundException;
import edu.ap.be.backend.model.Contract;
import edu.ap.be.backend.repository.ContractRepository;
import edu.ap.be.backend.repository.KredietAanvraagRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/contract")
public class ContractController {

    @Autowired
    private ContractRepository cRepo;
    private KredietAanvraagRepository kRepo;
    private UserRepository uRepo;


    @GetMapping("/")
    public List<Contract> getAllFeedback() {
        return cRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Contract> getKredietContractByID(@PathVariable(value = "id") long contractId) throws NotFoundException {

        return cRepo.findById(contractId);

    }


    @PostMapping("/")
    public Contract createContract(@Validated @RequestBody Contract contract) {

        return cRepo.save(contract);
    }







}
