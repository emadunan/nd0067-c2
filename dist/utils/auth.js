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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
/* Extract the env variables */
dotenv_1.default.config();
const { SALT, JWT_SECRET } = process.env;
const store = new user_1.UserStore();
// Util function to generate Json Web Token
const generateJWT = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the user from repository
        const user = yield store.show(id);
        // Authenticate the user
        const isAuthenticated = yield bcrypt_1.default.compare(password + SALT, user.password);
        // Generate and return the access token
        if (isAuthenticated) {
            const tokenData = Object.assign({}, user);
            delete tokenData.password;
            const token = jsonwebtoken_1.default.sign(tokenData, JWT_SECRET);
            return {
                user: tokenData,
                token: token,
            };
        }
        return null;
    }
    catch (error) {
        throw new Error(`Authentication failed: ${error}`);
    }
});
exports.generateJWT = generateJWT;
