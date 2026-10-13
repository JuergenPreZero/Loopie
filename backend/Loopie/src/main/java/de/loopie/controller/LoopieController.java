package de.loopie.controller;

import de.loopie.dto.ThrowInRequest;
import de.loopie.entity.Transaction;
import de.loopie.entity.User;
import de.loopie.service.LoopieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * REST-Controller for the main functions of the application.
 */
@RestController
@RequestMapping("/api/loopie")
@CrossOrigin(origins = "*")
public class LoopieController {

    private final LoopieService loopieService;

    public LoopieController(LoopieService loopieService) {
        this.loopieService = loopieService;
    }

    /**
     * Endpoint for calling USERS current amount of items.
     * @param userId An ID meant to identify USER.
     * @return HTTP 200 OK with the amount.
     */
    @GetMapping("/quantity/{userId}")
    public ResponseEntity<Integer> getQuantity(@PathVariable UUID userId) {
        return ResponseEntity.ok(loopieService.getTotalQuantity(userId));
    }

    @GetMapping("/balance/{userId}")
    public ResponseEntity<BigDecimal> getBalance(@PathVariable UUID userId) {
        User user =loopieService.getUserById(userId);
        return ResponseEntity.ok(user.getBalance());
    }

    /**
     * Endpoint for registering when a throwIn of any kind has happened.
     * @param request Data object send by iot
     * @return HTTP 200 OK with the save data {@link Transaction}
     */
    @PostMapping("/throw-in")
    public ResponseEntity<Transaction> registerThrowIn(@RequestBody ThrowInRequest request) {
        Transaction savedTransaction = loopieService.processThrowIn(request);
        return ResponseEntity.ok(savedTransaction);
    }
}