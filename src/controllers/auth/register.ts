import { Request, Response } from "express";
import { Validator } from "node-input-validator";
// Utils
import { errorResponse, formatNIVErrors } from "../../utils";
// Services

interface RegisterProps {}

const registerController = async (
  req: Request<{}, {}, RegisterProps>,
  res: Response
) => {};

export default registerController;
