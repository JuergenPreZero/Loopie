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
import java.util.UUID;

/**
 * Main Service for Loopie, handles transactional logic.
 */
@Service
public class LoopieService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    private static final Map<String, Integer> unitPrices = Map.of(
            "Tennis Ball",20,
            "Laufschuhe",50,
            "T-Shirt",35
    );

    public LoopieService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    /**
     * Gets the total amount of all the units summed by userid.
     * @param userId An ID meant to identify USER.
     * @param userId An ID meant to identify USER.
     * @return returns USER total amount of items.
     */
    public int getTotalQuantity(UUID userId) {
        Integer total = transactionRepository.sumAmountByUserId(userId);
        return total != null ? total : 0;
    }

    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User "+ userId + " not found"));
    }

    public void deleteUserById(UUID userId) {
        userRepository.deleteById(userId);
    }

    /**
     * Checks for existing User and valid UnitID. Calculates the total value.
     * saves values persistently.
     * @param request Data object send by iot
     * @return the transactional entity {@link Transaction}.
     */
    @Transactional
    public Transaction processThrowIn(ThrowInRequest request) {
        User user = userRepository.findByPublicId(request.getPublicId())
                .orElseThrow(() -> new IllegalArgumentException("User with Public ID " + request.getPublicId() + " not found"));

        if (request.getUnitId() == null || !unitPrices.containsKey(request.getUnitId())) {
            throw new IllegalArgumentException("Unit ID "+ request.getUnitId() + " does not exist");
        }

        //Calculate total value of item(s)
        int unitPrice = unitPrices.getOrDefault(request.getUnitId(), 0);
        int totalValue = unitPrice * (request.getAmount());

        //adds amount of transaction to total balance
        int currentBalance = user.getBalance();
        user.setBalance(currentBalance + totalValue);
        userRepository.save(user);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(request.getAmount());
        transaction.setValue(totalValue);
        transaction.setUnitId(request.getUnitId());

        return transactionRepository.save(transaction);
    }
}