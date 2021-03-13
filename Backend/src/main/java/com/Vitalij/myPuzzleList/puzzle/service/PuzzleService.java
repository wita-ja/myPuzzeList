package com.Vitalij.myPuzzleList.puzzle.service;

import com.Vitalij.myPuzzleList.puzzle.dto.PuzzleSummaryDto;
import com.Vitalij.myPuzzleList.puzzle.model.puzzle.Image;
import com.Vitalij.myPuzzleList.puzzle.model.puzzle.Puzzle;
import com.Vitalij.myPuzzleList.puzzle.repository.PuzzleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
                .description(puzzle.getDescription())
                .imagePath(puzzle.getPuzzleImages().stream().map(Image::getPath).collect(Collectors.toList())) // maybe veiks ir nesetinant null'us nes @builder konstruktorius virsesnis uz @value
                .build();
    }
}
