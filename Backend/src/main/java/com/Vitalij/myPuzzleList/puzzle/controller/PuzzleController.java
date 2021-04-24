package com.Vitalij.myPuzzleList.puzzle.controller;

import com.Vitalij.myPuzzleList.puzzle.puzzleDto.*;
import com.Vitalij.myPuzzleList.puzzle.service.PuzzleService;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

import static java.util.Objects.isNull;

@RestController
@CrossOrigin(origins = "http://localhost:5000")
@RequestMapping("/api/puzzle/")
public class PuzzleController {
    private final PuzzleService puzzleService;

    public PuzzleController(PuzzleService puzzleService) {
        this.puzzleService = puzzleService;
    }

    @GetMapping(value = "/getAll")
    public Page<PuzzleSummaryDto> getAllPuzzleSummaries(
            @RequestParam(defaultValue = "1", name = "page") Integer pageNo,
            @RequestParam(defaultValue = "title", name = "sortBy") String sortBy,
            @RequestParam(defaultValue = "asc", name = "direction") String direction
    ) {
        if (sortBy.equals("difficulty")) sortBy = "difficulty.displayName";
        Pageable pageable = PageRequest.of(pageNo - 1, 5, Sort.by(Sort.Direction.fromString(direction), sortBy));
        return puzzleService.getPuzzleSummaries(pageable);
    }

    @GetMapping(value = "/{id}")
    public PuzzleDescriptionDto getPuzzleDescriptionByID(
            @PathVariable UUID id
    ) {
        return puzzleService.getPuzzleDescription(id);
    }


    @GetMapping(value = "/submitted/{id}")
    public SubmittedPuzzleDto getSubmittedPuzzleDescriptionByID(
            @PathVariable UUID id
    ) {
        return puzzleService.getSubmittedPuzzleDescription(id);
    }

    @GetMapping(value = "/getStatuses")
    public List<PuzzleStatusDto> getPuzzleStatuses(
    ) {
        return puzzleService.getPuzzleStatuses();
    }

    //TODO pakeisti i 25 irasus per psl
    @GetMapping(value = "/getAllSubmitted")
    public Page<SubmittedPuzzleDto> getAllSubmittedPuzzleSummaries(
            @RequestParam(defaultValue = "1", name = "page") Integer pageNo,
            @RequestParam(defaultValue = "title", name = "sortBy") String sortBy,
            @RequestParam(defaultValue = "asc", name = "direction") String direction
    ) {
        if (sortBy.equals("difficulty")) sortBy = "difficulty.displayName";
        Pageable pageable = PageRequest.of(pageNo - 1, 5, Sort.by(Sort.Direction.fromString(direction), sortBy));
        return puzzleService.getSubmittedPuzzleSummaries(pageable);
    }

    @PutMapping("/submitted/{puzzleId}/changeVisibility")
    public ResponseEntity<Object> updateSubmittedPuzzleVisibility(@RequestBody SubmittedPuzzleVisibilityRequestBodyDto requestBody, @PathVariable UUID puzzleId) {

        if(isNull(requestBody.getApproved()) && isNull(requestBody.getRejected())) {
            return new ResponseEntity<>("RequestBody cannot be empty",HttpStatus.BAD_REQUEST);
        } else
        return puzzleService.updateSubmittedPuzzleVisibility(requestBody, puzzleId);
    }

    @GetMapping(value = "/getDifficulties")
    public List<PuzzleDifficultyDto> getPuzzleDifficulties(
    ) {
        return puzzleService.getPuzzleDifficulties();
    }

    @GetMapping(value = "/getTypes")
    public List<PuzzleTypeDto> getPuzzleTypes(
    ) {
        return puzzleService.getPuzzleTypes();
    }

    @GetMapping(value = "/getMaterials")
    public List<PuzzleMaterialDto> getPuzzleMaterials(
    ) {
        return puzzleService.getPuzzleMaterials();
    }

    @PostMapping("/saveImage")
    public ResponseEntity<Object> savePuzzleToCollection(
            @RequestParam(name = "file") MultipartFile file
    ) {
        return puzzleService.saveImage(file);
    }

    @PostMapping("/submitPuzzle")
    public ResponseEntity<Object> savePuzzleToCollection(@RequestBody SubmittedPuzzleDto requestBody) {
        return puzzleService.submitPuzzle(requestBody);
    }
}
