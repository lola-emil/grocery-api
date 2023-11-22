import { Router } from "express";
import authRouter from "./auth";
import groceryRouter from "./grocery";

const router = Router();

router.use("/auth", authRouter);
router.use("/grocery", groceryRouter);

export default router;