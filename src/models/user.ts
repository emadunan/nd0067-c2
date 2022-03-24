import db from "../database";

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password?: string;
};

export class UserStore {
    // Get all users from database
    async index(): Promise<User[]> {
        try {
            const conn = await db.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Can't get users: ${err}`);
        }
    }

    // Get one user from database
    async show(id: number): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = "SELECT * FROM users WHERE id = $1";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't get user: ${err}`);
        }
    }

    // Create a new user
    async create(user: User): Promise<User> {
        try {
            const conn = await db.connect();
            const sql =
                "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.password,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't create user: ${err}`);
        }
    }

    // Update user data
    async update(id: number, user: User): Promise<User> {
        try {
            // Get the old user values
            const userx = await this.show(id);

            // Assert the input values and replace the falsy values
            if (!user.firstname) user.firstname = userx.firstname;
            if (!user.lastname) user.lastname = userx.lastname;
            if (!user.password) user.password = userx.password;

            const conn = await db.connect();
            const sql =
                "UPDATE users SET firstname=$1, lastname=$2, password=$3 WHERE id=$4 RETURNING *";
            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.password,
                id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't create user: ${err}`);
        }
    }

    // Delete user from database
    async destroy(id: number): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't get users: ${err}`);
        }
    }
}
