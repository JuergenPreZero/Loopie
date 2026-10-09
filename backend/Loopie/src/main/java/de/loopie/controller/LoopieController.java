package de.loopie.controller;

import de.loopie.dto.ThrowInRequest;
import de.loopie.entity.Transaction;
import de.loopie.service.LoopieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loopie")
@CrossOrigin(origins = "*")
public class LoopieController {

    private final LoopieService loopieService;

    public LoopieController(LoopieService loopieService) {
        this.loopieService = loopieService;
    }

    @GetMapping("/quantity/{userId}")
    public ResponseEntity<Integer> getQuantity(@PathVariable int userId) {
        return ResponseEntity.ok(loopieService.getTotalQuantity(userId));
    }

    @PostMapping("/throw-in")
    public ResponseEntity<Transaction> registerThrowIn(@RequestBody ThrowInRequest request) {
        Transaction savedTransaction = loopieService.processThrowIn(request);
        return ResponseEntity.ok(savedTransaction);
    }
}