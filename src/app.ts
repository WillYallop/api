import express from "express";
import morgan from "morgan";
import cors from "cors";
// Routes
import { email } from "./routes/v1";

const app = express();

// extend Response
declare global {
  namespace Express {
    interface Response {
      locals: {
        user: string;
      };
    }
  }
}

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/v1/email", email);
app.use(express.static("public"));

export default app;
