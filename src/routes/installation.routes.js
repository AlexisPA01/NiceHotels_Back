import { Router } from "express";
import { methods as installationController } from "./../controllers/installation.controller";

const router = Router();

router.get("/", installationController.getInstallations);
router.get("/:Id", installationController.getInstallation);
router.get(
   "/by+-+cod+-+hotel/:CodHotel",
   installationController.getInstallationsByCodHotel
);
router.get(
   "/room+-+service/:CodHotel",
   installationController.getRoomServiceByHotelCod
);
router.get(
   "/:CodHotel/:TypeInstallation",
   installationController.getInstallationsByCodHotelTypeInstallation
);
router.post("/", installationController.postInstallation);
router.put("/:Id", installationController.updateInstallation);
router.delete("/:Id", installationController.deleteInstallation);

export default router;
