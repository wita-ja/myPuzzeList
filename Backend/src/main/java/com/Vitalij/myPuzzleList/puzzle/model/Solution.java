package com.Vitalij.myPuzzleList.puzzle.model;
import java.util.Set;
import java.util.UUID;

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
@Table(name = "SOLUTION")
public class Solution {

    @Id
    @GeneratedValue
    @Column(name = "ID", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "PUZZLE_ID", referencedColumnName = "id", nullable = false)
    private Puzzle puzzle;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "SOLUTION_IMAGE",
            joinColumns = { @JoinColumn(name = "solution_id") },
            inverseJoinColumns = { @JoinColumn(name = "image_id") }
    )
    private Set<Image> solutionImages;
}
