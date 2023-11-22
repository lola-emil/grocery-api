import { db } from "../db";
import { v4 as uuidv4 } from "uuid";
import { encryptPassword } from "../utils/encryptPassword";

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

/**
 * 
 * @param user - user data to be inserted
 * @returns returns the user_id of the new inserted user
 */
export async function insert(user: User) {
    // Generate uuid for the primary key
    user.user_id = uuidv4();

    // Encrypt password
    user.password = await encryptPassword(user.password);

    // insert
    await db<User>("tbl_users").insert(user);

    return user.user_id;
}