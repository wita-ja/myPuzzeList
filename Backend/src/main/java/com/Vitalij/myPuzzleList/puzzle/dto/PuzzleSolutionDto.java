package com.Vitalij.myPuzzleList.puzzle.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class PuzzleSolutionDto {
   List<PuzzleSolutionStepDto> solutionDetails;
}
