package com.Vitalij.myPuzzleList.puzzle.controller;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleDescriptionDto;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleSummaryDto;
import com.Vitalij.myPuzzleList.puzzle.model.Puzzle;
import com.Vitalij.myPuzzleList.puzzle.repository.PuzzleRepository;
import com.Vitalij.myPuzzleList.puzzle.service.PuzzleService;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/puzzle/")
public class PuzzleController {
    private final PuzzleService puzzleService;
    private final PuzzleRepository repository;

    public PuzzleController(PuzzleService puzzleService, PuzzleRepository repository) {
        this.puzzleService = puzzleService;
        this.repository = repository;
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

    //TODO Perrasyti su dto
    @PostMapping("/saveOne")
    public Puzzle save(@RequestBody Puzzle puzzle) {
        return repository.save(puzzle);
    }

}
