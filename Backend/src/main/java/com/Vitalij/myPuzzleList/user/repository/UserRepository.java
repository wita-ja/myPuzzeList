package com.Vitalij.myPuzzleList.user.repository;

import com.Vitalij.myPuzzleList.user.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserDetails, UUID> {

    UserDetails findUserDetailsByUsername(String username);

}
