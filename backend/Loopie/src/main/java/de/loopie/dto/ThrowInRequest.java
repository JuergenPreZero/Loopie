package de.loopie.dto;

/**
 *Data transfer object for the incoming throw in requests of the IoT.
 */
public class ThrowInRequest {
    private int userId;
    private int amount;
    private String unitId;

    public ThrowInRequest() {}

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public String getUnitId() { return unitId; }
    public void setUnitId(String unitId) { this.unitId = unitId; }
}