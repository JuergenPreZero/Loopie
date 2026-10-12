package de.loopie.repository;

import de.loopie.entity.Transaction;
import de.loopie.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Database interface for accessing the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}