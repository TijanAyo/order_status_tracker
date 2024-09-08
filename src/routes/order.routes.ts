import express, { Router } from "express";
import { container } from "tsyringe";
import { OrderController } from "../controller";

const router: Router = express.Router();
const orderController = container.resolve(OrderController);

router.get("/orders", orderController.getOrderList.bind(orderController));

export { router as orderRoute };
