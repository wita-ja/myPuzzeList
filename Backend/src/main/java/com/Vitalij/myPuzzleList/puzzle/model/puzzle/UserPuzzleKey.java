package com.Vitalij.myPuzzleList.puzzle.model.puzzle;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Getter
@EqualsAndHashCode
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserPuzzleKey implements Serializable {

    @Column(name = "USER_ID", nullable = false)
    private UUID userId;

    @Column(name = "PUZZLE_ID", nullable = false)
    private UUID puzzleId;

}
