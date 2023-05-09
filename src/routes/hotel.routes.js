import { Router } from "express";
import { methods as hotelsController } from "./../controllers/hotel.controller";

const router = Router();

router.get("/", hotelsController.getAsyncHotels);
router.get("/:Cod", hotelsController.getAsyncHotel);
router.post("/", hotelsController.postAsyncHotel);
router.put("/:Cod", hotelsController.udpateAsyncHotel);
router.delete("/:Cod", hotelsController.deleteAsyncHotel);

export default router;
