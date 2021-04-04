package com.Vitalij.myPuzzleList.puzzle.service;

import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleDescriptionDto;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleSummaryDto;
import com.Vitalij.myPuzzleList.puzzle.model.Image;
import com.Vitalij.myPuzzleList.puzzle.model.Material;
import com.Vitalij.myPuzzleList.puzzle.model.Puzzle;
import com.Vitalij.myPuzzleList.puzzle.repository.PuzzleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;
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

    public Page<PuzzleSummaryDto> getPuzzleSummaries(Pageable pageable) {
        Page<Puzzle> puzzle = puzzleRepository.findByApproved(true, pageable);
        return new PageImpl<>(puzzle.stream().map(this::mapToPuzzleSummaryDto).collect(Collectors.toList()), puzzle.getPageable(), puzzle.getTotalElements());
        //stream iteruoja per kiekviena elementa ir permappina i kiekviena kita elementa in short
    }

    public PuzzleDescriptionDto getPuzzleDescription(UUID id) {
        Puzzle puzzle = puzzleRepository.findPuzzleById(id);
        System.out.println(puzzle.getId());
        return mapToPuzzleDescriptionDto(puzzle);
    }

    private PuzzleSummaryDto mapToPuzzleSummaryDto (Puzzle puzzle) {
//        return new PuzzleSummaryDto(
//                puzzle.getId(),
//                puzzle.getTitle(),
//                puzzle.getDifficulty().getDisplayName(),
//                puzzle.getDescription(),
//                null,
//                null, avg Score
//                null userScore
//        );
        //TODO add avgScore, userScore
        return PuzzleSummaryDto.builder()
                .id(puzzle.getId())
                .title(puzzle.getTitle())
                .difficulty(puzzle.getDifficulty().getDisplayName())
                .description(puzzle.getDescription())
                .imagePath(puzzle.getPuzzleImages().stream().map(Image::getPath).collect(Collectors.toList()))
                .build();
    }

    private PuzzleDescriptionDto mapToPuzzleDescriptionDto (Puzzle puzzle) {
        UUID puzzleSolutionId;
        // handlinu null'a jeigu puzzle neturi solutiono (expected result)
        try {
            puzzleSolutionId = puzzle.getSolution().getId();
        } catch (NullPointerException nullPointerException) {
            puzzleSolutionId = null;
        }

        return  PuzzleDescriptionDto.builder()
                .id(puzzle.getId())
                .title(puzzle.getTitle())
                .description(puzzle.getDescription())
                .difficulty("Level " + puzzle.getDifficulty().getLevel() + " - " + puzzle.getDifficulty().getDisplayName())
                .solutionId(puzzleSolutionId)
                .type(puzzle.getType().getName())
                .brand(puzzle.getBrand())
                .material(puzzle.getMaterials().stream().map(Material::getName).collect(Collectors.toList()))
                .imagePath(puzzle.getPuzzleImages().stream().map(Image::getPath).collect(Collectors.toList()))
                .averageScore(9.99) //TODO average score pakeisti i neharcodinta
                .build();
    }
}
