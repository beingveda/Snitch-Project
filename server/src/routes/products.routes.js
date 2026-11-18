import { Router } from "express";

const router = Router()

/**
 * @POST 
 * @route /api/products
 * @description creates the product and save its data 
 * into the DB,images will be stored on imagekit.
 * @FRONTEND SE YE DATA AYEGA: 
 * req.body=>{title,description:{amount,currency},sizes:[{size,stock}]}
 */

export default router