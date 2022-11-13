import express from "express";
import morgan from "morgan";
import cors from "cors";
// Routes
import { email, projects } from "./routes/v1";

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

  interface NIVErrorRes {
    [key: string]: Array<{
      rule: string;
      message: string;
    }>;
  }
  type RecaptchaErrors = Array<string>;

  interface ErrorResponse {
    code: number;
    message: string;
    type:
      | "VALIDATION"
      | "RECAPTCHA"
      | "UNKNOWN"
      | "EMAIL"
      | "NOT_FOUND"
      | "UNAUTHORIZED";
    errors?: NIVErrorRes | RecaptchaErrors;
  }
}

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/v1/email", email);
app.use("/v1/projects", projects);
app.use(express.static("public"));

export default app;
