import { Router } from "express";
import { methods as reservationController } from "../controllers/reservation.controller";

const router = Router();

router.get("/", reservationController.getAsyncReservations);
router.post("/", reservationController.postAsyncReservation)

export default router;
