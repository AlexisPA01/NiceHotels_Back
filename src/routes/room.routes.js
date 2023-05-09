import { Router } from "express";
import { methods as roomController } from "../controllers/room.controller";

const router = Router();

router.get("/hotel+-+room/:CodHotel", roomController.getRoomsForHotel);
router.get("/:Cod", roomController.getRoom);
router.post("/", roomController.postRoom);
router.put("/:Cod", roomController.updateRoom);
router.delete("/:Cod", roomController.deleteRoom);

export default router;
