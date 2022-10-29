import { Router } from "express";
// Controllers
import { sendEmail } from "../../controllers/email";

// Routes
const router = Router();

router.post("/", sendEmail);

export default router;
