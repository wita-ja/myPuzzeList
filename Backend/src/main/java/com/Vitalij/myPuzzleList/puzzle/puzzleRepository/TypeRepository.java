package com.Vitalij.myPuzzleList.puzzle.puzzleRepository;

import com.Vitalij.myPuzzleList.puzzle.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TypeRepository extends JpaRepository<Type, UUID> {

    Type findByName(String name);
}
