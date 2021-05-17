package com.Vitalij.myPuzzleList.puzzle.puzzleDto;

import lombok.Builder;
import lombok.Value;


@Value
@Builder
public class SubmittedPuzzleVisibilityRequestBodyDto {
    Boolean approved;
    Boolean rejected;
}
