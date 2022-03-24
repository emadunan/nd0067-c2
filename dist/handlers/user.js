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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const auth_1 = require("../utils/auth");
/* Extract the env variables */
dotenv_1.default.config();
const { SALT, SALT_ROUNDS, JWT_SECRET } = process.env;
/* Create the user routes */
const store = new user_1.UserStore();
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.put("/users/:id", update);
    app.delete("/users/:id", destroy);
    app.post("/users/:id", authenticate);
};
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract token from authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        // Fetch data from the database
        try {
            // Verify the received token
            jsonwebtoken_1.default.verify(token, JWT_SECRET);
            // Get users data
            const users = yield store.index();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(401).json(`To access this endpoint you need a valid token!`);
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract the id from the request params
        const id = parseInt(req.params.id);
        // Extract token from authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        // Fetch data from the database
        try {
            // Verify the received token
            jsonwebtoken_1.default.verify(token, JWT_SECRET);
            // Get user data
            const user = yield store.show(id);
            if (user) {
                delete user.password;
                res.status(200).json(user);
                return;
            }
            else {
                res.status(200).json(null);
            }
        }
        catch (error) {
            res.status(401).json(`To access this endpoint you need a valid token!`);
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract user information from the request body
        const user = req.body;
        const rawPassword = req.body.password;
        // Validating the user inputs
        if (user.firstname.length < 0 ||
            user.firstname.length > 50) {
            res.json("Invalid firstname, firstname length shouldn't exceed 50 char");
            return;
        }
        if (user.lastname.length < 0 ||
            user.lastname.length > 50) {
            res.json("Invalid lastname, lastname length shouldn't exceed 50 char");
            return;
        }
        if (user.password.length < 0 ||
            user.password.length > 50) {
            res.json("Invalid password, password length shouldn't exceed 50 char");
            return;
        }
        // Hash the received password
        const hash = yield bcrypt_1.default.hash(user.password + SALT, parseInt(SALT_ROUNDS));
        user.password = hash;
        // Create a new user
        try {
            const createdUser = yield store.create(user);
            // Add the user's token and return it.
            const usertoReturn = yield (0, auth_1.generateJWT)(createdUser.id, rawPassword);
            res.status(201).json(usertoReturn);
        }
        catch (error) {
            res.json(`User has not been created: ${error}`);
        }
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract the id from the request params
        const id = parseInt(req.params.id);
        const user = req.body;
        // Fetch data from the database
        try {
            const updatedUser = yield store.update(id, user);
            if (updatedUser) {
                delete updatedUser.password;
                res.status(204).json(updatedUser);
                return;
            }
            else {
                res.status(404).json(null);
            }
        }
        catch (error) {
            res.json(`Update operation failed: ${error}`);
        }
    });
}
function destroy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract the id from the request params
        const id = parseInt(req.params.id);
        // Fetch data from the database
        try {
            const deletedUser = yield store.destroy(id);
            if (deletedUser) {
                delete deletedUser.password;
                res.status(202).json(deletedUser);
                return;
            }
            else {
                res.status(404).json(null);
            }
        }
        catch (error) {
            res.json(`Delete operation failed: ${error}`);
        }
    });
}
function authenticate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract the user id and password from the request
        const id = parseInt(req.params.id);
        const password = req.body.password;
        // Create JWT
        const token = yield (0, auth_1.generateJWT)(id, password);
        if (token) {
            res.json(token);
            return;
        }
        res.json("Invalid username or password");
    });
}
exports.default = user_routes;
