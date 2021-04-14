package com.Vitalij.myPuzzleList.puzzle.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class PuzzleDescriptionDto {
    UUID id;
    String title;
    String description;
    String difficulty;
    String type;
    String brand;
    List<String> material;
    List<String> imagePath;
    Double averageScore;
    List<PuzzleSolutionStepDto> solutionDetails;
}
