import { db } from "../db";
import { v4 as uuidv4 } from "uuid";

export interface User {
    user_id: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export async function findByEmail(email: string) {
    const result = await db<User>("tbl_users").select().where("email", email);
    return result;
}

export async function findById(id: string) {
    const result = await db<User>("tbl_users").select().where("user_id", id);
    return result;
}


export async function insert(user: User) {
    user.user_id = uuidv4();
 
    const result = await db<User>("tbl_users").insert(user);
    return result[0] == 1 ? user.user_id : null;
}