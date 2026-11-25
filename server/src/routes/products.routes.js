import { Router } from "express";
import { createProductValidator } from "../validator/product.validator.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";
import { listAllProducts } from "../controller/product.controller.js";
import multer from "multer"

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        files:5,
        fileSize: 1024 * 1024
    }
})

const router = Router()

/**
 * @POST 
 * @route /api/products
 * @description creates the product and save its data 
 * into the DB,images will be stored on imagekit.
 * @body {title, description, price:{amount,currency}, sizes:[{size,stock}]}
 */

function parseProductJsonFields(req, res, next) {
    for (const field of ["price", "sizes"]) {
        if (typeof req.body[field] === "string") {
            try {
                req.body[field] = JSON.parse(req.body[field])
            } catch {
                return res.status(400).json({
                    message: `Invalid JSON in ${field}`
                })
            }
        }
    }
    next()
}

router.post("/",
    //---------------check is user authenticate-----------
    authenticate,
    //---------------check the role is seller or not----------
    (req,res,next) =>{
    if(req.user.role !=="seller"){

        return res.status(403).json({
            message:"User is not authorize to create product"
        })

    }
    next()
},
//-----------------required for reading the data from req.body if the format is form-data(multipart-fr)----------
upload.array("images"),
//-----------------parse the complex data like arrays and objects into JSON-------------------
parseProductJsonFields,
createProductValidator,
createProduct
)

/**
 * @method GET
 * @route /api/product
 * @description Read all the products from the DB
 * @access user
 */
router.get("/",authenticate,listAllProducts)

export default router