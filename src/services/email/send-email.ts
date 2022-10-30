import nodeMailer from "nodemailer";

interface SendEmailProps {
  user: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    email: string;
    turnstileSecret: string;
    sendToSelf: boolean;
  };
  html: string;
  to: string;
  subject: string;
}

const sendEmail = async (props: SendEmailProps) => {
  const { user, html, to, subject } = props;

  const transporter = nodeMailer.createTransport({
    host: user.host,
    port: user.port,
    secure: user.secure,
    auth: {
      user: user.auth.user,
      pass: user.auth.pass,
    },
  });

  const toAddresses = [to];
  if (user.sendToSelf) {
    // toAddresses.push(user.auth.user);
  }

  const mailOptions = {
    from: user.email,
    to: toAddresses,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
    };
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};
export default sendEmail;
