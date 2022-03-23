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
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.put("/users/:id", update);
    app.delete("/users/:id", destroy);
};
function index(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield store.index();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(200).json(`Cannot fetch data from the server: ${error}`);
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract the id from the request params
        const id = parseInt(req.params.id);
        // Fetch data from the database
        try {
            const user = yield store.show(id);
            if (user) {
                res.status(200).json(user);
                return;
            }
            else {
                res.status(200).json(null);
            }
        }
        catch (error) {
            res.json(`Cannot fetch data from the server: ${error}`);
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract user information from the request body
        const user = req.body;
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
        // Create a new user
        try {
            const createdUser = yield store.create(user);
            res.status(201).json(createdUser);
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
            const deletedUser = yield store.show(id);
            if (deletedUser) {
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
exports.default = user_routes;
