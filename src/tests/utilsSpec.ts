import { generateJWT } from "../utils/auth";

describe("Utils functions tests", () => {
    describe("Test generateJWT function", () => {
        it("generateJWT fn is defined", () => {
            expect(generateJWT).toBeDefined();
        });

        it("generateJWT returns null", async () => {
            const result = await generateJWT(2, "password");
            expect(result).toBe(null);
        });
    });
});
