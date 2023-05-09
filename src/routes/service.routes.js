import { Router } from "express";
import { methods as serviceController } from "../controllers/service.controller";

const router = Router();

router.get("/", serviceController.getAsyncAllService);
router.get("/:Id", serviceController.getAsyncOneService);
// ? HOTEL:
router.get("/hotel/:CodHotel", serviceController.getAsyncAllServiceByCodHotel);
router.post("/hotel", serviceController.postAsyncServiceOfHotel);
router.put("/hotel/:Id", serviceController.updateAsyncServiceOfHotel);
router.delete("/hotel/:Id", serviceController.deleteAsyncServiceOfHotel);

export default router;
