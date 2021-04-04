package com.Vitalij.myPuzzleList.puzzle.model;

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
@Table(name = "TYPE")
public class Type {

    @Id
    @GeneratedValue
    @Column(name = "ID", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @OneToMany(mappedBy = "type", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Puzzle> puzzles;
}
