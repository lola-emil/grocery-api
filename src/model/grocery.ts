import { db } from "../db";
import { v4 as uuidv4 } from "uuid";

export interface Grocery {
    grocery_id: string;
    title: string;
    description: string;
    user_id: string;
    created_at: string,
    updated_at: string;
}

export async function insert(grocery: Grocery) {
    grocery.grocery_id = uuidv4();
    await db<Grocery>("tbl_groceries").insert(grocery);
    return grocery.grocery_id;
}

export async function findbyUserId(userId: string) {
    const result = await db<Grocery>("tbl_groceries").select().where("user_id", userId);
    return result;
}

export async function deleteById(groceryId: string) {
    const result = await db<Grocery>("tbl_groceries").delete().where("grocery_id", groceryId);
    return result;
}
