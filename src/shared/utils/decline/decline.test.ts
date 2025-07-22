import { declineWord } from "./decline";

describe("declineWord", () => {
    const testCases = [
        // [число, массив форм, ожидаемый результат]
        [1, ["день", "дня", "дней"], "день"],
        [2, ["день", "дня", "дней"], "дня"],
        [5, ["день", "дня", "дней"], "дней"],
        [11, ["день", "дня", "дней"], "дней"],
        [12, ["день", "дня", "дней"], "дней"],
        [21, ["день", "дня", "дней"], "день"],
        [22, ["день", "дня", "дней"], "дня"],
        [25, ["день", "дня", "дней"], "дней"],
        [101, ["день", "дня", "дней"], "день"],
        [102, ["день", "дня", "дней"], "дня"],
        [105, ["день", "дня", "дней"], "дней"],
    ];

    test.each(testCases)(
        'for %d with forms %j should return "%s"',
        (value, words, expected) => {
            expect(declineWord(value, words)).toBe(expected);
        }
    );

    it("should handle negative numbers correctly", () => {
        expect(declineWord(-1, ["день", "дня", "дней"])).toBe("день");
        expect(declineWord(-2, ["день", "дня", "дней"])).toBe("дня");
        expect(declineWord(-5, ["день", "дня", "дней"])).toBe("дней");
    });

    it("should use modulo 100 for large numbers", () => {
        expect(declineWord(101, ["день", "дня", "дней"])).toBe("день");
        expect(declineWord(201, ["день", "дня", "дней"])).toBe("день");
        expect(declineWord(111, ["день", "дня", "дней"])).toBe("дней");
    });

    it("should return third form for numbers ending with 0", () => {
        expect(declineWord(0, ["день", "дня", "дней"])).toBe("дней");
        expect(declineWord(10, ["день", "дня", "дней"])).toBe("дней");
        expect(declineWord(20, ["день", "дня", "дней"])).toBe("дней");
    });

    it("should work with different word forms", () => {
        expect(declineWord(1, ["яблоко", "яблока", "яблок"])).toBe("яблоко");
        expect(declineWord(3, ["яблоко", "яблока", "яблок"])).toBe("яблока");
        expect(declineWord(5, ["яблоко", "яблока", "яблок"])).toBe("яблок");
    });
});
