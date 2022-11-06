import { Router } from "express";
// Controllers
import { getProjects } from "../../controllers/projects";

// Routes
const router = Router();

router.get("/", getProjects);

export default router;
