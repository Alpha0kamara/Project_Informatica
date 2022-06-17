package edu.ap.be.backend.ControllerTests;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import edu.ap.be.backend.controller.UserController;
import edu.ap.be.backend.model.User;
import edu.ap.be.backend.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.mockito.BDDMockito.given;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserRepository uRepository;

    @InjectMocks
    private UserController uController;



        @Test
        public void canRetrieveById() throws Exception {
                uRepository.deleteAll();
                final Long id = (long) 1;
                final User user = new User("klant", "alpha", "alpha", "alpha");

                given(uRepository.findById(id)).willReturn(Optional.of(user));

                final ResponseEntity<User> expected = uController.getUserByID(id);
                assertThat(expected).isNotNull();

        }

        @Test
        public void canRetrieveByMail() throws Exception {
                uRepository.deleteAll();
                final User user = new User("klant@hotmail.com", "alpha", "alpha", "alpha");

                given(uRepository.findUserByEmail("klant@hotmail.com")).willReturn(Optional.of(user));

                final ResponseEntity<User> expected = uController.getUserByMail("klant@hotmail.com");
                assertThat(expected).isNotNull();

        }


        @Test
        public void canAddUser() throws Exception {

                final User user = new User("klant", "alpha", "alpha", "alpha");

                given(uRepository.save(user)).willAnswer(invocation -> invocation.getArgument(0));

                User savedUser = uController.createUser(user);

                assertThat(savedUser).isNotNull();

                verify(uRepository).save(user);

        }

        @Test
        void canRetrieveAllUsers() {

                List<User> users = new ArrayList<>();

                users.add(
                        new User("klant", "alpha", "alpha", "alpha")
                );
                users.add(
                        new User("zakarias", "zakarias", "zakarias", "zakarias")
                );

                given(uRepository.findAll()).willReturn(users);

                List<User> expected = uController.getAllUsers();

                assertEquals(expected, users);

        }


}
 