package com.Vitalij.myPuzzleList.puzzle.service;

import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleSummaryDto;
import com.Vitalij.myPuzzleList.puzzle.model.puzzle.Puzzle;
import com.Vitalij.myPuzzleList.puzzle.repository.PuzzleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PuzzleService {
    private final PuzzleRepository puzzleRepository;

    /**
     * constructor injection pvz
     */
    public PuzzleService(PuzzleRepository puzzleRepository) {
        this.puzzleRepository = puzzleRepository;
    }

    public List<PuzzleSummaryDto> getPuzzleSummaries() {
     //   puzzleRepository.findAll(PageRequest.of()) pageable object
        List<Puzzle> puzzle = puzzleRepository.findByApproved(true);
        return puzzle.stream().map(this::mapToPuzzleSummaryDto).collect(Collectors.toList());
        //stream iteruoja per kiekviena elementa ir permappina i kiekviena kita elementa in short
    }

    private PuzzleSummaryDto mapToPuzzleSummaryDto (Puzzle puzzle) {
//        return new PuzzleSummaryDto(
//                puzzle.getId(),
//                puzzle.getTitle(),
//                puzzle.getDifficulty().getDisplayName(),
//                puzzle.getDescription(),
//                null,
//                null,
//                null
//        );

        return PuzzleSummaryDto.builder()
                .id(puzzle.getId())
                .title(puzzle.getTitle())
                .difficulty(puzzle.getDifficulty().getDisplayName())
                .description(puzzle.getDescription()) // maybe veiks ir nesetinant null'us nes @builder konstruktorius virsesnis uz @value
                .build();
    }
}
