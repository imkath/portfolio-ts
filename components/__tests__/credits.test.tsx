import { describe, expect, it } from "@jest/globals";
import { ROLE_ORDER, roleLabels } from "../credits";
import type { CreditRole } from "@/src/types";

describe("Credits Component", () => {
  it("should have fixed role order matching spec", () => {
    const expectedOrder: CreditRole[] = [
      "photography",
      "hair",
      "styling",
      "art",
      "model",
      "production",
      "director",
      "dop",
      "brand",
      "publication",
    ];

    expect(ROLE_ORDER).toEqual(expectedOrder);
  });

  it("should have Spanish labels for all roles", () => {
    expect(roleLabels.photography).toBe("Fotografía");
    expect(roleLabels.hair).toBe("Cabello");
    expect(roleLabels.styling).toBe("Styling");
    expect(roleLabels.art).toBe("Dirección de Arte");
    expect(roleLabels.model).toBe("Modelo");
    expect(roleLabels.production).toBe("Producción");
    expect(roleLabels.director).toBe("Director");
    expect(roleLabels.dop).toBe("Director de Fotografía");
    expect(roleLabels.brand).toBe("Marca");
    expect(roleLabels.publication).toBe("Publicación");
  });

  it("should cover all roles in ROLE_ORDER with labels", () => {
    ROLE_ORDER.forEach((role) => {
      expect(roleLabels[role]).toBeDefined();
      expect(typeof roleLabels[role]).toBe("string");
    });
  });

  it("should have all role labels defined in ROLE_ORDER", () => {
    const labelKeys = Object.keys(roleLabels) as CreditRole[];
    labelKeys.forEach((key) => {
      expect(ROLE_ORDER).toContain(key);
    });
  });
});
