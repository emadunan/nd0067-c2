"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// import routes
const user_1 = __importDefault(require("./handlers/user"));
const app = (0, express_1.default)();
// Middleware setup
app.use(body_parser_1.default.json());
app.get("/", (_req, res) => {
    res.status(200).json({ message: "this is the main url" });
});
// App routes
(0, user_1.default)(app);
/* Web server start */
// Extract the host name and the port number from the environment variables
dotenv_1.default.config();
const { HOST, PORT } = process.env;
const port = parseInt(PORT);
const host = HOST;
// Listening to the comming requests
app.listen(port, host, () => {
    console.log(`Listening on port #${port}...`);
});
