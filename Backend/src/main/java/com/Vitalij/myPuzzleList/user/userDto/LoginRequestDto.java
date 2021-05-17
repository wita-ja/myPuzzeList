package com.Vitalij.myPuzzleList.user.userDto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginRequestDto {
    String username;
    String password;
}
