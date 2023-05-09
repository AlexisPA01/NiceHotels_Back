import { Router } from "express";
import { methods as roomServiceController } from "./../controllers/roomService.controller";

const router = Router();

router.get("/hotel/:CodHotel", roomServiceController.getRoomService);

export default router;
