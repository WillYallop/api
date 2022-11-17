import express from "express";
import morgan from "morgan";
import cors from "cors";
// Routes
import { email, projects, auth } from "./routes/v1";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/v1/email", email);
app.use("/v1/projects", projects);
app.use("/v1/auth", auth);
app.use(express.static("public"));

export default app;
