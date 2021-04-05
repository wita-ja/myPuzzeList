package com.Vitalij.myPuzzleList.user.controller;


import com.Vitalij.myPuzzleList.puzzle.dto.CollectionPuzzleDto;
import com.Vitalij.myPuzzleList.puzzle.service.PuzzleService;
import com.Vitalij.myPuzzleList.user.dto.UserDetailsDto;
import com.Vitalij.myPuzzleList.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/")
public class UserController {
    private final UserService userService;
    private final PuzzleService puzzleService;

    public UserController(UserService userService, PuzzleService puzzleService) {
        this.userService = userService;
        this.puzzleService = puzzleService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/{username}")
    public UserDetailsDto getUserDetails(
            @PathVariable String username
    ) {
        return userService.getUserDetails(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/{username}/collection")
    public Page<CollectionPuzzleDto> getUserCollectionDetails(
            @PathVariable String username,
            @RequestParam(defaultValue = "1", name = "page") Integer pageNo,
            @RequestParam(defaultValue = "title", name = "sortBy") String sortBy,
            @RequestParam(defaultValue =  "asc", name = "direction") String direction
    ) {
        if (sortBy.equals("title")) sortBy = "puzzle.title";
        else if (sortBy.equals("status")) sortBy = "status.name";
        Pageable pageable = PageRequest.of(pageNo-1, 2, Sort.by(Sort.Direction.fromString(direction), sortBy));
        return puzzleService.getUserCollectionPuzzles(username, pageable);
    }
}
