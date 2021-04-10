package com.Vitalij.myPuzzleList.puzzle.repository;

import com.Vitalij.myPuzzleList.puzzle.model.UserPuzzle;
import com.Vitalij.myPuzzleList.puzzle.model.UserPuzzleKey;
import com.Vitalij.myPuzzleList.user.model.UserDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPuzzleRepository extends JpaRepository<UserPuzzle, UserPuzzleKey> {
    Page<UserPuzzle> findByUserDetailsAndDeleted(UserDetails userDetails, Boolean deleted, Pageable pageable);

    UserPuzzle findUserPuzzleById(UserPuzzleKey id);
}


