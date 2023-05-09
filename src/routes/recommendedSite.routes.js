import { Router } from "express";
import { methods as recommendedSiteController } from "./../controllers/recommendedSite.controller";

const router = Router();

router.get("/", recommendedSiteController.getRecommendedSites);
router.get("/:Id", recommendedSiteController.getRecommendedSite);
router.get(
   "/by+-+cod+-+hotel/:Cod",
   recommendedSiteController.getRecommendedSitesByCodHotel
);
router.post("/", recommendedSiteController.postRecommendedSite);
router.put("/:Id", recommendedSiteController.updateRecommendedSite);
router.delete("/:Id", recommendedSiteController.deleteRecommendedSite);

export default router;
