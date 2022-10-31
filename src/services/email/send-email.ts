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

  const outboundMailOptions = {
    from: user.email,
    to: to,
    subject: subject,
    html: html,
    replyTo: user.email,
  };

  try {
    // Outbound
    await transporter.sendMail(outboundMailOptions);

    // Inbound
    if (user.sendToSelf) {
      await transporter.sendMail({
        from: user.email,
        to: user.email,
        subject: subject,
        html: html,
        replyTo: to,
      });
    }

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
