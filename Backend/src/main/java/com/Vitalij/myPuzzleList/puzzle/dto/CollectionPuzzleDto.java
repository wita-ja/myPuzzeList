package com.Vitalij.myPuzzleList.puzzle.dto;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class CollectionPuzzleDto {
    UUID id;
    String title;
    String description;
    String status;
    Integer userScore;
}
