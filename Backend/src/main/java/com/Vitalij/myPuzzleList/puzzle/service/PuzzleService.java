package com.Vitalij.myPuzzleList.puzzle.service;

import com.Vitalij.myPuzzleList.puzzle.dto.*;
import com.Vitalij.myPuzzleList.puzzle.model.*;
import com.Vitalij.myPuzzleList.puzzle.repository.PuzzleRepository;
import com.Vitalij.myPuzzleList.puzzle.repository.StatusRepository;
import com.Vitalij.myPuzzleList.puzzle.repository.UserPuzzleRepository;
import com.Vitalij.myPuzzleList.user.model.UserDetails;
import com.Vitalij.myPuzzleList.user.repository.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import static java.util.Objects.isNull;

@Service
public class PuzzleService {
    private final PuzzleRepository puzzleRepository;
    private final UserPuzzleRepository userPuzzleRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;

    /**
     * constructor injection pvz
     */
    public PuzzleService(PuzzleRepository puzzleRepository, UserPuzzleRepository userPuzzleRepository,
                         UserRepository userRepository, StatusRepository statusRepository) {
        this.puzzleRepository = puzzleRepository;
        this.userPuzzleRepository = userPuzzleRepository;
        this.userRepository = userRepository;
        this.statusRepository = statusRepository;
    }

    public Puzzle getPuzzleById (UUID puzzleId) {
        return  puzzleRepository.findPuzzleById(puzzleId);
    }

    public Page<PuzzleSummaryDto> getPuzzleSummaries(Pageable pageable) {
        Page<Puzzle> puzzles = puzzleRepository.findByApproved(true, pageable);
        return new PageImpl<>(
                puzzles.stream().map(this::mapToPuzzleSummaryDto).collect(Collectors.toList()),
                puzzles.getPageable(),
                puzzles.getTotalElements()
        );
    }

    public PuzzleDescriptionDto getPuzzleDescription(UUID id) {
        Puzzle puzzle = puzzleRepository.findPuzzleById(id);
        System.out.println(puzzle.getId());
        return mapToPuzzleDescriptionDto(puzzle);
    }

    public List<PuzzleStatusDto> getPuzzleStatuses() {
        List<Status> statuses = statusRepository.findAll(Sort.unsorted());
        return  statuses.stream().map(this::mapToPuzzleStatusDto).collect(Collectors.toList());
    }

    public Page<CollectionPuzzleDto> getUserCollectionPuzzles(String username, Pageable pageable) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        Page<UserPuzzle> userPuzzles = userPuzzleRepository.findByUserDetails(userDetails, pageable);
        return new PageImpl<>(userPuzzles.stream().map(this::mapToCollectionPuzzleDto).collect(Collectors.toList()),
                userPuzzles.getPageable(),
                userPuzzles.getTotalElements());
    }

    public ResponseEntity<Object> addUserPuzzleCollection(CollectionPuzzleRequestBodyDto requestBody, UUID puzzleId){
        try {
            UserDetails userDetails = userRepository.findUserDetailsByUsername(requestBody.getUsername());
            Puzzle puzzle = puzzleRepository.findPuzzleById(puzzleId);
            Status status = statusRepository.findStatusByName(requestBody.getStatus());

            UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzleId);
            UserPuzzle validationUserPuzzle = userPuzzleRepository.findUserPuzzleById(userPuzzleId);
            if (!isNull(validationUserPuzzle) && !validationUserPuzzle.getDeleted()){
                return new ResponseEntity<>("User collection already contains this puzzle", HttpStatus.CONFLICT);
            } else {
                UserPuzzle userPuzzleToAdd = mapToUserPuzzle(puzzle, userDetails, status, requestBody, false);
                userPuzzleRepository.save(userPuzzleToAdd);
                return new ResponseEntity<>("Puzzle was succesfully added", HttpStatus.CREATED);
            }

        } catch (DataAccessException e) {
            System.out.println("Error response \n" + e.getMessage());
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateUserPuzzleDetails(CollectionPuzzleRequestBodyDto requestBody, UUID puzzleId){
        try {
            UserDetails userDetails = userRepository.findUserDetailsByUsername(requestBody.getUsername());
            Puzzle puzzle = puzzleRepository.findPuzzleById(puzzleId);
            Status status = statusRepository.findStatusByName(requestBody.getStatus());

            UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzleId);
            Boolean deleted = userPuzzleRepository.findUserPuzzleById(userPuzzleId).getDeleted();

            UserPuzzle userPuzzleToUpdate = mapToUserPuzzle(puzzle, userDetails, status, requestBody, deleted);
            userPuzzleRepository.save(userPuzzleToUpdate);
            return new ResponseEntity<>("Puzzle was succesfully updated", HttpStatus.OK);

        } catch (DataAccessException e) {
            System.out.println("Error response \n" + e.getMessage());
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Boolean isPuzzlePresentInUserCollection(String username, UUID puzzleId) {

        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzleId);
        try {
            UserPuzzle userPuzzle = userPuzzleRepository.findUserPuzzleById(userPuzzleId);
            System.out.println("id: " + puzzleId + ' ' + "puzzleId: " + userPuzzle.getPuzzle().getId());
            return userPuzzle.getPuzzle().getId().equals(puzzleId) && !userPuzzle.getDeleted();
        } catch (Exception e) {
            return false;
        }
    }

    public CollectionPuzzleRequestBodyDto getUserPuzzleDetails(String username, UUID puzzleId) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);

        UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzleId);
        UserPuzzle userPuzzle = userPuzzleRepository.findUserPuzzleById(userPuzzleId);
        return mapToCollectionPuzzleRequestBodydto(userPuzzle, username);
    }

    public ResponseEntity<Object> deleteUserPuzzle(String username, UUID puzzleId) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzleId);

        try {
            UserPuzzle userPuzzle = userPuzzleRepository.findUserPuzzleById(userPuzzleId);
            userPuzzle.setDeleted(true);
            userPuzzleRepository.save(userPuzzle);
            return new ResponseEntity<>("Puzzle was succesfully deleted", HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error response \n" + Arrays.toString(e.getStackTrace()));
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private PuzzleSummaryDto mapToPuzzleSummaryDto (Puzzle puzzle) {
        return PuzzleSummaryDto.builder()
                .id(puzzle.getId())
                .title(puzzle.getTitle())
                .difficulty(puzzle.getDifficulty().getDisplayName())
                .description(puzzle.getDescription())
                .imagePath(puzzle.getPuzzleImages().stream().map(Image::getPath).collect(Collectors.toList()))
                .averageScore(9.99) //TODO average score pakeisti i neharcodinta
                .build();
    }

    private PuzzleDescriptionDto mapToPuzzleDescriptionDto (Puzzle puzzle) {
        UUID puzzleSolutionId;
        // handlinu null'a jeigu puzzle neturi solutiono (expected result)
        try {
            puzzleSolutionId = puzzle.getSolution().getId();
        } catch (NullPointerException nullPointerException) {
            puzzleSolutionId = null;
        }

        return  PuzzleDescriptionDto.builder()
                .id(puzzle.getId())
                .title(puzzle.getTitle())
                .description(puzzle.getDescription())
                .difficulty("Level " + puzzle.getDifficulty().getLevel() + " - " + puzzle.getDifficulty().getDisplayName())
                .solutionId(puzzleSolutionId)
                .type(puzzle.getType().getName())
                .brand(puzzle.getBrand())
                .material(puzzle.getMaterials().stream().map(Material::getName).collect(Collectors.toList()))
                .imagePath(puzzle.getPuzzleImages().stream().map(Image::getPath).collect(Collectors.toList()))
                .averageScore(9.99) //TODO average score pakeisti i neharcodinta
                .build();
    }

    private CollectionPuzzleDto mapToCollectionPuzzleDto (UserPuzzle userPuzzle) {
        return CollectionPuzzleDto.builder()
                .id(userPuzzle.getPuzzle().getId())
                .title(userPuzzle.getPuzzle().getTitle())
                .description(userPuzzle.getPuzzle().getDescription())
                .status(userPuzzle.getStatus().getName())
                .userScore(userPuzzle.getScore())
                .build();
    }

    private CollectionPuzzleRequestBodyDto mapToCollectionPuzzleRequestBodydto (UserPuzzle userPuzzle, String username) {
        return CollectionPuzzleRequestBodyDto.builder()
                .username(username)
                .status(userPuzzle.getStatus().getName())
                .score(userPuzzle.getScore())
                .solutionUnlocked(userPuzzle.getSolutionUnlocked())
                .build();
    }

    private UserPuzzle mapToUserPuzzle (Puzzle puzzle, UserDetails userDetails, Status status, CollectionPuzzleRequestBodyDto requestBody, Boolean deleted) {
        UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzle.getId());

        Integer score;
        if(requestBody.getScore() == null) {
            try {
                score = userPuzzleRepository.findUserPuzzleById(userPuzzleId).getScore();
            } catch (DataAccessException e) {
                System.out.println(Arrays.toString(e.getStackTrace()));
                score = null;
            }
        } else {
            try {
                score = requestBody.getScore();
            } catch (NullPointerException e) {
                score = null;
            }
        }

        Boolean solutionUnlocked;
        if(requestBody.getSolutionUnlocked() == null) {
            try {
                solutionUnlocked = userPuzzleRepository.findUserPuzzleById(userPuzzleId).getSolutionUnlocked();
            } catch (DataAccessException e) {
                System.out.println(Arrays.toString(e.getStackTrace()));
                solutionUnlocked = false;
            }

        } else solutionUnlocked = requestBody.getSolutionUnlocked();

        Status finalStatus;
        if(isNull(status) ) {
            try {
                finalStatus = userPuzzleRepository.findUserPuzzleById(userPuzzleId).getStatus();
            } catch (DataAccessException e) {
                System.out.println(Arrays.toString(e.getStackTrace()));
                finalStatus = null;
            }

        } else finalStatus = status;

        return UserPuzzle.builder()
                .id(userPuzzleId)
                .puzzle(puzzle)
                .userDetails(userDetails)
                .status(finalStatus)
                .score(score)
                .solutionUnlocked(solutionUnlocked)
                .deleted(deleted)
                .build();
    }

    private PuzzleStatusDto mapToPuzzleStatusDto(Status status) {
        return PuzzleStatusDto.builder()
                .status(status.getName())
                .build();
    }
}
