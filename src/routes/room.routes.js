import { Router } from "express";
import { methods as roomController } from "../controllers/room.controller";

const router = Router();

router.get("/hotel+-+room/:CodHotel", roomController.getRoomsForHotel);
router.get("/:Cod", roomController.getRoom);
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
 *               CostNight:
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
router.post("/", roomController.postRoom);
router.put("/:Cod", roomController.updateRoom);
router.delete("/:Cod", roomController.deleteRoom);

export default router;
