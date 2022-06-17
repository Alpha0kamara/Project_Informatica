package edu.ap.be.backend.controller;

import edu.ap.be.backend.model.Role;
import edu.ap.be.backend.model.RoleType;
import edu.ap.be.backend.model.User;
import edu.ap.be.backend.payload.LoginRequest;
import edu.ap.be.backend.payload.SignupRequest;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import edu.ap.be.backend.response.JwtResponse;
import edu.ap.be.backend.response.MessageResponse;
import edu.ap.be.backend.security.jwt.JwtUtils;
import edu.ap.be.backend.security.service.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    /**
     * If the user exists and the correct email/username and password is entered
     * a JWT Token is gonna be generated and the user will get access.
     * @param loginRequest email/username and password
     * @return JWT Respone with the acces Token, ID, email/username and role
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
        String role = userDetails.getAuthority().toString();
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                role));
    }

    /**
     * A user is gonna be created with a role.
     * The roles are also gonna be checked if it exists.
     * The roles has to be created in the Database by using an SQL Script (only one time) as stated in the release plan.
     * @param signUpRequest value of the email/username, role, firstname, lastname and password.
     * @return a respone "User registered successfully!"
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Validated @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        // Create new user's account

        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), signUpRequest.getFirstName(), signUpRequest.getLastName());
        List<String> strRoles = new ArrayList<>();
        strRoles.add(signUpRequest.getRole());


        System.out.println(signUpRequest.getRole());
        System.out.println(signUpRequest.getEmail());
        System.out.println(signUpRequest.getPassword());




        if (strRoles == null) {
            Role userRole = roleRepository.findByRole(RoleType.ADMINISTRATOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            user.setRole(userRole);

        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase(Locale.ROOT)) {
                    case "administrator":
                        Role adminRole = roleRepository.findByRole(RoleType.ADMINISTRATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(adminRole);

                        break;
                    case "kantoormedewerker":
                        Role kantoorRole = roleRepository.findByRole(RoleType.KANTOORMEDEWERKER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(kantoorRole);

                        break;
                    case "commercieledirectie":
                        Role comdirectieRole = roleRepository.findByRole(RoleType.COMMERCIELEDIRECTIE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(comdirectieRole);

                        break;
                    case "compliancemedewerker":
                        Role complianceRole = roleRepository.findByRole(RoleType.COMPLIANCEMEDEWERKER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(complianceRole);

                        break;
                    case "systainabilitymedewerker":
                        Role sustainablityRole = roleRepository.findByRole(RoleType.SYSTAINABILITYMEDEWERKER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(sustainablityRole);

                        break;
                    case "kredietbeoordelaar":
                        Role kredietbeoordelaarRole = roleRepository.findByRole(RoleType.KREDIETBEOORDELAAR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(kredietbeoordelaarRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByRole(RoleType.KLANT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(userRole);

                }
            });
        }

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
