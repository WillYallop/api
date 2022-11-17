import { Request, Response } from "express";
import { Validator } from "node-input-validator";
// Utils
import { errorResponse, formatNIVErrors } from "../../utils";
// Services
import {
  verifyUserExists,
  comparePassword,
  generateTokens,
} from "../../services/auth";

interface LoginProps {
  email?: string;
  username?: string;
  password: string;
}

const loginController = async (
  req: Request<{}, {}, LoginProps>,
  res: Response<JSONResponse>
) => {
  // Validate request body
  const v = new Validator(req.body, {
    email: "email",
    username: "requiredWithout:email",
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

  // Check the user exists
  const userExists = await verifyUserExists(req.body.email, req.body.username);
  if (!userExists.found || !userExists.user) {
    return errorResponse(res, {
      code: 404,
      message: "We cant find a user with the given credentials",
      type: "NOT_FOUND",
    });
  }

  // Compare the password
  const passwordMatch = await comparePassword(
    req.body.password,
    userExists.user.password
  );
  if (!passwordMatch) {
    return errorResponse(res, {
      code: 401,
      message: "We cant find a user with the given credentials",
      type: "UNAUTHORIZED",
    });
  }

  // Generate tokens
  const tokens = generateTokens(userExists.user.id, res);

  // Send response
  return res.status(200).json({
    data: [
      {
        id: userExists.user.id,
        type: "user",
        attributes: userExists.user,
      },
    ],
    meta: {
      csrf: tokens.CSRFToken,
    },
    links: {
      self: `${process.env.APP_URL}/v1/auth/login`,
    },
  });
};

export default loginController;
