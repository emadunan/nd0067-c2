import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// import routes
import userRoutes from "./handlers/user";

const app: Application = express();

// Middleware setup
app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ message: "this is the main url" });
});

// App routes
userRoutes(app);

/* Web server start */
// Extract the host name and the port number from the environment variables
dotenv.config();
const { HOST, PORT } = process.env;
const port = parseInt(PORT as string);
const host = HOST as string;

// Listening to the comming requests
app.listen(port, host, () => {
    console.log(`Listening on port #${port}...`);
});
