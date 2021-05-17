package com.Vitalij.myPuzzleList.puzzle.puzzleDto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CollectionPuzzleRequestBodyDto {
    String username;
    String status;
    Integer score;
    Boolean solutionUnlocked;
}
