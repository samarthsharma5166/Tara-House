import {Router} from "express";
import { createProduct, deleteProduct, getProduct, getProductById, getSearchProduct, updateProduct } from "../controllers/product.contrller";
import upload from "../middleware/multer.middleware";
const route = Router();

route.get("/search",getSearchProduct)
route.get("/",getProduct);
route.get("/:id",getProductById);
route.post("/",upload.array("images",5),createProduct);
route.put("/:id",updateProduct);
route.delete("/:id",deleteProduct);

export default route