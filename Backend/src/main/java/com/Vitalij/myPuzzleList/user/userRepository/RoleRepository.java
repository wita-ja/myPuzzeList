package com.Vitalij.myPuzzleList.user.userRepository;

import com.Vitalij.myPuzzleList.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Role findRoleByName(String name);
}
