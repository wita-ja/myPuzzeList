package com.Vitalij.myPuzzleList.puzzle.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PuzzleSolutionStepDto {
    String StepsDescription;
    String StepsImagePath;
}
