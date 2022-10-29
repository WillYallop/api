import express from "express";
import morgan from "morgan";
import cors from "cors";
// Routes
import { email } from "./routes/v1";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/v1", email);

export default app;
