import { Router } from "express";
import { methods as installationController } from "./../controllers/installation.controller";

const router = Router();

router.get("/", installationController.getInstallations);
router.get("/:Id", installationController.getInstallation);
router.get(
   "/by+-+cod+-+hotel/:CodHotel",
   installationController.getInstallationsByCodHotel
);
router.post("/", installationController.postInstallation);
router.put("/:Id", installationController.updateInstallation);
router.delete("/:Id", installationController.deleteInstallation);

export default router;
