package com.Vitalij.myPuzzleList.puzzle.repository;

import com.Vitalij.myPuzzleList.puzzle.model.puzzle.Puzzle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PuzzleRepository extends JpaRepository<Puzzle, UUID> {

    List<Puzzle> findByApproved(boolean approved);

}
