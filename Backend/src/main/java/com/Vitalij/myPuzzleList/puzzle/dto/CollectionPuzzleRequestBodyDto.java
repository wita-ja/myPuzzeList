package com.Vitalij.myPuzzleList.puzzle.dto;

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
