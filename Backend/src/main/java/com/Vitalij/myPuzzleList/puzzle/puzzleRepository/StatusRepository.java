package com.Vitalij.myPuzzleList.puzzle.puzzleRepository;

import com.Vitalij.myPuzzleList.puzzle.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StatusRepository extends JpaRepository<Status, UUID> {
    Status findStatusByName(String name);
}
