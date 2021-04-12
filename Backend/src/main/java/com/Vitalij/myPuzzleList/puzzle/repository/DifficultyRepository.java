package com.Vitalij.myPuzzleList.puzzle.repository;

import com.Vitalij.myPuzzleList.puzzle.model.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DifficultyRepository extends JpaRepository<Difficulty, UUID> {
}
