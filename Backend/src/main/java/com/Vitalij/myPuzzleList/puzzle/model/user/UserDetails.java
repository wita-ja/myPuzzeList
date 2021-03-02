package com.Vitalij.myPuzzleList.puzzle.model.user;

import com.Vitalij.myPuzzleList.puzzle.model.puzzle.UserPuzzle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USER_DETAILS")
public class UserDetails {

    @Id
    @GeneratedValue
    @Column(name = "ID", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", nullable = false)
    private Role role;

    //Many to many + additional columns with puzzle
    @OneToMany(mappedBy = "userDetails")
    Set<UserPuzzle> userPuzzles;

    @Column(name = "NAME", nullable = false)
    private String username;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "DATE_CREATED", nullable = false)
    private Timestamp date_created;

    @Column(name = "ACTIVITY_POINTS", nullable = false)
    private Integer activityPoints;

    @Column(name = "BIRTH_DATE", nullable = false)
    private Date birthDate;
}
