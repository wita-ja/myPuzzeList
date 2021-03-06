package com.Vitalij.myPuzzleList.user.userDto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserDetailsDto {
    String username;
    String description;
    String dateCreated;
    Integer activityPoints;
    String ageGroup;
    String role;
}
