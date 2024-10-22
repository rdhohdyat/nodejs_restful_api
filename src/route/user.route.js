import {Router} from "express";
import {register, getAllUser, login} from "../controller/user.controller.js"

const router = Router();

router.get('/', getAllUser)
router.post('/register', register)
router.post("/login", login)

export default router;