package de.loopie.service;

import de.loopie.dto.ThrowInRequest;
import de.loopie.entity.Transaction;
import de.loopie.entity.User;
import de.loopie.repository.TransactionRepository;
import de.loopie.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoopieService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public LoopieService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public int getTotalQuantity(int userId) {
        Integer total = transactionRepository.sumAmountByUserId(userId);
        return total != null ? total : 0;
    }

    @Transactional
    public Transaction processThrowIn(ThrowInRequest data) {
        User user = userRepository.findById(data.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User nicht gefunden mit ID: " + data.getUserId()));

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(data.getAmount());
        transaction.setValue(data.getValue());
        transaction.setDeviceId(data.getDeviceId());

        return transactionRepository.save(transaction);
    }
}