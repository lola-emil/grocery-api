import Joi from "joi";
import { Grocery } from "../model/grocery";
import * as userModel from "../model/user";
import { GroceryItem } from "../model/groceryItem";

const grocerySchema = Joi.object({
    title: Joi.string()
        .required(),
    description: Joi.string()
        .required(),
    user_id: Joi.string()
        .required()
});

const groceryItemSchema = Joi.object({
    name: Joi.string()
        .required(),
    qty: Joi.number()
        .positive()
        .required(),
    price: Joi.number()
        .positive()
        .required(),
    grocery_id: Joi.string()
        .required()
});

export async function groceryValidator(grocery: Grocery) {
    const { error } = grocerySchema.validate(grocery);

    if (error) return error.message;

    const matchedUser = await userModel.findById(grocery.user_id);

    if (matchedUser.length == 0)
        return "Invalid user id";

    return null;
}


export async function groceryItemValidator(item: GroceryItem) {
    const { error } = groceryItemSchema.validate(item);
    if (error) return error.message;
    return null;
}