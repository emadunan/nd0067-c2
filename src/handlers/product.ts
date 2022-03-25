import { Request, Response, Application } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { ProductStore } from "../models/product";

/* Extract the env variables */
dotenv.config();
const { JWT_SECRET } = process.env;

const store = new ProductStore();

const product_routes = (app: Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
};

async function index(_req: Request, res: Response) {
    try {
        const products = await store.index();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json(error);
    }
}

async function show(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const products = await store.show(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        // Extract token from authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        // Verify the received token
        jwt.verify(<string>token, <string>JWT_SECRET);

        // Create a new product
        const p = req.body;
        const product = await store.create(p);
        res.status(201).json(product);
    } catch (error) {
        res.status(401).json(`To access this endpoint you need a valid token!`);
    }
}

export default product_routes;
