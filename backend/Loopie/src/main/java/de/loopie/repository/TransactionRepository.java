package de.loopie.repository;

import de.loopie.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

/**
 * Database interface for accessing the {@link Transaction} entity.
 */
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = :userId")
    Integer sumAmountByUserId(@Param("userId")UUID userId);
    @Query("SELECT SUM(t.value) FROM Transaction t WHERE t.user.id = :userId")
    Long sumBalanceByUserId(@Param("userId") UUID userId);
    List<Transaction> findByUser_IdOrderByTimeStampDesc(UUID userId);
}