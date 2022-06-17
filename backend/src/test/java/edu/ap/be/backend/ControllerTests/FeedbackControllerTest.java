package edu.ap.be.backend.ControllerTests;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import edu.ap.be.backend.controller.FeedbackController;
import edu.ap.be.backend.model.Feedback;
import edu.ap.be.backend.model.KredietStatus;
import edu.ap.be.backend.repository.FeedbackRepository;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class FeedbackControllerTest {

    @Mock
    private FeedbackRepository fRepository;

    @InjectMocks
    private FeedbackController fController;

        @Test
        public void canRetrieveById() throws Exception {
                fRepository.deleteAll();
                final Long id = (long) 1;

                final Feedback feedback = new Feedback(id, "test", KredietStatus.GOEDGEKEURD);
                given(fRepository.findById(id)).willReturn(Optional.of(feedback));

                final Optional<Feedback> expected = fController.getFeedbackById(id);
                assertThat(expected).isNotNull();

        }


        @Test
        public void canAddKredietAanvraag() throws Exception {
                final Long id = 1L;

                final Feedback feedback = new Feedback(id, "test", KredietStatus.GOEDGEKEURD);

                given(fRepository.save(feedback)).willAnswer(invocation -> invocation.getArgument(0));

                ResponseEntity<Feedback> savedFeedback = fController.addFeedback(feedback);

                assertThat(savedFeedback).isNotNull();

                verify(fRepository).save(feedback);

        }

        @Test
        void canRetrieveAllFeedback() {

                List<Feedback> feedbacks = new ArrayList<>();

                feedbacks.add(
                    new Feedback(1L, "test", KredietStatus.GOEDGEKEURD));
                        feedbacks.add(
                            new Feedback(2L, "test", KredietStatus.GOEDGEKEURD));
                        feedbacks.add(new Feedback(3L, "test", KredietStatus.GOEDGEKEURD));

                given(fRepository.findAll()).willReturn(feedbacks);

                List<Feedback> expected = fController.getAllFeedback();

                assertEquals(expected, feedbacks);

        }

        @Test
        void canUpdateFeedback() throws JsonMappingException, JsonProcessingException{

                final Feedback feedback = new Feedback(1L, "omschrijving", KredietStatus.GEWEIGERD);
                given(fRepository.save(feedback)).willReturn(feedback);
                given(fRepository.getById(1L)).willReturn(feedback);

                final ResponseEntity<Feedback> expected = fController.updateFeedbackById(feedback);

                    assertThat(expected).isNotNull();
                    verify(fRepository).save(any(Feedback.class));
        }


}
 