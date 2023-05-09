import { Router } from "express";
import { methods as roomNumberController } from "../controllers/roomNumber.controller";

const router = Router();

router.get("/:Num", roomNumberController.getAsyncRoomNumber);
router.get("/", roomNumberController.getAsyncRoomNumbers);
router.post("/", roomNumberController.postAsyncRoomNumber);
router.put("/:Num", roomNumberController.updateAsyncRoomNumber);
router.delete("/:Num", roomNumberController.deleteAsyncRoomNumber);
router.get("/by-room/:Cod", roomNumberController.getAsyncRoomsNumberByRoom);

export default router;
