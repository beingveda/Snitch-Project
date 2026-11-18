import {body} from "express-validator"

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min:2, max:100 }).withMessage("Title length must be between 2 to 100 characters long").bail()
        .isAlpha("en-US",{ignore: " "}).withMessage("Title can only have english small case and capital case character"),

    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim()
        .isLength({ min:5, max:500}).withMessage("Description length must be between 5 to 500 chars"),

    body("price")
        .exists().withMessage("Price amount is required").bail()
        .isFloat({ min:0 }).withMessage("Price amount must be a floating number and greater and than 0"),

    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be a String value")
        .isIn(["INR", "USD"]).withMessage("Currency either be INR or USD")
]