package com.Vitalij.myPuzzleList.puzzle.repository;

import com.Vitalij.myPuzzleList.puzzle.model.Puzzle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PuzzleRepository extends JpaRepository<Puzzle, UUID> {

    Page<Puzzle> findByApproved(boolean approved, Pageable pageable);
    Puzzle findPuzzleById(UUID id);
    Optional<Puzzle> findPuzzleByTitle(String title);
}
