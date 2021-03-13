package com.Vitalij.myPuzzleList.puzzle.controller;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleSummaryDto;
import com.Vitalij.myPuzzleList.puzzle.model.puzzle.Puzzle;
import com.Vitalij.myPuzzleList.puzzle.repository.PuzzleRepository;
import com.Vitalij.myPuzzleList.puzzle.service.PuzzleService;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Page<PuzzleSummaryDto> show(
            @RequestParam(defaultValue = "0", name = "page") Integer pageNo
    ) {
        Pageable pageable = PageRequest.of(pageNo, 2, Sort.unsorted());
        return puzzleService.getPuzzleSummaries(pageable);
    }

    //TODO Perrasyti su dto
    @PostMapping("/saveOne")
    public Puzzle save(@RequestBody Puzzle puzzle) {
        return repository.save(puzzle);
    }

    //TODO Perrasyti su dto
    @PostMapping("/saveMany")
    public List<Puzzle> save(@RequestBody List<Puzzle> puzzles) {
        return repository.saveAll(puzzles);
    }

}
