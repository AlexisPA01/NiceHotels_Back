import { Router } from "express";
import { methods as hotelsController } from "./../controllers/hotel.controller";

const router = Router();

/**
 * @openapi
 * /api/hotel:
 *   get:
 *     summary: Obtener todos los hoteles
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", hotelsController.getAsyncHotels);

/**
 * @openapi
 * /api/hotel/{Cod}:
 *   get:
 *     summary: Obtener un hotel por su código
 *     parameters:
 *       - in: path
 *         name: Cod
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del hotel
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Hotel no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/hotel/:Cod", hotelsController.getAsyncHotel);

/**
 * @openapi
 * /api/hotel:
 *   post:
 *     summary: Crea un nuevo hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HotelRequestBody'
 *     responses:
 *       200:
 *         description: Registro agregado exitosamente
 *       400:
 *         description: Solicitud incorrecta. Por favor, completa todos los campos.
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

router.post("/", hotelsController.postAsyncHotel);

/**
 * @openapi
 * /api/hotel/{Cod}:
 *   put:
 *     summary: Actualiza un hotel existente
 *     parameters:
 *       - in: path
 *         name: Cod
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HotelRequestBody'
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 *       400:
 *         description: Solicitud incorrecta. Por favor, completa todos los campos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Hotel no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.put("/:Cod", hotelsController.udpateAsyncHotel);

/**
 * @openapi
 * /api/hotel/{Cod}:
 *   delete:
 *     summary: Elimina un hotel existente
 *     parameters:
 *       - in: path
 *         name: Cod
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del hotel
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 *       404:
 *         description: Hotel no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:Cod", hotelsController.deleteAsyncHotel);

export default router;
