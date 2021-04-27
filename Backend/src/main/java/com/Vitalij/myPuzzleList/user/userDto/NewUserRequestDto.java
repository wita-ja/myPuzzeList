package com.Vitalij.myPuzzleList.user.userDto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class NewUserRequestDto {
    String username;
    String email;
    String password;
    String ageGroup;
}
