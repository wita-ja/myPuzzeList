package com.Vitalij.myPuzzleList.user.service;

import com.Vitalij.myPuzzleList.user.dto.UserDetailsDto;
import com.Vitalij.myPuzzleList.user.model.UserDetails;
import com.Vitalij.myPuzzleList.user.repository.UserRepository;
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

    private UserDetailsDto mapToUserDetailsDto(UserDetails userDetails) {
        return  UserDetailsDto.builder()
                .username(userDetails.getUsername())
                .description(userDetails.getDescription())
                .dateCreated(userDetails.getDate_created().toString())
                .activityPoints(userDetails.getActivityPoints())
                .ageGroup(userDetails.getAge_group())
                .role(userDetails.getRole().getName())
                .build();
    }
}
