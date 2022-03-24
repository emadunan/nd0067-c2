import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserStore } from "../models/user";

/* Extract the env variables */
dotenv.config();
const { SALT, JWT_SECRET } = process.env;

const store = new UserStore();

// Util function to generate Json Web Token
export const generateJWT = async (id: number, password: string) => {
    try {
        // Get the user from repository
        const user = await store.show(id);

        // Authenticate the user
        const isAuthenticated = await bcrypt.compare(
            password + SALT,
            <string>user.password
        );

        // Generate and return the access token
        if (isAuthenticated) {
            const tokenData = { ...user };
            delete tokenData.password;

            const token = jwt.sign(tokenData, <string>JWT_SECRET);
            return {
                user: tokenData,
                token: token,
            };
        }

        return null;
    } catch (error) {
        throw new Error(`Authentication failed: ${error}`);
    }
};
