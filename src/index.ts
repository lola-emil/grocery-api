import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";

import apiRouter from "./routes";

const app = express();
const PORT = parseInt(process.env["PORT"] ?? "5000");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Add api routes
app.use(apiRouter);

app.listen(PORT, () =>
    console.log(`Server is up and running on port ${PORT}...`));