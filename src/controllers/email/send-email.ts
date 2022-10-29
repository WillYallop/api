import { Request, Response } from "express";
import { Validator } from "node-input-validator";
// Utils
import { errorResponse, formatNIVErrors } from "../../utils";
// Services
import {
  sendEmail,
  renderTemplate,
  getUser,
  verifySite,
} from "../../services/email";

interface SendEmailProps {
  user: string;
  template: string;
  to: string;
  subject: string;
  token: string;
  data: {
    [key: string]: any;
  };
}

const sendEmailController = async (
  req: Request<{}, {}, SendEmailProps>,
  res: Response
) => {
  const { user, template, to, subject, token, data } = req.body;

  // Validate request body
  const v = new Validator(req.body, {
    user: "required|string",
    template: "required|string",
    token: "required|string",
    to: "required|email",
    subject: "required|string",
    data: "required|object",
  });

  const pass = await v.check();
  if (!pass) {
    errorResponse(res, {
      code: 400,
      type: "VALIDATION",
      message: "Invalid request body",
      errors: formatNIVErrors(v.errors),
    });
  }

  // Get users details
  const userDetails = getUser(user);

  // Verify turnstile token
  const siteVerified = await verifySite(token, userDetails.turnstileSecret);
  if (!siteVerified.success) {
    errorResponse(res, {
      code: 401,
      type: "RECAPTCHA",
      message: "Invalid turnstile token",
      errors: siteVerified.errors,
    });
  }

  // Render the template
  const templateHTML = await renderTemplate({
    template,
    data,
  });

  // Send the email
  await sendEmail();

  res.status(200).json({
    message: "Email sent",
  });
};

export default sendEmailController;
