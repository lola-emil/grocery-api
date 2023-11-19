import { Router } from "express";
import * as groceryItemModel from "../model/groceryItem";
import { groceryItemValidator } from "../utils/groceryValidator";

const router = Router();

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.patch("/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const body = req.body as groceryItemModel.GroceryItem;

    await groceryItemModel.updateById(itemId, body);

    return res.status(200).json({
        status: 200,
        message: "Updated successfully"
    })
});

router.delete("/:itemId", async (req, res) => {
    const itemId = req.params.itemId;

    await groceryItemModel.deleteById(itemId);

    return res.status(200).json({
        status: 200,
        message: "Deletion successful"
    });
});

export default router;