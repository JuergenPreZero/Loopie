package de.loopie.dto;

import java.util.UUID;

/**
 *Data transfer object for the incoming throw in requests of the IoT.
 */
public class ThrowInRequest {
    private UUID userId;
    private int amount;
    private String unitId;

    public ThrowInRequest() {}

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public String getUnitId() { return unitId; }
    public void setUnitId(String unitId) { this.unitId = unitId; }
}