const getUser = (user: string) => {
  switch (user) {
    case "anyrep": {
      return {
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.ANYREP_EMAIL_USER as string,
          pass: process.env.ANYREP_EMAIL_PASS as string,
        },
        email: "anyrep@googlemail.com",
        turnstileSecret: process.env.ANYREP_TURNSTILE_SECRET as string,
        sendToSelf: true,
      };
    }
    default: {
      throw new Error("Email user not found");
    }
  }
};

export default getUser;
