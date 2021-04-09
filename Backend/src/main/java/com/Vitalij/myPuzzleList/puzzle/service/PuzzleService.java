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
        return  statuses.stream().map(this::mapToPuzzleStatuDto).collect(Collectors.toList());
    }

    public Page<CollectionPuzzleDto> getUserCollectionPuzzles(String username, Pageable pageable) {
        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        Page<UserPuzzle> userPuzzles = userPuzzleRepository.findByUserDetails(userDetails, pageable);
        return new PageImpl<>(userPuzzles.stream().map(this::mapToCollectionPuzzleDto).collect(Collectors.toList()),
                userPuzzles.getPageable(),
                userPuzzles.getTotalElements());
    }

    //TODO consult with Deivydas
    public ResponseEntity<Object> addPuzzleToUserCollection(CollectionPuzzleRequestBodyDto requestBody, UUID puzzleId){

        try {
           UserDetails userDetails = userRepository.findUserDetailsByUsername(requestBody.getUsername());
            /*if(isNull(userDetails)) {
                return new ResponseEntity<>("User with such username doesn't exist", HttpStatus.BAD_REQUEST);
            }*/

           Puzzle puzzle = puzzleRepository.findPuzzleById(puzzleId);
           Status status = statusRepository.findStatusByName(requestBody.getStatus());
           /*if(isNull(status)) {
               return new ResponseEntity<>("Puzzle status name doesn't exist", HttpStatus.BAD_REQUEST);
           }*/

           UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzleId);
           if (!isNull(userPuzzleRepository.findUserPuzzleById(userPuzzleId))){
               return new ResponseEntity<>("User collection already contains this puzzle", HttpStatus.CONFLICT);
           }

           UserPuzzle userPuzzleToAdd = mapToUserPuzzle(puzzle, userDetails, status, requestBody);
           userPuzzleRepository.save(userPuzzleToAdd);
       } catch (DataAccessException e) {
            System.out.println("Error response \n" + e.getMessage());
           return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
       }
        return new ResponseEntity<>("Puzzle was succesfully added", HttpStatus.CREATED);
    }

    public Boolean isPuzzlePresentInUserCollection(String username, UUID puzzleId) {

        UserDetails userDetails = userRepository.findUserDetailsByUsername(username);
        UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzleId);
        try {
           UserPuzzle userPuzzle = userPuzzleRepository.findUserPuzzleById(userPuzzleId);
            System.out.println("id: " + puzzleId + ' ' + "puzzleId: " + userPuzzle.getPuzzle().getId());
            return userPuzzle.getPuzzle().getId().equals(puzzleId);
        } catch (Exception e) {
          return false;
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

    private UserPuzzle mapToUserPuzzle (Puzzle puzzle, UserDetails userDetails, Status status, CollectionPuzzleRequestBodyDto requestBody) {
       Integer score;
        try {
            score = requestBody.getScore();
        } catch (NullPointerException nullPointerException) {
            score = null;
        }
        UserPuzzleKey userPuzzleId = new UserPuzzleKey(userDetails.getId(), puzzle.getId());

        return UserPuzzle.builder()
                .id(userPuzzleId)
                .puzzle(puzzle)
                .userDetails(userDetails)
                .status(status)
                .score(score)
                .solutionUnlocked(requestBody.getSolutionUnlocked())
                .build();
    }

    private PuzzleStatusDto mapToPuzzleStatuDto (Status status) {
         return PuzzleStatusDto.builder()
                 .status(status.getName())
                 .build();
    }
}
