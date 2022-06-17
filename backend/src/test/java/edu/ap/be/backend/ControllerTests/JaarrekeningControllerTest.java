package edu.ap.be.backend.ControllerTests;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import edu.ap.be.backend.controller.JaarrekeningController;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class JaarrekeningControllerTest {

    

    @InjectMocks
    private JaarrekeningController jController;
    String url = "http://projectbus10.p.bletchley.cloud:8093/companydata/";
    RestTemplate restTemplate = new RestTemplate();
    String ondernemingsNummer = "BE0123.456.789";


        @Test
        public void canRetrieveJaarrekening() throws Exception {


            ResponseEntity<String> expected = restTemplate.getForEntity(url + "/" + ondernemingsNummer, String.class);


            assertThat(expected).isNotNull();

        }



}
 