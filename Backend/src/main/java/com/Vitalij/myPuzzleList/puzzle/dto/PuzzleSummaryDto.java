package com.Vitalij.myPuzzleList.puzzle.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class PuzzleSummaryDto {
    UUID id;
    String title;
    String difficulty;
    String description;
    List<String> imagePath;
    Double averageScore;
    Double userRating;
}
