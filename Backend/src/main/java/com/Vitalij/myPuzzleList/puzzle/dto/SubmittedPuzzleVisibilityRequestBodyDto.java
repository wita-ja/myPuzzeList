package com.Vitalij.myPuzzleList.puzzle.dto;

import lombok.Builder;
import lombok.Value;


@Value
@Builder
public class SubmittedPuzzleVisibilityRequestBodyDto {
    Boolean approved;
    Boolean rejected;
}
