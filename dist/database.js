"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
// Extract the database connection configurations from the environment variables
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_TEST, ENV, } = process.env;
let pool;
// Setup the connection between the app and the database
if (ENV === "dev") {
    pool = new pg_1.Pool({
        user: POSTGRES_USERNAME,
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
    });
}
else {
    pool = new pg_1.Pool({
        user: POSTGRES_USERNAME,
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = pool;
