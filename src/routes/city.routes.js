import { Router } from "express";
import { methods as cityController } from "../controllers/city.controller";

const router = Router();

router.get("/", cityController.getAsyncCities);

export default router;
