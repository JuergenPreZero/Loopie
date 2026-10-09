package de.loopie.repository;

import de.loopie.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = :userId")
    Integer sumAmountByUserId(@Param("userId") int userId);
}