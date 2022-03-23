"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
describe("User model tests", () => {
    const store = new user_1.UserStore();
    describe("Index function", () => {
        it("Index function exists", () => {
            expect(store.index).toBeDefined();
        });
        it("Index function returns []", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toEqual([]);
        }));
    });
    describe("Create function", () => {
        it("Create function exists", () => {
            expect(store.create).toBeDefined();
        });
        it("Create function creates new a user and returns it", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstname: "emad",
                lastname: "younan",
                password: "password",
            };
            const result = yield store.create(user);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "younan",
                password: "password",
            });
        }));
    });
    describe("Show function", () => {
        it("Show function exists", () => {
            expect(store.show).toBeDefined();
        });
        it("Show function returns user", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(1);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "younan",
                password: "password",
            });
        }));
    });
    describe("Update function", () => {
        it("Update function exists", () => {
            expect(store.update).toBeDefined();
        });
        it("Update function modify returns user", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.update(1, {
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
        }));
        it("Update function ignore flasy values and returns user", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.update(1, {
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
        }));
    });
    describe("Delete function", () => {
        it("Delete function exists", () => {
            expect(store.destroy).toBeDefined();
        });
        it("Delete function returns user", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.destroy(1);
            expect(result).toEqual({
                id: 1,
                firstname: "emad",
                lastname: "nisseem",
                password: "passwordx",
            });
        }));
        it("The created user has been already deleted", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toEqual([]);
        }));
    });
});
