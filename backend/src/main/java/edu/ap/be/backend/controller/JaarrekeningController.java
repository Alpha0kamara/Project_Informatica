package edu.ap.be.backend.controller;

import edu.ap.be.backend.service.RatioService;

import java.io.Console;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import ch.qos.logback.core.joran.conditional.ThenAction;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/jaarrekening")


public class JaarrekeningController {
    @Autowired
    private RatioService ratioService;
    String url = "http://projectbus10.p.bletchley.cloud:8093/companydata/";
    RestTemplate restTemplate = new RestTemplate();


    /**
     * By using an existing VAT number we can get all financial statements from the external API used in the url above.
     * @param ondernemingsNummer an existing VAT number
     * @return a response with all financial statements of the VAT.
     * @throws JsonMappingException if it signals a problem with mapping of the content.
     * @throws JsonProcessingException if it signals a problem with processing the content.
     */
    @GetMapping("/{id}")
    public ResponseEntity<String> getJaarrekeningByOndernemingsNr(
            @PathVariable(value = "id") String ondernemingsNummer)
            throws JsonMappingException, JsonProcessingException {

        ResponseEntity<String> response = restTemplate.getForEntity(url + "/" + ondernemingsNummer, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());

        return response;

    }


    /**
     * This will return the nacebel Code of an existing VAT number.
     * @param ondernemingsNummer is an existing VAT Number.
     * @return Nacebel Code the VAT number.
     * @throws JsonMappingException if it signals a problem with mapping of the content.
     * @throws JsonProcessingException if it signals a problem with processing the content.
     */
    @GetMapping("/{id}/nacbelcode")
    public double getNacbelCode(@PathVariable(value = "id") String ondernemingsNummer)
            throws JsonMappingException, JsonProcessingException {

        ResponseEntity<String> response = restTemplate.getForEntity(url + "/" + ondernemingsNummer, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());
        Long nacbelCode = root.path("nacbelCode").asLong();
      
        

        return  nacbelCode;
        //((equity / (shortTermDebt + longTermDebt)) * 1);
        
    }

    /**
     * The solvency will be calculated and returned from a company by getting his financial statements.
     * In the RatioService are methods created to calculate the solvency.
     * @param ondernemingsNummer is an existing VAT Number.
     * @return calculated solvency.
     * @throws JsonMappingException if it signals a problem with mapping of the content.
     * @throws JsonProcessingException if it signals a problem with processing the content.
     */
    @GetMapping("/{id}/solvabiliteit")
    public double getSolvabiliteit(@PathVariable(value = "id") String ondernemingsNummer)
            throws JsonMappingException, JsonProcessingException {

        ResponseEntity<String> response = restTemplate.getForEntity(url + "/" + ondernemingsNummer, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());
        Double longTermDebt = root.path("longTermDebt").asDouble();
        Double shortTermDebt = root.path("shortTermDebt").asDouble();
        Double equity = root.path("equity").asDouble();

        return  ratioService.berekenSolvabiliteit(equity, shortTermDebt, longTermDebt);
        //((equity / (shortTermDebt + longTermDebt)) * 1);
        
    }

    /**
     * The liquidity will be calculated and returned from a company by getting his financial statements.
     * In the RatioService are methods created to calculate the solvency.
     * @param ondernemingsNummer is an existing VAT Number.
     * @return calculated liquidity.
     * @throws JsonMappingException if it signals a problem with mapping of the content.
     * @throws JsonProcessingException if it signals a problem with processing the content.
     */
    @GetMapping("/{id}/liquiditeit")
    public double getLiquiditeit(@PathVariable(value = "id") String ondernemingsNummer)
            throws JsonMappingException, JsonProcessingException {

        ResponseEntity<String> response = restTemplate.getForEntity(url + "/" + ondernemingsNummer, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());
        Double currentAssets = root.path("currentAssets").asDouble();

        Double shortTermDebt = root.path("shortTermDebt").asDouble();
        
        return ratioService.berekenLiquiditeit(currentAssets, shortTermDebt);
    }


}