package de.loopie.dto;

import java.math.BigDecimal;

public class ThrowInRequest {
    private int userId;
    private int amount;
    private BigDecimal value;
    private String deviceId;

    public ThrowInRequest() {}

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public BigDecimal getValue() { return value; }
    public void setValue(BigDecimal value) { this.value = value; }

    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }
}