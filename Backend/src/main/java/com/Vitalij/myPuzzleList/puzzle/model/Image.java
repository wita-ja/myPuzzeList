package com.Vitalij.myPuzzleList.puzzle.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
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

    @Column(name = "TEMP", nullable = false)
    private Boolean temp;

    @Column(name = "IMAGE_TYPE", nullable = false)
    private String imageType;

    @ManyToMany(mappedBy = "puzzleImages")
    private Set<Puzzle> puzzles;

    @ManyToMany(mappedBy = "solutionImages")
    private Set<Solution> solutions;
}
