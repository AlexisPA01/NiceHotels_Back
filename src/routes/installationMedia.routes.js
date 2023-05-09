import { Router } from "express";
import { methods as installationMediaController } from "./../controllers/installationMedia.controller";

const router = Router();

router.post("/", installationMediaController.postInstallationMedia);
router.get(
   "/by+-+id+-+installation/:Id",
   installationMediaController.getAsyncInstallationMediaByIdInstallation
);

router.get(
   "/menu/:Id",
   installationMediaController.getAsyncInstallationMediaByIdInstallation
);

export default router;
