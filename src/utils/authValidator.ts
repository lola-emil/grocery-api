import Joi from "joi";
import { User } from "../model/user";
import * as userModel from "../model/user";
import { comparePassword } from "./encryptPassword";


const schema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .alphanum()
        .min(8)
        .required()
});

export async function registrationValidator(user: User): Promise<Joi.ValidationError | string | null> {
    const { error } = schema.validate(user);
    // Check if error is present from the validator
    if (error)
        return error;

    // Check if email is already taken
    const matchedUser = await userModel.findByEmail(user.email);
    if (matchedUser.length > 0)
        return "Email already taken";

    // Return null if valid 
    return null;
}

export async function loginValidator(user: User): Promise<Joi.ValidationError | string | null> {
    const { error } = schema.validate(user);

    // Check if error is present from the validator
    if (error)
        return error;

    // Check if user is already registered
    const matchedUser = await userModel.findByEmail(user.email);
    if (matchedUser.length < 1)
        return "Invalid email or password";

    if (!(await comparePassword(matchedUser[0].password, user.password)))
        return "Invalid email or password";

    // Return null if valid 
    return null;
}