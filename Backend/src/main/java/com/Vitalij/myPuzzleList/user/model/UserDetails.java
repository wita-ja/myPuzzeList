package com.Vitalij.myPuzzleList.user.model;

import com.Vitalij.myPuzzleList.puzzle.model.UserPuzzle;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString(exclude = "password")
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USER_DETAILS")
public class UserDetails {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

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

    @Column(name = "USERNAME", nullable = false, unique = true)
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

    @Column(name = "AGE_GROUP", nullable = false)
    private String age_group;

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public PasswordEncoder getEncoder() {
       return PASSWORD_ENCODER;
    }
}
