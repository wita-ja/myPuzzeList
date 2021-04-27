package com.Vitalij.myPuzzleList.puzzle.puzzleRepository;

import com.Vitalij.myPuzzleList.puzzle.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MaterialRepository extends JpaRepository<Material, UUID> {

    Material findByName(String name);
}
