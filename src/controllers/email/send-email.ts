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
  try {
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
      return errorResponse(res, {
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
      return errorResponse(res, {
        code: 401,
        type: "RECAPTCHA",
        message: "Invalid turnstile token",
        errors: siteVerified.errors,
      });
    }

    // Render the template
    const templateHTML = await renderTemplate({
      user: user,
      template,
      data,
    });

    // Send the email
    const sendEmailRes = await sendEmail({
      html: templateHTML,
      to: to,
      subject: subject,
      user: userDetails,
    });
    if (!sendEmailRes.success) {
      return errorResponse(res, {
        code: 500,
        type: "EMAIL",
        message: sendEmailRes.message || "Failed to send email",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    const error = err as Error;
    return errorResponse(res, {
      code: 500,
      type: "UNKNOWN",
      message: error.message,
    });
  }
};

export default sendEmailController;
