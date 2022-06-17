package edu.ap.be.backend.controller;

import edu.ap.be.backend.exception.NotFoundException;
import edu.ap.be.backend.model.Role;
import edu.ap.be.backend.model.RoleType;
import edu.ap.be.backend.model.User;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;


    /**
     * Get a list of all existing users.
     * @return all users.
     */
    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get a user by his ID.
     * @param userID the ID of an user.
     * @return users information.
     * @throws NotFoundException if the ID doesn't exist.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable(value = "id") long userID) throws NotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new NotFoundException("User not found for this id :: " + userID));
        System.out.println(userRepository.findById(userID).toString());
        return ResponseEntity.ok().body(user);
    }

    /**
     * Creates an user.
     * @param user values of the user.
     * @return created user.
     */
    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @PostMapping("")
    public User createUser(@Validated @RequestBody User user) {
        return userRepository.save(user);
    }

    /**
     * Get user by using his mail (or username).
     * @param mail or username of an existing user.
     * @return the user found by his mail or username.
     * @throws NotFoundException if the email or username doesn't exist.
     */
    @GetMapping("/mail/{mail}")
    public ResponseEntity<User> getUserByMail(@PathVariable(value = "mail") String mail) throws NotFoundException {
        User user = userRepository.findUserByEmail(mail)
                .orElseThrow(() -> new NotFoundException("User not found for this id :: " + mail));
        return ResponseEntity.ok().body(user);
    }

    /**
     * Get all users by the role of 'Customer'.
     * @return all users that are customers.
     */
    @GetMapping("/klant")
    public Optional<Role> getUserKlant(){
        RoleType roleType = RoleType.KLANT;
        return roleRepository.findByRole(roleType);

    }


    /**
     * Update the values of an existing user searched up by his ID.
     * it can only be changed when the correct password from that user is entered.
     * @param userID the ID of an existing user.
     * @param userDetails the updated information for the user.
     * @return updated values
     * @throws NotFoundException if the userID doesn't exist.
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") long userID,
            @Validated @RequestBody User userDetails) throws NotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new NotFoundException("User not found for this id :: " + userID));

        user.setEmail(userDetails.getEmail());
        System.out.println(userDetails.getEmail());
        user.setLastName(userDetails.getLastName());
        user.setFirstName(userDetails.getFirstName());
        if (userDetails.getPassword() != "" || userDetails.getPassword() != null) {
            user.setPassword(encoder.encode((userDetails.getPassword())));
            System.out.println(userDetails.getPassword());
            System.out.println(encoder.encode(userDetails.getPassword()));
        }


        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Delete an existing user by his ID.
     * @param userID the ID of an existing user.
     * @return a response Deleted
     * @throws NotFoundException if the user ID doesn't exist.
     */
    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") long userID)
            throws NotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new NotFoundException("User not found for this id :: " + userID));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
