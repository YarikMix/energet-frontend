/** @type {import("jest").Config} **/
export default {
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)s$": [
            "ts-jest",
            { diagnostics: { ignoreCodes: ["TS151001"] } },
        ],
    },
};
