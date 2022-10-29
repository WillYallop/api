import { Request, Response } from "express";
// Services
import { sendEmail, renderTemplate } from "../../services/email";

interface SendEmailProps {
  user: string;
  template: string;
  to: string;
  subject: string;
  data: {
    [key: string]: any;
  };
}

const sendEmailController = async (
  req: Request<{}, {}, SendEmailProps>,
  res: Response
) => {
  const { user, template, to, subject, data } = req.body;

  // Render the template
  const templateHTML = await renderTemplate({
    template,
    data,
  });
};

export default sendEmailController;
