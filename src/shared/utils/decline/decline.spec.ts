// @vitest-environment jsdom
import { declineWord } from "shared/utils/decline/decline.ts";
import { describe, expect, it } from "vitest";

describe("declineWord", () => {
    // Тест для случаев с числом 1
    it("should return correct form for 1", () => {
        const words = ["яблоко", "яблока", "яблок"];

        expect(declineWord(1, words)).toBe("яблоко");
        expect(declineWord(21, words)).toBe("яблоко");
        expect(declineWord(31, words)).toBe("яблоко");
        expect(declineWord(101, words)).toBe("яблоко");
    });

    // Тест для случаев с числами 2-4
    it("should return correct form for 2-4", () => {
        const words = ["яблоко", "яблока", "яблок"];

        expect(declineWord(2, words)).toBe("яблока");
        expect(declineWord(3, words)).toBe("яблока");
        expect(declineWord(4, words)).toBe("яблока");
        expect(declineWord(22, words)).toBe("яблока");
        expect(declineWord(33, words)).toBe("яблока");
        expect(declineWord(104, words)).toBe("яблока");
    });

    // Тест для случаев с числами 5-20 и других
    it("should return correct form for 5-20 and others", () => {
        const words = ["яблоко", "яблока", "яблок"];

        expect(declineWord(5, words)).toBe("яблок");
        expect(declineWord(11, words)).toBe("яблок");
        expect(declineWord(15, words)).toBe("яблок");
        expect(declineWord(20, words)).toBe("яблок");
        expect(declineWord(25, words)).toBe("яблок");
        expect(declineWord(100, words)).toBe("яблок");
    });

    // Тест для граничных случаев
    it("should handle edge cases correctly", () => {
        const words = ["год", "года", "лет"];

        expect(declineWord(0, words)).toBe("лет");
        expect(declineWord(11, words)).toBe("лет");
        expect(declineWord(12, words)).toBe("лет");
        expect(declineWord(13, words)).toBe("лет");
        expect(declineWord(14, words)).toBe("лет");
    });

    // Тест для отрицательных чисел
    it("should handle negative numbers correctly", () => {
        const words = ["день", "дня", "дней"];

        expect(declineWord(-1, words)).toBe("день");
        expect(declineWord(-2, words)).toBe("дня");
        expect(declineWord(-5, words)).toBe("дней");
        expect(declineWord(-11, words)).toBe("дней");
    });

    // Тест с разными наборами слов
    it("should work with different word sets", () => {
        const words1 = ["пользователь", "пользователя", "пользователей"];
        const words2 = ["сообщение", "сообщения", "сообщений"];

        expect(declineWord(1, words1)).toBe("пользователь");
        expect(declineWord(2, words1)).toBe("пользователя");
        expect(declineWord(5, words1)).toBe("пользователей");

        expect(declineWord(1, words2)).toBe("сообщение");
        expect(declineWord(3, words2)).toBe("сообщения");
        expect(declineWord(7, words2)).toBe("сообщений");
    });

    // Тест для больших чисел
    it("should handle large numbers correctly", () => {
        const words = ["тест", "теста", "тестов"];

        expect(declineWord(100, words)).toBe("тестов");
        expect(declineWord(1000, words)).toBe("тестов");
        expect(declineWord(1001, words)).toBe("тест");
        expect(declineWord(1002, words)).toBe("теста");
    });

    // Тест для чисел, кратных 100
    it("should handle numbers divisible by 100", () => {
        const words = ["пример", "примера", "примеров"];

        expect(declineWord(100, words)).toBe("примеров");
        expect(declineWord(200, words)).toBe("примеров");
        expect(declineWord(300, words)).toBe("примеров");
    });
});
