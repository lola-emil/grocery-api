import { db } from "../db";
import { v4 as uuidv4 } from "uuid";


export interface GroceryItem {
    item_id: string;
    name: string;
    qty: number;
    price: number;
    grocery_id: string;
    created_at: Date;
    updated_at: Date;
}

export async function insert(item: GroceryItem) {
    item.item_id = uuidv4();

    const result = await db<GroceryItem>("tbl_grocery_items").insert(item);
    return result[0] == 1 ? item.item_id : null;
}

export async function findByGroceryId(groceryId: string) {
    const result = await db<GroceryItem>("tbl_grocery_item").select().where("grocery_id", groceryId);
    return result;
}

export async function deleteById(itemId: string) {
    const result = await db<GroceryItem>("tbl_grocery_items").delete().where("item_id", itemId);
    return result;
}

export async function updateById(itemId: string, data: GroceryItem) {
    const result = await db<GroceryItem>("tbl_grocery_items").update(data).where("item_id", itemId);
    return result;
}