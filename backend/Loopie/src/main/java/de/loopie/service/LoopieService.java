package de.loopie.service;

import de.loopie.dto.ThrowInRequest;
import de.loopie.entity.Transaction;
import de.loopie.entity.User;
import de.loopie.repository.TransactionRepository;
import de.loopie.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class LoopieService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    private static final Map<String, BigDecimal> unitPrices = Map.of(
            "TennisBall", new BigDecimal("0.20"),
            "Example", new BigDecimal("0.20")
    );

    public LoopieService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public int getTotalQuantity(int userId) {
        Integer total = transactionRepository.sumAmountByUserId(userId);
        return total != null ? total : 0;
    }

    @Transactional
    public Transaction processThrowIn(ThrowInRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User nicht gefunden mit ID: " + request.getUserId()));

        BigDecimal unitPrice = unitPrices.getOrDefault(request.getUnitId(), BigDecimal.ZERO);
        BigDecimal totalValue = unitPrice.multiply(new BigDecimal(request.getAmount()));

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(request.getAmount());
        transaction.setValue(totalValue);

        transaction.setUnitId(request.getUnitId() != null ? request.getUnitId() : "UNKNOWN_UNIT");

        return transactionRepository.save(transaction);
    }
}