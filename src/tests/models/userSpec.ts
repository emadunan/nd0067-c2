import { User, UserStore } from "../../models/user";

describe("User model tests", () => {
    const store = new UserStore();

    describe("Index function", () => {
        it("Index function exists", () => {
            expect(store.index).toBeDefined();
        });

        it("Index function returns []", async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });

    describe("Create function", () => {
        it("Create function exists", () => {
            expect(store.create).toBeDefined();
        });

        it("Create function creates new a user and returns it", async () => {
            const user: User = {
                firstname: "emad",
                lastname: "younan",
                password: "password",
            };

            const result = await store.create(user);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "younan",
                password: "password",
            });
        });
    });

    describe("Show function", () => {
        it("Show function exists", () => {
            expect(store.show).toBeDefined();
        });

        it("Show function returns user", async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "younan",
                password: "password",
            });
        });
    });

    describe("Update function", () => {
        it("Update function exists", () => {
            expect(store.update).toBeDefined();
        });

        it("Update function modify returns user", async () => {
            const result = await store.update(1, {
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });

            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });
        });

        it("Update function ignore flasy values and returns user", async () => {
            const result = await store.update(1, {
                firstname: "",
                lastname: "",
                password: "",
            });

            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });
        });
    });

    describe("Delete function", () => {
        it("Delete function exists", () => {
            expect(store.destroy).toBeDefined();
        });

        it("Delete function returns user", async () => {
            const result = await store.destroy(1);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });
        });

        it("The created user has been already deleted", async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });
});
