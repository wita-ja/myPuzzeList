package com.Vitalij.myPuzzleList.puzzle.model;

import lombok.*;
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
@Table(name = "PUZZLE")
public class Puzzle {

    @Id
    @GeneratedValue
    @Column(name = "ID", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "APPROVED", nullable = false)
    private Boolean approved;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TYPE_ID", nullable = false)
    private Type type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "DIFFICULTY_ID", nullable = false)
    private Difficulty difficulty;

    @OneToOne(mappedBy = "puzzle")
    private Solution solution;

    @OneToMany(mappedBy = "puzzle")
    Set<UserPuzzle> userPuzzles;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "PUZZLE_MATERIAL",
            joinColumns = { @JoinColumn(name = "puzzle_id") },
            inverseJoinColumns = { @JoinColumn(name = "material_id") }
    )
    private Set<Material> materials;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "PUZZLE_IMAGE",
            joinColumns = { @JoinColumn(name = "puzzle_id") },
            inverseJoinColumns = { @JoinColumn(name = "image_id") }
    )
    private Set<Image> puzzleImages;

    @Column(name = "TITLE", nullable = false, unique = true)
    private String title;

    @Column(name = "DESCRIPTION", nullable = false, length = 1000)
    private String description;

    @Column(name = "BRAND")
    private String brand;

}
