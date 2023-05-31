import { Router } from "express";
import { methods as installationController } from "./../controllers/installation.controller";

const router = Router();

router.get("/", installationController.getInstallations);
router.get("/:Id", installationController.getInstallation);
router.get(
   "/by+-+cod+-+hotel/:CodHotel",
   installationController.getInstallationsByCodHotel
);

/**
 * @swagger
 * /api/installation:
 *   post:
 *     summary: Crea una nueva instalación
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
 *               Schedule:
 *                 type: string
 *               DressCode:
 *                 type: string
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

router.post("/", installationController.postInstallation);
router.put("/:Id", installationController.updateInstallation);
router.delete("/:Id", installationController.deleteInstallation);

export default router;
