"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
class UserStore {
    // Get all users from database
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Can't get users: ${err}`);
            }
        });
    }
    // Get one user from database
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE id = $1";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get user: ${err}`);
            }
        });
    }
    // Create a new user
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
                const result = yield conn.query(sql, [
                    user.firstname,
                    user.lastname,
                    user.password,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't create user: ${err}`);
            }
        });
    }
    // Update user data
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the old user values
                const userx = yield this.show(id);
                // Assert the input values and replace the falsy values
                if (!user.firstname)
                    user.firstname = userx.firstname;
                if (!user.lastname)
                    user.lastname = userx.lastname;
                if (!user.password)
                    user.password = userx.password;
                const conn = yield database_1.default.connect();
                const sql = "UPDATE users SET firstname=$1, lastname=$2, password=$3 WHERE id=$4 RETURNING *";
                const result = yield conn.query(sql, [
                    user.firstname,
                    user.lastname,
                    user.password,
                    id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't create user: ${err}`);
            }
        });
    }
    // Delete user from database
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get users: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
