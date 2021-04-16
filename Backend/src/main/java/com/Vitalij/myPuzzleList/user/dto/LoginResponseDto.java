package com.Vitalij.myPuzzleList.user.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginResponseDto {
    Boolean loggedIn;
    String username;
    String userRole;
}
