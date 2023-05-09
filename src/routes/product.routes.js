import { Router } from "express";
import { methods as productController } from "../controllers/product.controller";

const router = Router();

router.get(
   "/by+-+installation/:IdInstallation",
   productController.getProductsByIdInstallation
);
router.get("/:Id", productController.getProduct);
router.get(
   "/room+-+service/:Cod",
   productController.getAsyncRoomServicesProduct
);
router.get(
   "/room+-+service/info/:Id",
   productController.getAsyncRoomServiceProduct
);
router.post("/", productController.postProduct);
router.put("/:Id", productController.updateProduct);
router.delete("/:Id", productController.deleteProduct);

export default router;
