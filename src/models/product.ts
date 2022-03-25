import db from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        const sql = "SELECT * FROM products";
        try {
            const conn = await db.connect();
            const result = await conn.query(sql);
            conn.release();

            const products = result.rows;
            return products;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async show(id: number): Promise<Product> {
        const sql = "SELECT * FROM products WHERE id=$1";
        try {
            const conn = await db.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            const product = result.rows[0];
            return product;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async create(p: Product): Promise<Product> {
        const sql =
            "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
        try {
            const conn = await db.connect();
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();

            const createdProduct = result.rows[0];
            return createdProduct;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
