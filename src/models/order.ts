import db from "../database";

export type Order = {
    id: number;
    status: string;
    user_id: number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        const sql = "SELECT * FROM orders";
        try {
            const conn = await db.connect();
            const result = await conn.query(sql);
            conn.release();

            const orders = result.rows;
            return orders;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async show(id: number): Promise<Order> {
        const sql = "SELECT * FROM orders WHERE id=$1";
        try {
            const conn = await db.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            const order = result.rows[0];
            return order;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async user_orders(userId: number, status: string) {
        const sql = "SELECT * FROM orders WHERE user_id=$1 AND status=$2";
        try {
            const conn = await db.connect();
            const result = await conn.query(sql, [userId, status]);
            conn.release();

            const orders = result.rows;
            return orders;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async create(userId: number): Promise<Order> {
        const setPrevOrdersToComeleted =
            "UPDATE orders SET status='complete' WHERE user_id=$1";
        const sql =
            "INSERT INTO orders (status, user_id) VALUES ('active', $1) RETURNING *";
        try {
            const conn = await db.connect();
            // Set all previous orders status to complete
            await conn.query(setPrevOrdersToComeleted, [userId]);

            // Add new order
            const result = await conn.query(sql, [userId]);
            conn.release();

            const createdOrder = result.rows[0];
            return createdOrder;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async addProduct(quantity: number, orderId: number, productId: number) {
        const sql =
            "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";

        try {
            const conn = await db.connect();
            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
