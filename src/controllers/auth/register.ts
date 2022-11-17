import { Request, Response } from "express";
import { Validator } from "node-input-validator";
// Utils
import { errorResponse, formatNIVErrors } from "../../utils";
// Services
import {
  verifyUserExists,
  hashPassword,
  generateTokens,
  createUser,
} from "../../services/auth";

interface RegisterProps {
  email: string;
  username: string;
  password: string;
}

const registerController = async (
  req: Request<{}, {}, RegisterProps>,
  res: Response
) => {
  // Validate request body
  const v = new Validator(req.body, {
    email: "email",
    username: "required",
    password: "required", // TODO add password strength validation
  });

  const pass = await v.check();
  if (!pass) {
    return errorResponse(res, {
      code: 400,
      type: "VALIDATION",
      message: "Invalid request body",
      errors: formatNIVErrors(v.errors),
    });
  }

  // Check the user doesnt exists
  const userExists = await verifyUserExists(req.body.email, req.body.username);
  if (userExists.found) {
    return errorResponse(res, {
      code: 409,
      message: "A user with the given credentials already exists",
      type: "CONFLICT",
    });
  }

  // Hash the password
  const hashedPassword = await hashPassword(req.body.password);

  // Create the user
  const user = await createUser({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });

  // Generate tokens
  const tokens = generateTokens(user.id, res);

  // Send response
  return res.status(200).json({
    data: [
      {
        id: user.id,
        type: "user",
        attributes: user,
      },
    ],
    meta: {
      csrf: tokens.CSRFToken,
    },
    links: {
      self: `${process.env.APP_URL}/v1/auth/register`,
    },
  });
};

export default registerController;
