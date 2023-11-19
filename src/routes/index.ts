import { Router } from "express";
import authRouter from "./auth";
import groceryRouter from "./grocery";
import groceryItemRouter from "./groceryItem";


const router = Router();

router.use("/auth", authRouter);
router.use("/groceries", groceryRouter);
router.use("/grocery-items", groceryItemRouter);

export default router;