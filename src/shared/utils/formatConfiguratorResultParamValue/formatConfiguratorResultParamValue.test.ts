import { formatConfiguratorResultParamValue } from "./formatConfiguratorResultParamValue";

describe("formatConfiguratorResultParamValue", () => {
    it("should format RPS parameter correctly", () => {
        expect(formatConfiguratorResultParamValue("RPS", 0.5)).toBe("50 %");
        expect(formatConfiguratorResultParamValue("RPS", 1)).toBe("100 %");
        expect(formatConfiguratorResultParamValue("RPS", 0.123)).toBe("12.3 %");
    });

    it("should format LCOE parameter correctly", () => {
        expect(formatConfiguratorResultParamValue("LCOE", 100)).toBe(
            "100 ₽ / киловатт-час"
        );
        expect(formatConfiguratorResultParamValue("LCOE", 3.14)).toBe(
            "3.14 ₽ / киловатт-час"
        );
    });

    it("should format CapEx parameter correctly", () => {
        expect(formatConfiguratorResultParamValue("CapEx", 1000000)).toBe(
            "1000000 ₽"
        );
        expect(formatConfiguratorResultParamValue("CapEx", 500)).toBe("500 ₽");
    });

    it("should format OpEx parameter correctly", () => {
        expect(formatConfiguratorResultParamValue("OpEx", 25000)).toBe(
            "25000 ₽ / год"
        );
        expect(formatConfiguratorResultParamValue("OpEx", 100.5)).toBe(
            "100.5 ₽ / год"
        );
    });

    it("should format Economy parameter correctly", () => {
        expect(formatConfiguratorResultParamValue("Economy", 150000)).toBe(
            "150000 ₽"
        );
        expect(formatConfiguratorResultParamValue("Economy", 750.25)).toBe(
            "750.25 ₽"
        );
    });

    it("should return empty string for unknown parameter", () => {
        expect(formatConfiguratorResultParamValue("Unknown", 123)).toBe("");
        expect(formatConfiguratorResultParamValue("", 456)).toBe("");
        expect(formatConfiguratorResultParamValue("Test", 789)).toBe("");
    });
});
