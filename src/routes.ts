
import express from "express";
import aclMiddleware from "./middlewares/acl.middleware";
import authMiddleware from "./middlewares/auth.middleware";
import uploadMiddleware from "./middlewares/upload.middleware";
import authController from "./controllers/auth.controller";
import categoriesController from "./controllers/categories.controller";
import productsController from "./controllers/products.controller";
import uploadController from "./controllers/upload.controller";
import ordersController from "./controllers/orders.controller";

const router = express.Router();

// CRUD Products
router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

// CRUD orders
router.get("/orders",authMiddleware, ordersController.findAll);
router.post("/orders",authMiddleware, ordersController.create);
router.get("/orders/:id",authMiddleware, ordersController.findOne);
router.put("/orders/:id",authMiddleware, ordersController.update);
router.delete("/orders/:id",authMiddleware, ordersController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

//Authentication routes
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", [authMiddleware, aclMiddleware(["admin", "user"])], authController.me);

router.put("/auth/profile", authMiddleware, authController.profile);



export default router;
