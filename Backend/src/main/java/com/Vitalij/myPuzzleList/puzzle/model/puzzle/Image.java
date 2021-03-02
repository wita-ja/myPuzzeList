package com.Vitalij.myPuzzleList.puzzle.model.puzzle;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "IMAGE")
public class Image {

    @Id
    @GeneratedValue
    @Column(name = "ID", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "PATH", nullable = false)
    private String path;

    //to solve
    @ManyToMany(mappedBy = "puzzleImages")
    private Set<Puzzle> puzzles;

    @ManyToMany(mappedBy = "solutionImages")
    private Set<Solution> solutions;
}
