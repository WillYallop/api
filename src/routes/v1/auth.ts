import { Router } from "express";
// Controllers
import { login, register } from "../../controllers/auth";

// Routes
const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
