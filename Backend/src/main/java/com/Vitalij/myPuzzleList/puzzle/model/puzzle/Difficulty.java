package com.Vitalij.myPuzzleList.puzzle.model.puzzle;

import java.util.Set;
import  java.util.UUID;

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
@Table(name = "DIFFICULTY")
public class Difficulty {

    @Id
    @GeneratedValue
    @Column(name = "ID", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "LEVEL", nullable = false)
    private Integer level;

    @Column(name = "DISPLAY_NAME", nullable = false)
    private String displayName;

    @OneToMany(mappedBy = "difficulty", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Puzzle> puzzles;
}