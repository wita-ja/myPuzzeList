package com.Vitalij.myPuzzleList.puzzle.repository;

import com.Vitalij.myPuzzleList.puzzle.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {

    Image findTopByTemp(Boolean temp);
}
