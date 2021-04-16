package com.Vitalij.myPuzzleList.user.service;

import com.Vitalij.myPuzzleList.user.dto.LoginRequestDto;
import com.Vitalij.myPuzzleList.user.dto.UserDetailsDto;
import com.Vitalij.myPuzzleList.user.model.UserDetails;
import com.Vitalij.myPuzzleList.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetailsDto getUserDetails(String username) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        return mapToUserDetailsDto(userDetails);
    }

    public ResponseEntity<Object> userDataIsCorrect(LoginRequestDto requestBody) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(requestBody.getUsername());
        try {
            if (userDetails.getEncoder().matches(requestBody.getPassword(), userDetails.getPassword())) {
                return new ResponseEntity<Object>(HttpStatus.OK);
            } else  return  new ResponseEntity<>("Username or Password is incorrect",HttpStatus.UNAUTHORIZED);
        } catch (NullPointerException e) {
            return  new ResponseEntity<Object>("Username or Password is incorrect",HttpStatus.UNAUTHORIZED);
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
