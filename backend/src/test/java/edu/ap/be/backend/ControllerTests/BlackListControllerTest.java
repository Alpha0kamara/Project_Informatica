package edu.ap.be.backend.ControllerTests;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import edu.ap.be.backend.controller.sectorController.BlackListController;
import edu.ap.be.backend.model.Sector.BlackList;
import edu.ap.be.backend.repository.SectorRepository.BlackListRepository;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class BlackListControllerTest {

        @Mock
        private BlackListRepository bRepository;

        @InjectMocks
        private BlackListController bController;

        @Test
        void canRetrieveAllBlack() {

                List<BlackList> blacklist = new ArrayList<>();

                blacklist.add(
                                new BlackList(5555L, "test1"));
                blacklist.add(
                                new BlackList(666L, "test2"));

                given(bRepository.findAll()).willReturn(blacklist);

                List<BlackList> expected = bController.getAllBlacklist();

                assertEquals(expected, blacklist);

        }

        @Test
        void canRetrieveById() {
                long id = 5555L;
                BlackList blackList = new BlackList(id, "test1");

                given(bRepository.findById(id)).willReturn(Optional.of(blackList));

                Optional<BlackList> expected = bController.getBlackListByID(id);

                assertThat(expected).isNotNull();

        }

        @Test
        public void canAddtoBlacklist() throws Exception {
                long id = 5555L;
                 final BlackList blacklist = new BlackList(id, "test1");

                given(bRepository.save(blacklist)).willAnswer(invocation -> invocation.getArgument(0));

                ResponseEntity<?> SavedN = bController.createBlackList(blacklist);

                assertThat(SavedN.getBody()).isNotNull();

                verify(bRepository).save(blacklist);

        }

        @Test
        public void canDelete() throws Exception {
                long id = 5555L;
                final BlackList blacklist = new BlackList(id, "test1");

                bRepository.save(blacklist);

                bController.deleteBlackList(id);

                verify(bRepository).deleteById(id);
        }
        

}
