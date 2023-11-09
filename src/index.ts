import express from "express";
import helmet from "helmet";
import env from "dotenv";

import apiRouter from "./routes";

const app = express();
const PORT = parseInt(process.env["PORT"] ?? "5000");


env.config()

app.use(express.json());
app.use(helmet());

// Add api routes
app.use(apiRouter);

app.use("*", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.listen(PORT, () =>
    console.log(`Server is up and running on port ${PORT}...`));