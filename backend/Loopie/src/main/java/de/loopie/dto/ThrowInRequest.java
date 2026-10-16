package de.loopie.dto;

/**
 *Data transfer object for the incoming throw in requests of the IoT.
 */
public class ThrowInRequest {
    private String publicId;
    private int amount;
    private String unitId;

    public ThrowInRequest() {}

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public String getUnitId() { return unitId; }
    public void setUnitId(String unitId) { this.unitId = unitId; }
}