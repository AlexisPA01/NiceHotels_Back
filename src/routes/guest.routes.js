import { Router } from "express"
import { methods as guestController } from "../controllers/guest.controller"

const router =  Router()

router.get('/by-doc/:Document', guestController.getGuest);
router.post('/login', guestController.loginGuest);

export default router;