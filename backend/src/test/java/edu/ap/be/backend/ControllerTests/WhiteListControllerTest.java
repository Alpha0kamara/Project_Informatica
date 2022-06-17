package edu.ap.be.backend.ControllerTests;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import edu.ap.be.backend.controller.sectorController.WhiteListController;
import edu.ap.be.backend.model.Sector.WhiteList;
import edu.ap.be.backend.repository.SectorRepository.WhiteListRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class WhiteListControllerTest {

        @Mock
        private WhiteListRepository wRepository;

        @InjectMocks
        private WhiteListController wController;

        @Test
        void canRetrieveAllWhite() {

                List<WhiteList> whiteList = new ArrayList<>();

                whiteList.add(
                                new WhiteList(5555L, "test1"));
                whiteList.add(
                                new WhiteList(666L, "test2"));

                given(wRepository.findAll()).willReturn(whiteList);

                List<WhiteList> expected = wController.getAllWhiteLists();

                assertEquals(expected, whiteList);

        }

        @Test
        void canRetrieveById() {
                long id = 5555L;
                WhiteList whiteList = new WhiteList(id, "test1");

                given(wRepository.findById(id)).willReturn(Optional.of(whiteList));

                Optional<WhiteList> expected = wController.getWhiteListByID(id);

                assertThat(expected).isNotNull();

        }

        @Test
        public void canAddtoWhitelist() throws Exception {
                long id = 5555L;
                 final WhiteList whiteList = new WhiteList(id, "test1");

                given(wRepository.save(whiteList)).willAnswer(invocation -> invocation.getArgument(0));

                ResponseEntity<?> SavedN = wController.createWhiteList(whiteList);

                assertThat(SavedN.getBody()).isNotNull();

                verify(wRepository).save(whiteList);

        }

        @Test
        public void canDelete() throws Exception {
                long id = 5555L;
                final WhiteList whiteList = new WhiteList(id, "test1");

                wRepository.save(whiteList);

                wController.deleteWhiteList(id);

                verify(wRepository).deleteById(id);
        }
        

}
