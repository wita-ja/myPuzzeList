package com.Vitalij.myPuzzleList.user.userDto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginResponseDto {
    Boolean loggedIn;
    String username;
    String userRole;
}
