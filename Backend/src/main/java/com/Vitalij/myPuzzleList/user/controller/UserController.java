package com.Vitalij.myPuzzleList.user.controller;


import com.Vitalij.myPuzzleList.user.dto.UserDetailsDto;
import com.Vitalij.myPuzzleList.user.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) { this.userService = userService; };

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/{username}")
    public UserDetailsDto getPuzzleDescriptionByID(
            @PathVariable String username
    ) {
        return userService.getUserDetails(username);
    }
}
