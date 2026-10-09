package de.loopie.service;

import de.loopie.repository.TransactionRepository;
import org.springframework.stereotype.Service;

@Service
public class LoopieService {
    private final TransactionRepository transactionRepository;

    public LoopieService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public int getTotalQuantity(int userId) {
        Integer total = transactionRepository.sumAmountByUserId(userId);
        return total != null ? total : 0;
    }
}