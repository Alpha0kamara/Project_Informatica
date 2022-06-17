 package edu.ap.be.backend.ControllerTests;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import edu.ap.be.backend.controller.KredietAanvraagController;
import edu.ap.be.backend.model.KredietAanvraag;
import edu.ap.be.backend.model.LeningType;
import edu.ap.be.backend.model.Rentevoet;
import edu.ap.be.backend.repository.KredietAanvraagRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class KredietAanvraagControllerTest {

        @Mock
        private KredietAanvraagRepository kRepository;

        @InjectMocks
        private KredietAanvraagController kController;

        @Test
        public void canRetrieveById() throws Exception {
                kRepository.deleteAll();
                final Long id = (long) 1;


                final KredietAanvraag kredietAanvraag = new KredietAanvraag(id, "test1", 8000000, 90000.00, 25, "BE0123.456.789", LeningType.AUTOLENING, Rentevoet.VARIABEL, 1);

                given(kRepository.findById(id)).willReturn(Optional.of(kredietAanvraag));

                final Optional<KredietAanvraag> expected = kController.getKredietAanvraagByID(id);
                assertThat(expected).isNotNull();

        }

        @Test
        public void canDeleteKredietAanvraag() throws Exception {
                final Long id = 1L;

                final KredietAanvraag kredietAanvraag = new KredietAanvraag(id, "test1", 8000000, 90000.00, 25, "BE0123.456.789", LeningType.AUTOLENING, Rentevoet.VARIABEL, 1);

                kRepository.save(kredietAanvraag);

                kController.deleteKredietAanvraag(id);

                verify(kRepository).deleteById(id);
        }

        @Test
        public void canAddKredietAanvraag() throws Exception {
                final Long id = 1L;

                final KredietAanvraag kredietAanvraag = new KredietAanvraag(id, "test1", 8000000, 90000.00, 25, "BE0123.456.789", LeningType.AUTOLENING, Rentevoet.VARIABEL, 1);

                given(kRepository.save(kredietAanvraag)).willAnswer(invocation -> invocation.getArgument(0));

                ResponseEntity<KredietAanvraag> savedKredietAanvraag = kController.createKredietAanvraag(kredietAanvraag);

                assertThat(savedKredietAanvraag).isNotNull();

                verify(kRepository).save(kredietAanvraag);

        }

        @Test
        void canRetrieveAllKredietAanvragen() {

                List<KredietAanvraag> kredietAanvragen = new ArrayList<>();

                kredietAanvragen.add(
                        new KredietAanvraag(1L, "test1", 8000000, 90000.00, 25, "BE0123.456.789", LeningType.AUTOLENING, Rentevoet.VARIABEL, 1));
                kredietAanvragen.add(
                        new KredietAanvraag(2L, "test2", 8000000, 90000.00, 25, "BE0123.456.789", LeningType.AUTOLENING, Rentevoet.VARIABEL, 1));
                kredietAanvragen.add(new KredietAanvraag(3L, "test3", 8000000, 90000.00, 25, "BE0123.456.789", LeningType.AUTOLENING, Rentevoet.VARIABEL, 1));

                given(kRepository.findAll()).willReturn(kredietAanvragen);

                List<KredietAanvraag> expected = kController.getAllKredietAanvragen();

                assertEquals(expected, kredietAanvragen);

        }
        @Test
        void canUpdateKrediet() throws JsonMappingException, JsonProcessingException{

                final KredietAanvraag kredietAanvraag = new KredietAanvraag(1L, "test1", 8000000, 90000.00, 25, "BE0123.456.789", LeningType.AUTOLENING, Rentevoet.VARIABEL, 1);

                given(kRepository.save(kredietAanvraag)).willReturn(kredietAanvraag);
                given(kRepository.getById(1L)).willReturn(kredietAanvraag);

                final ResponseEntity<KredietAanvraag> expected = kController.updateKredietAanvraag(kredietAanvraag);

                    assertThat(expected).isNotNull();
                    verify(kRepository).save(any(KredietAanvraag.class));
        }



}
 