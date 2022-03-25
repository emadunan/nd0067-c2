import { Request, Response, Application } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { OrderStore } from "../models/order";

/* Extract the env variables */
dotenv.config();
const { JWT_SECRET } = process.env;

const store = new OrderStore();

const order_routes = (app: Application) => {
    app.get("/users/:userId/orders/:status", index);
    app.post("/users/:userId/orders", create);
};

async function index(req: Request, res: Response) {
    try {
        // Extract order data from params
        const userId = parseInt(req.params.userId);
        const status = req.params.status;

        // Extract token from authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        // Verify the received token
        const decoded = jwt.verify(<string>token, <string>JWT_SECRET);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (decoded.id != userId) {
            res.status(401).json("Unauthorized access!");
            return;
        }

        const orders = await store.user_orders(userId, status);
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json(error);
    }
}

async function create(req: Request, res: Response) {
    try {
        // Extract the user id from params
        const userId = parseInt(req.params.userId);

        // Extract token from authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        // Verify the received token
        const decoded = jwt.verify(<string>token, <string>JWT_SECRET);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (decoded.id != userId) {
            res.status(401).json("Unauthorized access!");
            return;
        }

        // Create a new order
        const order = await store.create(userId);

        // Add selected products to the order
        const products = req.body.products;
        products.forEach(
            async (product: { quantity: number; productId: number }) => {
                await store.addProduct(
                    product.quantity,
                    order.id,
                    product.productId
                );
            }
        );

        res.status(201).json(order);
    } catch (error) {
        res.status(401).json(`To access this endpoint you need a valid token!`);
    }
}

export default order_routes;
