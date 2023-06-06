import { Router } from "express";
import { methods as recommendedSiteController } from "./../controllers/recommendedSite.controller";

const router = Router();

router.get("/", recommendedSiteController.getRecommendedSites);
router.get("/:Id", recommendedSiteController.getRecommendedSite);
router.get(
   "/by+-+cod+-+hotel/:Cod",
   recommendedSiteController.getRecommendedSitesByCodHotel
);

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Crea una nueva habitación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CodHotel:
 *                 type: integer
 *               Name:
 *                 type: string
 *               Description:
 *                 type: string
 *               Address:
 *                 type: string
 *               Ubication:
 *                 type: string
 *               IdCity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Registro agregado exitosamente
 *       400:
 *         description: Solicitud incorrecta. Por favor, completa todos los campos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Registro duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */ 
router.post("/", recommendedSiteController.postRecommendedSite);
router.put("/:Id", recommendedSiteController.updateRecommendedSite);
router.delete("/:Id", recommendedSiteController.deleteRecommendedSite);

export default router;
