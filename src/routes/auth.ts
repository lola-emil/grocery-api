import { Router } from "express";
import { loginValidator, registrationValidator } from "../utils/authValidator";
import * as userModel from "../model/user";

const router = Router();

router.post("/login", async (req, res) => {
    const body = req.body;
    const error = await loginValidator(body);

    // Check if error is present from the validator
    if (error) return res.status(401).json({
        status: 401,
        message: error
    });

    const matchedUser = await userModel.findByEmail(body.email);

    return res.status(200).json({
        status: 200,
        message: "Login Successful",
        data: {
            user_id: matchedUser[0].user_id
        }
    });
});

router.post("/register", async (req, res) => {
    const body = req.body;
    const error = await registrationValidator(body);

    // Check if error is present from the validator
    if (error) return res.status(400).json({
        status: 400,
        message: error
    });

    // Insert the new user data
    const newUser = await userModel.insert(body);

    return res.status(201).json({
        status: 201,
        message: "Registration Successful",
        data: {
            user_id: newUser
        }
    });
});


export default router;