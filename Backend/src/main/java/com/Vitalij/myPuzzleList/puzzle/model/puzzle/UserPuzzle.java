package com.Vitalij.myPuzzleList.puzzle.model.puzzle;

import com.Vitalij.myPuzzleList.puzzle.model.user.UserDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USER_PUZZLE")
public class UserPuzzle {
    @EmbeddedId
    private UserPuzzleKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "USER_ID")
    private UserDetails userDetails;

    @ManyToOne
    @MapsId("puzzleId")
    @JoinColumn(name = "PUZZLE_ID")
    private Puzzle puzzle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATUS_ID", nullable = false)
    private Status status;

    @Column(name = "SCORE" )
    private Integer score;

}
