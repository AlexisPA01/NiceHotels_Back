import { Router } from "express";
import { methods as installationMediaController } from "./../controllers/installationMedia.controller";

const router = Router();

router.get(
   "/by+-+id+-+installation/:Id",
   installationMediaController.getAsyncInstallationMediaByIdInstallation
);

export default router;
