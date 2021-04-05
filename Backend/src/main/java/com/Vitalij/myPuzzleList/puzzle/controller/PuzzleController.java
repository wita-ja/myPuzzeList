package com.Vitalij.myPuzzleList.puzzle.controller;
import com.Vitalij.myPuzzleList.puzzle.dto.CollectionPuzzleRequestBodyDto;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleDescriptionDto;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleSummaryDto;
import com.Vitalij.myPuzzleList.puzzle.service.PuzzleService;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/api/puzzle/")
public class PuzzleController {
    private final PuzzleService puzzleService;

    public PuzzleController(PuzzleService puzzleService) {
        this.puzzleService = puzzleService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/getAll")
    public Page<PuzzleSummaryDto> getAllPuzzleSummaries(
            @RequestParam(defaultValue = "1", name = "page") Integer pageNo,
            @RequestParam(defaultValue = "title", name = "sortBy") String sortBy,
            @RequestParam(defaultValue =  "asc", name = "direction") String direction
    ) {
        if (sortBy.equals("difficulty")) sortBy = "difficulty.displayName";
        Pageable pageable = PageRequest.of(pageNo-1, 2, Sort.by(Sort.Direction.fromString(direction), sortBy));
        return puzzleService.getPuzzleSummaries(pageable);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/{id}")
    public PuzzleDescriptionDto getPuzzleDescriptionByID(
           @PathVariable UUID id
    ) {
        return puzzleService.getPuzzleDescription(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add/{puzzleId}")
    public ResponseEntity<Object> save(@RequestBody CollectionPuzzleRequestBodyDto requestBody,  @PathVariable UUID puzzleId) {

        if(isNull(requestBody.getStatus())) {
            return new ResponseEntity<>("Status is required", HttpStatus.BAD_REQUEST);
        } else if (isNull(requestBody.getUsername())) {
            return new ResponseEntity<>("Username is required", HttpStatus.BAD_REQUEST);
        } else if (isNull(puzzleService.getPuzzleById(puzzleId))) {
            return new ResponseEntity<>("Puzzle doesn't exist", HttpStatus.NOT_FOUND);
        } else return puzzleService.addPuzzleToUserCollection(requestBody, puzzleId);
    }
}
