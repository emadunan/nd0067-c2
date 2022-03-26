import { Request, Response, Application } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserStore } from "../models/user";
import { generateJWT } from "../utils/auth";

/* Extract the env variables */
dotenv.config();
const { SALT, SALT_ROUNDS, JWT_SECRET } = process.env;

/* Create the user routes */
const store = new UserStore();

const user_routes = (app: Application) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.put("/users/:id", update);
    app.delete("/users/:id", destroy);
    app.post("/users/:id", authenticate);
};

async function index(req: Request, res: Response) {
    // Extract token from authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    // Fetch data from the database
    try {
        // Verify the received token
        jwt.verify(<string>token, <string>JWT_SECRET);

        // Get users data
        const users = await store.index();
        res.status(200).json(users);
    } catch (error) {
        res.status(401).json(`To access this endpoint you need a valid token!`);
    }
}

async function show(req: Request, res: Response) {
    // Extract the id from the request params
    const id = parseInt(req.params.id as string);

    // Extract token from authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    // Fetch data from the database
    try {
        // Verify the received token
        jwt.verify(<string>token, <string>JWT_SECRET);

        // Get user data
        const user = await store.show(id);
        if (user) {
            delete user.password;
            res.status(200).json(user);
            return;
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        res.status(401).json(`To access this endpoint you need a valid token!`);
    }
}

async function create(req: Request, res: Response) {
    // Extract user information from the request body
    const user = req.body;
    const rawPassword = req.body.password;

    // Validating the user inputs
    if (
        (user.firstname as string).length < 0 ||
        (user.firstname as string).length > 50
    ) {
        res.json(
            "Invalid firstname, firstname length shouldn't exceed 50 char"
        );
        return;
    }

    if (
        (user.lastname as string).length < 0 ||
        (user.lastname as string).length > 50
    ) {
        res.json("Invalid lastname, lastname length shouldn't exceed 50 char");
        return;
    }

    if (
        (user.password as string).length < 0 ||
        (user.password as string).length > 50
    ) {
        res.json("Invalid password, password length shouldn't exceed 50 char");
        return;
    }

    // Hash the received password
    const hash = await bcrypt.hash(
        user.password + SALT,
        parseInt(SALT_ROUNDS as string)
    );
    user.password = hash;

    // Create a new user
    try {
        const createdUser = await store.create(user);

        // Add the user's token and return it.
        const usertoReturn = await generateJWT(
            <number>createdUser.id,
            <string>rawPassword
        );

        res.status(201).json(usertoReturn);
    } catch (error) {
        res.json(`User has not been created: ${error}`);
    }
}

async function update(req: Request, res: Response) {
    // Extract the id from the request params
    const id = parseInt(req.params.id as string);

    const user = req.body;

    // Fetch data from the database
    try {
        const updatedUser = await store.update(id, user);
        if (updatedUser) {
            delete updatedUser.password;
            res.status(204).json(updatedUser);
            return;
        } else {
            res.status(404).json(null);
        }
    } catch (error) {
        res.json(`Update operation failed: ${error}`);
    }
}

async function destroy(req: Request, res: Response) {
    // Extract the id from the request params
    const id = parseInt(req.params.id as string);

    // Fetch data from the database
    try {
        const deletedUser = await store.destroy(id);
        if (deletedUser) {
            delete deletedUser.password;
            res.status(202).json(deletedUser);
            return;
        } else {
            res.status(404).json(null);
        }
    } catch (error) {
        res.json(`Delete operation failed: ${error}`);
    }
}

async function authenticate(req: Request, res: Response) {
    try {
        // Extract the user id and password from the request
        const id = parseInt(req.params.id as string);
        const password = req.body.password as string;

        // Create JWT
        const token = await generateJWT(id, password);

        if (!token) {
            res.status(401).json("Invalid id or password");
        }
        res.json(token);
    } catch (error) {
        res.status(401).json(error);
    }
}

export default user_routes;
