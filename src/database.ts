import dotenv from "dotenv";
import { Pool } from "pg";

// Extract the database connection configurations from the environment variables
dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    ENV,
} = process.env;

let pool: Pool;

// Setup the connection between the app and the database
if (ENV === "dev") {
    pool = new Pool({
        user: POSTGRES_USERNAME,
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
    });
} else {
    pool = new Pool({
        user: POSTGRES_USERNAME,
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        password: POSTGRES_PASSWORD,
    });
}

export default pool;
