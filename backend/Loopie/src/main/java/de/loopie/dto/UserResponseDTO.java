package de.loopie.dto;

import de.loopie.entity.User;
import java.math.BigDecimal;
import java.util.UUID;

public class UserResponseDTO {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private BigDecimal balance;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.balance = user.getBalance();
    }

    public UUID getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public BigDecimal getBalance() { return balance; }
}