package com.Vitalij.myPuzzleList.puzzle.service;

import com.Vitalij.myPuzzleList.puzzle.dto.CollectionPuzzleDto;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleDescriptionDto;
import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleSummaryDto;
import com.Vitalij.myPuzzleList.puzzle.model.Image;
import com.Vitalij.myPuzzleList.puzzle.model.Material;
import com.Vitalij.myPuzzleList.puzzle.model.Puzzle;
import com.Vitalij.myPuzzleList.puzzle.model.UserPuzzle;
import com.Vitalij.myPuzzleList.puzzle.repository.PuzzleRepository;
import com.Vitalij.myPuzzleList.puzzle.repository.UserPuzzleRepository;
import com.Vitalij.myPuzzleList.user.model.UserDetails;
import com.Vitalij.myPuzzleList.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PuzzleService {
    private final PuzzleRepository puzzleRepository;
    private final UserPuzzleRepository userPuzzleRepository;
    private final UserRepository userRepository;

    /**
     * constructor injection pvz
     */
    public PuzzleService(PuzzleRepository puzzleRepository, UserPuzzleRepository userPuzzleRepository, UserRepository userRepository) {
        this.puzzleRepository = puzzleRepository;
        this.userPuzzleRepository = userPuzzleRepository;
        this.userRepository = userRepository;
    }

    public Page<PuzzleSummaryDto> getPuzzleSummaries(Pageable pageable) {
        Page<Puzzle> puzzles = puzzleRepository.findByApproved(true, pageable);
        return new PageImpl<>(
                puzzles.stream().map(this::mapToPuzzleSummaryDto).collect(Collectors.toList()),
                puzzles.getPageable(),
                puzzles.getTotalElements()
        );
    }

    public PuzzleDescriptionDto getPuzzleDescription(UUID id) {
        Puzzle puzzle = puzzleRepository.findPuzzleById(id);
        System.out.println(puzzle.getId());
        return mapToPuzzleDescriptionDto(puzzle);
    }

    public Page<CollectionPuzzleDto> getUserCollectionPuzzles(String username, Pageable pageable) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        Page<UserPuzzle> userPuzzles = userPuzzleRepository.findByUserDetails(userDetails, pageable);
        return new PageImpl<>(userPuzzles.stream().map(this::mapToCollectionPuzzleDto).collect(Collectors.toList()),
                userPuzzles.getPageable(),
                userPuzzles.getTotalElements());
    }

    private PuzzleSummaryDto mapToPuzzleSummaryDto (Puzzle puzzle) {
        return PuzzleSummaryDto.builder()
                .id(puzzle.getId())
                .title(puzzle.getTitle())
                .difficulty(puzzle.getDifficulty().getDisplayName())
                .description(puzzle.getDescription())
                .imagePath(puzzle.getPuzzleImages().stream().map(Image::getPath).collect(Collectors.toList()))
                .averageScore(9.99) //TODO average score pakeisti i neharcodinta
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

    private CollectionPuzzleDto mapToCollectionPuzzleDto (UserPuzzle userPuzzle) {
        return CollectionPuzzleDto.builder()
                .id(userPuzzle.getPuzzle().getId())
                .title(userPuzzle.getPuzzle().getTitle())
                .description(userPuzzle.getPuzzle().getDescription())
                .status(userPuzzle.getStatus().getName())
                .userScore(userPuzzle.getScore())
                .build();
    }
}
