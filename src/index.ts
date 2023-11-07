import express from "express";
import helmet from "helmet";

const app = express();
const PORT = parseInt(process.env["PORT"] ?? "5000");

app.use(express.json());
app.use(helmet());
app.use("*", (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
})

app.listen(PORT, () => 
    console.log(`Server is up and running on port ${PORT}...`));