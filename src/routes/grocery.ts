import { Router } from "express";
import { Grocery } from "../model/grocery";
import * as groceryModel from "../model/grocery";
import { groceryValidator } from "../utils/groceryValidator";
import * as groceryItemModel from "../model/groceryItem";
import { groceryItemValidator } from "../utils/groceryValidator";

const router = Router();

router.get("/groceries", async (req, res) => {
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

router.post("/grocery", async (req, res) => {
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

router.delete("/grocery/:groceryId", async (req, res) => {
    const groceryId = req.params.groceryId;

    await groceryModel.deleteById(groceryId);

    return res.status(200).json({
        status: 200,
        message: "Deleted successfully"
    });
});


router.get("/grocery_items", async (req, res) => {
    const { groceryId } = req.query;

    if (!groceryId) return res.status(404).json({
        status: 404,
        message: `Can't get ${req.url}. Expected query 'groceryId'`
    });

    const items = await groceryItemModel.findByGroceryId(groceryId.toString());

    return res.status(200).json({
        status: 200,
        message: "Ok",
        data: items
    });
});

router.post("/grocery_item", async (req, res) => {
    const body = req.body as groceryItemModel.GroceryItem;
    const error = await groceryItemValidator(body);

    if (error) return res.status(400).json({
        status: 400,
        message: error
    });

    const result = await groceryItemModel.insert(body);

    return res.status(201).json({
        status: 201,
        message: "Created successfully",
        data: {
            item_id: result
        }
    });
});

router.patch("/grocery_item/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const body = req.body as groceryItemModel.GroceryItem;

    if (!body.name && !body.price && !body.qty)
        return res.status(400).json({
            status: 400,
            message: "'name', 'price' or 'qty' is required"
        });

    await groceryItemModel.updateById(itemId, body);

    return res.status(200).json({
        status: 200,
        message: "Updated successfully"
    });
});

router.delete("/grocery_item/:itemId", async (req, res) => {
    const itemId = req.params.itemId;

    await groceryItemModel.deleteById(itemId);

    return res.status(200).json({
        status: 200,
        message: "Deletion successful"
    });
});


export default router;