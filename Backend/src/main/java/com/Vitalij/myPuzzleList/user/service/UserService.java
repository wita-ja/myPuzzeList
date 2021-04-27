package com.Vitalij.myPuzzleList.user.service;

import com.Vitalij.myPuzzleList.user.model.Role;
import com.Vitalij.myPuzzleList.user.userDto.LoginRequestDto;
import com.Vitalij.myPuzzleList.user.userDto.NewUserRequestDto;
import com.Vitalij.myPuzzleList.user.userDto.UserDetailsDto;
import com.Vitalij.myPuzzleList.user.model.UserDetails;
import com.Vitalij.myPuzzleList.user.userRepository.RoleRepository;
import com.Vitalij.myPuzzleList.user.userRepository.UserRepository;
import org.hibernate.exception.DataException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static java.util.Objects.isNull;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public UserDetailsDto getUserDetails(String username) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        return mapToUserDetailsDto(userDetails);
    }

    public ResponseEntity<Object> userDataIsCorrect(LoginRequestDto requestBody) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(requestBody.getUsername());

        try {
            if (isNull(userDetails)) {
                return  new ResponseEntity<>("Username or Password is incorrect",HttpStatus.UNAUTHORIZED);
            } else  if (userDetails.getEncoder().matches(requestBody.getPassword(), userDetails.getPassword()) == true) {
                return new ResponseEntity<Object>(HttpStatus.OK);
            } else {
                return  new ResponseEntity<>("Username or Password is incorrect",HttpStatus.UNAUTHORIZED);
            }
        } catch (NullPointerException e) {
            return  new ResponseEntity<Object>("Username or Password is incorrect",HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<Object> createUser(NewUserRequestDto requestBody) {
        Optional<UserDetails> userDetails = userRepository.findUserDetailsByUsernameOrEmail(requestBody.getUsername(), requestBody.getEmail());
        if(userDetails.isPresent()) {
            return new ResponseEntity<>("User with such username or email already exists", HttpStatus.CONFLICT);
        } else {
            try {
                Role regular = roleRepository.findRoleByName("Regular");
                UserDetails newUser = UserDetails.builder().id(UUID.randomUUID())
                        .role(regular)
                        .activityPoints(100)
                        .description("")
                        .age_group(requestBody.getAgeGroup())
                        .username(requestBody.getUsername())
                        .email(requestBody.getEmail())
                        .password(UserDetails.PASSWORD_ENCODER.encode(requestBody.getPassword()))
                        .date_created(Timestamp.valueOf(LocalDateTime.now()))
                        .build();

                userRepository.save(newUser);

                return new ResponseEntity<>("User was successfully created", HttpStatus.CREATED);
            } catch (DataException e) {
                System.out.println(e.getStackTrace());
                return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    private UserDetailsDto mapToUserDetailsDto(UserDetails userDetails) {
        return UserDetailsDto.builder()
                .username(userDetails.getUsername())
                .description(userDetails.getDescription())
                .dateCreated(userDetails.getDate_created().toString())
                .activityPoints(userDetails.getActivityPoints())
                .ageGroup(userDetails.getAge_group())
                .role(userDetails.getRole().getName())
                .build();
    }
}
