import { Router } from "express";
import { Grocery } from "../model/grocery";
import * as groceryModel from "../model/grocery";
import { groceryValidator } from "../utils/groceryValidator";

const router = Router();

router.get("/", async (req, res) => {
    const { userId } = req.query;

    if (!userId) return res.status(404).json({
        status: 404,
        message: `Can't GET ${req.url}. Expected query 'userId' `
    });

    const groceries = await groceryModel.findbyUserId(userId.toString());

    return res.status(200).json({
        status: 200,
        message: "Ok",
        data: groceries
    });
});

router.post("/", async (req, res) => {
    const body = req.body as Grocery;
    const error = await groceryValidator(body);

    if (error) return res.status(400).json({
        status: 400,
        message: error
    });

    const newGroceryId = await groceryModel.insert(body);

    return res.status(201).json({
        status: 201,
        message: "Created successfully",
        data: {
            grocery_id: newGroceryId
        }
    });
});

router.delete("/:groceryId", async (req, res) => {
    const groceryId = req.params.groceryId;

    await groceryModel.deleteById(groceryId);

    return res.status(200).json({
        status: 200,
        message: "Deleted successfully"
    });
});

export default router;