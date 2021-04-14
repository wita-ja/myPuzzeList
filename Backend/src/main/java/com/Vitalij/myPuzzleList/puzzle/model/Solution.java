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

    @Column(name = "UNLOCK_COST", nullable = false)
    private Integer unlockCost;

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

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "SOLUTION_STEPS",
            joinColumns = { @JoinColumn(name = "solution_id") },
            inverseJoinColumns = { @JoinColumn(name = "steps_id") }
    )
    private Set<Steps> solutionSteps;
}
