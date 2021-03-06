package com.Vitalij.myPuzzleList.user.controller;

import com.Vitalij.myPuzzleList.puzzle.puzzleDto.CollectionPuzzleDto;
import com.Vitalij.myPuzzleList.puzzle.puzzleDto.CollectionPuzzleRequestBodyDto;
import com.Vitalij.myPuzzleList.puzzle.service.PuzzleService;
import com.Vitalij.myPuzzleList.user.userDto.LoginRequestDto;
import com.Vitalij.myPuzzleList.user.userDto.LoginResponseDto;
import com.Vitalij.myPuzzleList.user.userDto.NewUserRequestDto;
import com.Vitalij.myPuzzleList.user.userDto.UserDetailsDto;
import com.Vitalij.myPuzzleList.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static java.util.Objects.isNull;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user/")
public class UserController {
    private final UserService userService;
    private final PuzzleService puzzleService;

    public UserController(UserService userService, PuzzleService puzzleService) {
        this.userService = userService;
        this.puzzleService = puzzleService;
    }

    @GetMapping(value = "/{username}")
    public UserDetailsDto getUserDetails(
            @PathVariable String username
    ) {
        return userService.getUserDetails(username);
    }

    //TODO change size to 25
    @GetMapping(value = "/{username}/collection")
    public Page<CollectionPuzzleDto> getUserCollectionDetails(
            @PathVariable String username,
            @RequestParam(defaultValue = "1", name = "page") Integer pageNo,
            @RequestParam(defaultValue = "title", name = "sortBy") String sortBy,
            @RequestParam(defaultValue = "asc", name = "direction") String direction
    ) {
        if (sortBy.equals("title")) sortBy = "puzzle.title";
        else if (sortBy.equals("status")) sortBy = "status.name";
        Pageable pageable = PageRequest.of(pageNo - 1, 5, Sort.by(Sort.Direction.fromString(direction), sortBy));
        return puzzleService.getUserCollectionPuzzles(username, pageable);
    }

    @GetMapping(value = "/{username}/validate/collection/{puzzleId}")
    public Boolean isPuzzleInUserCollection(
            @PathVariable String username,
            @PathVariable UUID puzzleId
    ) {
        return puzzleService.isPuzzlePresentInUserCollection(username, puzzleId);
    }

    @PostMapping("/{username}/collection/add/{puzzleId}")
    public ResponseEntity<Object> savePuzzleToCollection(@RequestBody CollectionPuzzleRequestBodyDto requestBody, @PathVariable UUID puzzleId) {

        if (isNull(requestBody.getStatus())) {
            return new ResponseEntity<>("Status is required", HttpStatus.BAD_REQUEST);
        } else if (isNull(requestBody.getUsername())) {
            return new ResponseEntity<>("Username is required", HttpStatus.BAD_REQUEST);
        } else if (isNull(puzzleService.getPuzzleById(puzzleId))) {
            return new ResponseEntity<>("Puzzle doesn't exist", HttpStatus.NOT_FOUND);
        } else return puzzleService.addUserPuzzleCollection(requestBody, puzzleId);
    }

    @PutMapping("/{username}/collection/edit/{puzzleId}")
    public ResponseEntity<Object> updateCollectionPuzzleDetails(@RequestBody CollectionPuzzleRequestBodyDto requestBody, @PathVariable UUID puzzleId) {
        return puzzleService.updateUserPuzzleDetails(requestBody, puzzleId, false);
    }

    @DeleteMapping(value = "{username}/collection/delete/{puzzleId}")
    public ResponseEntity<Object> deleteCollectionPuzzle(
            @PathVariable String username,
            @PathVariable UUID puzzleId
    ) {
        return puzzleService.deleteUserPuzzle(username, puzzleId);
    }

    @GetMapping(value = "{username}/collection/{puzzleId}")
    public CollectionPuzzleRequestBodyDto getUserPuzzleDetails(
            @PathVariable String username,
            @PathVariable UUID puzzleId
    ) {
        return puzzleService.getUserPuzzleDetails(username, puzzleId);
    }

    @GetMapping(value = "/{username}/validate/collection/{puzzleId}/isSolutionUnlocked")
    public Boolean isPuzzleSolutionUnlocked(
            @PathVariable String username,
            @PathVariable UUID puzzleId
    ) {
        return puzzleService.isPuzzleSolutionUnlocked(username, puzzleId);
    }

    @PutMapping("/{username}/collection/unlockSolution/{puzzleId}")
    public ResponseEntity<Object> unlockPuzzleSolution(@RequestBody CollectionPuzzleRequestBodyDto requestBody, @PathVariable UUID puzzleId) {
        return puzzleService.updateUserPuzzleDetails(requestBody, puzzleId, true);
    }

    @PostMapping(value = "/login")
    public LoginResponseDto logIn(
           @RequestBody LoginRequestDto requestBody
    ) {
        HttpStatus userCanLogin = userService.userDataIsCorrect(requestBody).getStatusCode();
        if (userCanLogin == HttpStatus.OK) {
            return LoginResponseDto.builder()
                    .loggedIn(true)
                    .username(requestBody.getUsername())
                    .userRole(userService.getUserDetails(requestBody.getUsername()).getRole())
                    .build();
        } else return LoginResponseDto.builder()
                .loggedIn(false)
                .build();
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Object> createUser(
            @RequestBody NewUserRequestDto requestBody
    ) {
        return userService.createUser(requestBody);
    }
}
