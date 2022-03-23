import { Request, Response, Application } from "express";
import { UserStore } from "../models/user";

const store = new UserStore();

const user_routes = (app: Application) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.put("/users/:id", update);
    app.delete("/users/:id", destroy);
};

async function index(_req: Request, res: Response) {
    try {
        const users = await store.index();
        res.status(200).json(users);
    } catch (error) {
        res.status(200).json(`Cannot fetch data from the server: ${error}`);
    }
}

async function show(req: Request, res: Response) {
    // Extract the id from the request params
    const id = parseInt(req.params.id as string);

    // Fetch data from the database
    try {
        const user = await store.show(id);
        if (user) {
            res.status(200).json(user);
            return;
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        res.json(`Cannot fetch data from the server: ${error}`);
    }
}

async function create(req: Request, res: Response) {
    // Extract user information from the request body
    const user = req.body;

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

    // Create a new user
    try {
        const createdUser = await store.create(user);
        res.status(201).json(createdUser);
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
            res.status(202).json(deletedUser);
            return;
        } else {
            res.status(404).json(null);
        }
    } catch (error) {
        res.json(`Delete operation failed: ${error}`);
    }
}

export default user_routes;
