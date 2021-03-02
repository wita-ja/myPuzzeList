package com.Vitalij.myPuzzleList.puzzle.model.puzzle;

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
@Table(name = "MATERIAL")
public class Material {

    @Id
    @GeneratedValue
    @Column(name = "ID", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "materials")
    private Set<Puzzle> puzzles;
}
