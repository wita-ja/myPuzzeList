package com.Vitalij.myPuzzleList.puzzle.puzzleDto;

import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class SubmittedPuzzleDto {
    UUID id;
    String title;
    String description;
    String difficulty;
    String type;
    String brand;
    List<String> imagePath;
    List<String> materials;
    Boolean approved;
    Boolean rejected;
}
